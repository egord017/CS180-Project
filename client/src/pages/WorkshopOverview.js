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
import ChannelPostForm from './channelPostForm';
import workshopPage from './workshopPage';
import './WorkshopOverview.css';

function WorkshopOverview({ currentChannel, setCurrentChannel }) {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const [channelName, setChannelName] = useState("");
    const { group_id } = useParams();
    const navigate = useNavigate();
    const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [workshops, setWorkshops] = useState([]);
	const [workshopThreads, setWorkshopThreads] = useState({});
	const [selectedWorkshop, setSelectedWorkshop] = useState('');


	function visitChannel(channel_id) {
        navigate(`/channel/${channel_id}`);
    }
    function visitChannelForm(){
        navigate('channel-submit');
    }

    function visitWorkshop(channel_id) {
        navigate(`/workshop/${channel_id}`);
    }
    function visitWorkshopForm(){
        navigate('workshop-submit');
    }

    function visitChannel(channel_id) {
        setCurrentChannel(channel_id);
    }

    useEffect(() => {
        console.log("Updated currentChannel:", currentChannel);
    }, [currentChannel]);

    useEffect(() => {
        const selectedChannel = channels.find(channel => channel.id === currentChannel);
        setChannelName(selectedChannel ? selectedChannel.name : "");
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
                //fetch and wait for both fetches to finish...
                const [group_obj, channels_obj, workshops_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`),
                    fetch(`http://localhost:5000/groups/${group_id}/workshops`)
                ]);

                const group_data = await group_obj.json();
                const channels_data = await channels_obj.json();
                const workshops_data = await workshops_obj.json();

                setGroup(group_data);
                setChannels(channels_data);
                setWorkshops(workshops_data);

            //craete promise.all to fetch multiple req??
            //for each channel grab all threads here. wait for all threads to return.
                const threads_data = await Promise.all(channels_data.map(async channel => {
                    const results = await fetch(`http://localhost:5000/channels/${channel.id}/threads`)
                    return await results.json();    
                }));
                const threads_dict = channels_data.reduce((chan, channel, index) => {
                    chan[channel.id] = threads_data[index];
                    return chan;
                }, {});
                setThreads(threads_dict);

                const ws_threads_data = await Promise.all(workshops_data.map(async workshop => {
                    const results = await fetch(`http://localhost:5000/workshops/${workshop.id}/threads`)
                    return await results.json();    
                }));
                const ws_threads_dict = workshops_data.reduce((ws, workshop, index) => {
                    ws[workshop.id] = ws_threads_data[index];
                    return ws;
                }, {});
                setWorkshopThreads(ws_threads_dict);


            } catch (error) {
                console.error("error fetching in group : ", error);
            }
        }


        //console.log("running useeffect");
        fetchGroupData();
    }, [group_id]);

	function getWorkshopInfo(channel_id) {
			const channel = workshops.find(c => c.id == channel_id);
			if (!channel) return null;
			return (
				<Fragment>
					<div>{channel.name}</div>
					<div>{channel.description}</div>
					<div>-------------</div>
				</Fragment>
			);
		}

    const handleOpenChannelModal = () => setIsChannelModalOpen(true);
    const handleCloseChannelModal = () => setIsChannelModalOpen(false);

    const handleOpenCreateModal = () => setIsCreateModalOpen(true);
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    const currentThreads = threads[currentChannel] || [];

    return (
        <div>
			{/* <div className="workshops-container">




						<button onClick={()=>(visitWorkshopForm())}>Create Workshop</button>

						{Object.entries(workshopThreads).map(([workshop_id, ws_thread_list]) => (
							<Button class="workshop-card" key={workshop_id} onClick={() => visitWorkshop(workshop_id)}>
								
								{getWorkshopInfo(workshop_id)}
								{ws_thread_list.slice(0,3).map((thread) => (
									<Fragment key={thread.id}>
										<div>{thread.title}</div>
										<p>{thread.body?.substr(0, 25)}</p>
										<div>--------</div>
									</Fragment>
								))}
							</Button>
						))}
						</div> */}


				<div className='workshop-overview-container'>
					<div> <h1>All Workshops:</h1> </div>
					<div className="workshops-scroll-container">
                {workshops.map(workshop => (
                    <button 
							key={workshop.id} 
							className={`workshop-card ${selectedWorkshop === workshop.id ? 'selected' : ''}`} 
							onClick={() => visitWorkshop(workshop.id)}>
							<div>{workshop.name}</div>
							<div>{workshop.description}</div>
						</button>
					))}
				</div>
				<button className="create-workshop-btn" onClick={visitWorkshopForm}>Create New Workshop</button>
				{/* <div className="selected-workshop">
					<h3>Selected Workshop:</h3>
					{selectedWorkshop ? workshops.find(w => w.id === selectedWorkshop)?.name : "None"}
				</div> */}
				</div>
        </div>
    );
}

export default WorkshopOverview;
