import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';
import Header from './Header';
import JoinButton from '../features/joinButton.jsx'
import ChannelOverview from './ChannelOverview';
import CreatePost from './CreatePost';  // Import CreatePost
import { Box, Tabs, Tab } from '@mui/material';
import * as userClient from "../utils/user.js"
import { joinGroup, leaveGroup } from "../api/groupAPI";

import './GroupPage.css';

function GroupPageTemp() {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const [currentChannel, setCurrentChannel] = useState(null); //TODO: instead of 1, get first ID
    const { group_id } = useParams();

    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();

    const handleJoinClick = async ()=> {
        console.log(userClient.getUserID(), group?.id);
        joinGroup(group?.id,userClient.getUserID())
    }
    const handlePostClick = async (body, curr_channel) => {
        const enteredTitle = prompt('Enter a title for your post:');
        if (!enteredTitle) return; // Stop if no title is entered

        try {
            const res = await fetch(`http://localhost:5000/threads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: enteredTitle,
                    body: body,
                    channel_id: curr_channel, 
                    user_id: '9a80cfb3-5535-4889-8fca-b213ae3607ba' // Dummy user_id
                })
            });
            console.log("attempting to post: ", body);
            const data = await res.json();
            // navigate(`/thread/${data.thread.id}`);
        } catch (err) {
            console.error('Error posting thread:', err);
        }
    };

    useEffect(() => {
        async function fetchGroupData() {
            const is_mem = await userClient.isMemberOfGroup(group?.id);
            console.log("mem: ", is_mem);
            setIsMember(is_mem);
            //setIsMember(false)

        

            try {
                const [group_obj, channels_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`),
                ]);

                const group_data = await group_obj.json();
                const channels_data = await channels_obj.json();

                setGroup(group_data);
                setChannels(channels_data);
                setCurrentChannel(channels_data[0].id);

                const threads_data = await Promise.all(channels_data.map(async channel => {
                    const results = await fetch(`http://localhost:5000/channels/${channel.id}/threads`)
                    return await results.json();
                }));

                const threads_dict = channels_data.reduce((acc, channel, index) => {
                    acc[channel.id] = threads_data[index];
                    return acc;
                }, {});

                setThreads(threads_dict);
            } catch (error) {
                console.error("error fetching in group : ", error);
            }
        }
        fetchGroupData();
    }, [group_id]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='group-page-container'>
            <Header />

            <div className='group-page-header'>
                <img
                    src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    alt="placeholder"
                    height="200"
                    className="cropped-image"
                />
                <div className="group-page-title-description-layout">
                    <div className='group-page-title'>
                        <h1 id='title'>{group?.name}</h1>
                    </div>
                    <div className='green-line'></div>
                    <h2 id="description">{group?.description}</h2>
                    {isMember ? null : <JoinButton onClick={handleJoinClick}></JoinButton>}
                    
                </div>

                <Box className="tabs-container">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        className="tabs"
                    >
                        <Tab label="Channels" />
                        <Tab label="Group Members" />
                        <Tab label="Settings" />
                    </Tabs>
                </Box>
            </div>

            <div className='pannel-containers'>
                <div className='left-pannel'>
                    {value === 0 && <CreatePost handlePostClick={handlePostClick} curr_channel={currentChannel} />}
                </div>

                <div className='right-pannel'>
                    <Box className="tab-content">
                        {value === 0 && <div>Content for Tab 1<ChannelOverview currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} /> </div>}
                        {value === 1 && <div>Content for Tab 2</div>}
                        {value === 2 && <div>Content for Tab 3</div>}
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default GroupPageTemp;