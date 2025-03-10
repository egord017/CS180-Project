import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';
import Header from './Header';
import PostPreview from './PostPreview';
import { Card, Tab, Tabs, Box, CardContent, TextField, Modal, Typography } from '@mui/material';
import Post from './Post';

import './ChannelOverview.css';
import { red } from '@mui/material/colors';

function ChannelOverview() {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const { group_id } = useParams();
    const navigate = useNavigate();
    const [curr_channel, setCurrChannel] = useState(1);  // Store the current selected channel's id
    const [isModalOpen, setIsModalOpen] = useState(false);

    function visitChannel(channel_id) {
        setCurrChannel(channel_id);
    }

    useEffect(() => {
        console.log("Updated curr_channel:", curr_channel);
        
    }, [curr_channel]);
    

    function getChannelInfo(channel_id) {
        const channel = channels.find(c => c.id == channel_id);
        if (!channel) return null;
        return (
            <Fragment>
                <div>{channel.name}</div>
                <div>{channel.description}</div>
                <div>-------------</div>
            </Fragment>
        );
    }

    async function deleteChannel(channel_id) {
        try {
            // refresh logic if needed
        } catch (err) {
            // handle error
        }
    }

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

    // Check if the current channel exists and if there are threads for it
    const currentThreads = threads[curr_channel] || [];

    return (
        <div>
            <Button onClick={handleOpenModal} className="view-channels-button">
                View Channels
            </Button>

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

            {/* Display threads for the current selected channel */}
            {currentThreads.length > 0 ? (
                currentThreads.map((thread) => (
                    <div key={thread.id} className="thread-item">
                        <h3>{thread.title}</h3>
                        <p>{thread.body?.substr(0, 25)}...</p>
                    </div>
                ))
            ) : (
                <Typography>No threads available in this channel.</Typography>
            )}
        </div>
    );
}

export default ChannelOverview;
