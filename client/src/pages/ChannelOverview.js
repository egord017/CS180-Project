import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';
import Header from './Header';
import PostPreview from './PostPreview';
import { Card, Tab, Tabs, Box, CardContent, TextField, Modal, Typography } from '@mui/material';
import Post from './Post';
import ThreadPage from './threadPage';

import './ChannelOverview.css';
import { red } from '@mui/material/colors';
import ChannelPostForm from './channelPostForm';

function ChannelOverview({currentChannel, setCurrentChannel}) {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const [thread_id, setThreadId] = useState("");
    const [thread_body, setThreadBody] = useState("");
    const [thread_title, setThreadTitle] = useState("");
    const [channelName, setChannelName] = useState("");
    const { group_id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function visitChannel(channel_id) {
        setCurrentChannel(channel_id);
    }

    useEffect(() => {
        console.log("Updated currentChannel:", currentChannel);
    }, [currentChannel]);

    useEffect(() => {
        const selectedChannel = channels.find(channel => channel.id === currentChannel);
        if (selectedChannel) {
            setChannelName(selectedChannel.name);
        } else {
            setChannelName("");
        }
    }, [currentChannel, channels]);

    useEffect(() => {
        async function fetchThreadsForChannel() {
            if (!currentChannel) return;

            try {
                const response = await fetch(`http://localhost:5000/channels/${currentChannel}/threads`);
                const updatedThreads = await response.json();

                setThreads(prevThreads => ({
                    ...prevThreads,
                    [currentChannel]: updatedThreads
                }));
            } catch (error) {
                console.error(`Error fetching threads for channel ${currentChannel}: `, error);
            }
        }

        fetchThreadsForChannel();
        const intervalId = setInterval(fetchThreadsForChannel, 1000);

        return () => clearInterval(intervalId);
    }, [currentChannel]);

    useEffect(() => {
        async function fetchGroupData() {
            try {
                const [group_obj, channels_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`),
                ]);

                const group_data = await group_obj.json();
                const channels_data = await channels_obj.json();

                setGroup(group_data);
                setChannels(channels_data);

                const threads_data = await Promise.all(channels_data.map(async channel => {
                    const results = await fetch(`http://localhost:5000/channels/${channel.id}/threads`);
                    return await results.json();
                }));

                const threads_dict = channels_data.reduce((acc, channel, index) => {
                    acc[channel.id] = threads_data[index];
                    return acc;
                }, {});

                setThreads(threads_dict);
                console.log(threads_dict);
            } catch (error) {
                console.error("Error fetching group data: ", error);
            }
        }
        fetchGroupData();
    }, [group_id]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const currentThreads = threads[currentChannel] || [];

    return (
        <div>
            <div className = "channel-title-layout">
                <h1>{channelName}</h1>
            </div>
            <Button onClick={handleOpenModal} className="view-channels-button">
                Switch Channel
            </Button>
            <ChannelPostForm/>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box className="modal-container">
                    <Typography variant="h5">Channels List</Typography>
                    {channels.length > 0 ? (
                        channels.map((channel) => (
                            <div
                                key={channel.id}
                                className="channel-item"
                                onClick={() => {
                                    visitChannel(channel.id);
                                    handleCloseModal();
                                }}
                            >
                                <h3>{channel.name}</h3>
                                <p>{channel.description}</p>
                            </div>
                        ))
                    ) : (
                        <Typography>No channels available in this group.</Typography>
                    )}
                    <Button onClick={handleCloseModal} className="close-button">Close</Button>
                </Box>
            </Modal>
            {currentThreads.length > 0 ? (
                currentThreads.slice().reverse().map((thread) => (
                    <PostPreview 
                        key={thread.id} 
                        thread_id={thread.id} 
                        thread_title={thread.title} 
                        thread_body={thread.body}
                    />
                ))
            ) : (
                <Typography>No threads available in this channel.</Typography>
            )}
        </div>
    );
}

export default ChannelOverview;
