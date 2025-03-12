import React, { useState, useEffect } from 'react';
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
import './Settings.css';

function Settings({ currentChannel, setCurrentChannel }) {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [channelName, setChannelName] = useState("");
    const { group_id } = useParams();
    const navigate = useNavigate();

    const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  
    function visitChannel(channel_id) {
        setCurrentChannel(channel_id);
    }

	const deleteChannel = async (channelId) => {
		try {
			const response = await fetch(`http://localhost:5000/channels/${channelId}`, {
				method: 'DELETE',
			});
	
			if (response.ok) {
				setChannels(channels.filter(channel => channel.id !== channelId));
				alert("Channel deleted successfully!");
			} else {
				alert("Failed to delete channel.");
			}
		} catch (error) {
			console.error("Error deleting channel: ", error);
			alert("An error occurred while deleting the channel.");
		}
	};

	const deleteGroup = async () => {
		const isConfirmed = window.confirm("Are you sure you want to delete this group? This action cannot be undone.");
	
		if (!isConfirmed) return;
	
		try {
			const response = await fetch(`http://localhost:5000/groups/${group_id}`, {
				method: 'DELETE',
			});
	
			if (response.ok) {
				alert("Group deleted successfully!");
				navigate("/groups"); // Redirect to groups page after deletion
			} else {
				alert("Failed to delete group.");
			}
		} catch (error) {
			console.error("Error deleting group: ", error);
			alert("An error occurred while deleting the group.");
		}
	};
	
	
    useEffect(() => {
        console.log("Updated currentChannel:", currentChannel);
    }, [currentChannel]);

    useEffect(() => {
        const selectedChannel = channels.find(channel => channel.id === currentChannel);
        setChannelName(selectedChannel ? selectedChannel.name : "");
    }, [currentChannel, channels]);

    
    useEffect(() => {
        async function fetchGroupData() {
            try {
                const [group_obj, channels_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`)
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

                console.log(threads_dict);
            } catch (error) {
                console.error("Error fetching group data: ", error);
            }
        }
        
        fetchGroupData();
    }, [group_id]);

    const handleOpenChannelModal = () => setIsChannelModalOpen(true);
    const handleCloseChannelModal = () => setIsChannelModalOpen(false);


    return (
        <div>
        
                <div className = "settings-button-group">
                    <Button onClick={handleOpenChannelModal} >
                        Delete a Channel
                    </Button>
					<Button onClick={deleteGroup} className="delete-group-button">
					Delete Group
				</Button>


                </div>
        
            <Modal open={isChannelModalOpen} onClose={handleCloseChannelModal}>
                <Box className="modal-container">
                    <Typography variant="h5">Channels List</Typography>
                    {/* <Button onClick={handleCloseChannelModal} className="close-button">Close</Button> */}
                    {channels.length > 0 ? (
                        channels.map((channel) => (
                            <div
								key={channel.id}
								className="channel-item"
								onClick={() => {
									const isConfirmed = window.confirm(`Are you sure you want to delete the channel: ${channel.name}?`);
									if (isConfirmed) {
										// Call a function to delete the channel
										deleteChannel(channel.id);
									}
								}}
							>
								<h3>{channel.name}</h3>
								<p>{channel.description}</p>
							</div>
                        ))
                    ) : (
                        <Typography>No channels available in this group.</Typography>
                    )}
                   
                </Box>
            </Modal>

			

          
        </div>
    );
}

export default Settings;
