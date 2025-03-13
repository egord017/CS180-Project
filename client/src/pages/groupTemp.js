import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';
import Header from './Header';
import ChannelOverview from './ChannelOverview';
import CreatePost from './CreatePost';  // Import CreatePost
import { Box, Tabs, Tab } from '@mui/material';
import * as userClient from "../utils/user";
import { joinGroup, leaveGroup } from "../api/groupAPI";
import WorkshopOverview from './WorkshopOverview';
import './GroupPage.css';
import UsersInGroup from './UsersInGroup';
import Settings from './Settings';

function GroupPageTemp({setAuth}) {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const [currentChannel, setCurrentChannel] = useState(null); //TODO: instead of 1, get first ID
    const { group_id } = useParams();

    const [isMember, setIsMember] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleJoinClick = async ()=> {
        console.log(userClient.getUserID(), group?.id);
        joinGroup(group?.id, userClient.getUserID())
        window.location.reload()
    }
    const handleLeaveClick = async ()=> {
        console.log(userClient.getUserID(), group?.id);
        leaveGroup(group?.id, userClient.getUserID())
        window.location.reload()
    }
    const [hasTitle, setHasTitle] = useState(true)

    const checkMemberPerms = async () => {
        const status = await userClient.isAdminOfGroup(group_id);
        console.log("Admin Status:", status);
        setIsAdmin(status);
    }

    const handlePostClick = async (body, postTitle, curr_channel) => {
        
        if (!postTitle) {
                setHasTitle(false);
                return;
        } // Stop if no title is entered
        setHasTitle(true);

        try {
            const ID = localStorage.getItem('userID');
            const res = await fetch(`http://localhost:5000/threads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: postTitle,
                    body: body,
                    channel_id: curr_channel, 
                    user_id: ID //'6e426c4e-c39f-4f5b-b235-7e471a1f7d46'
                })
            });
            console.log("attempting to post: ", postTitle);
            const data = await res.json();
            // navigate(`/thread/${data.thread.id}`);
        } catch (err) {
            console.error('Error posting thread:', err);
        }
    };

    useEffect(() => {
        async function fetchGroupData() {
            //check membership
            setIsMember(await userClient.isMemberOfGroup(group_id));
        

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
        checkMemberPerms();
    }, [group_id]);



    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function goToWorkshop(group_id){
        if (group_id) navigate(`/workshop/${group_id}`);
    }
    

    return (
        <div className='group-page-container'>
            <Header setAuth = {setAuth}/>
            
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
                    <div className = "header-button-group">
                    <Button onClick={() => goToWorkshop(group_id)}> Workshop </Button>
                    {isMember ? <button onClick={handleLeaveClick}>Leave</button> : <button onClick={handleJoinClick}>Join</button>}
                     </div>
                    <h2 id="description">{group?.description}</h2>
                    
                    
                    
                </div>

                <Box className="tabs-container">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        className="tabs"
                    >
                        <Tab label="Channels" />
                        <Tab label="Workshops" />
                        <Tab label="Group Members" />
                        {isAdmin && <Tab label="Settings" />}
                    </Tabs>
                </Box>
            </div>

            <div className='pannel-containers'>
                <div className='left-pannel'>
                    
                    {value === 0 && <CreatePost handlePostClick={handlePostClick} curr_channel={currentChannel} hasTitle={hasTitle}/>}
                    
                </div>

                <div className='right-pannel'>
                    <Box className="tab-content">
                        {value === 0 && <div><ChannelOverview currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} /> </div>}
                        {value === 1 && <div><WorkshopOverview/></div>}
                        {value === 2 && <div><UsersInGroup/></div>}
                        {value === 3 && <div><Settings/></div>}
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default GroupPageTemp;