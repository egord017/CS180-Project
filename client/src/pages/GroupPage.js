import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import './GroupPage.css';
import GroupUserList from "./GroupUserList";
import ChannelOverview from "./ChannelOverview";

const GroupPage = () => {
  const [groups, setGroups] = useState([]); // Initially empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const users = [
    { name: "John Doe", role: "Admin" },
    { name: "Jane Smith", role: "Member" },
    { name: "Alice Johnson", role: "Moderator" }
];


  useEffect(() => {
    // Fetch groups from the API
    const fetchGroups = async () => {
      try {
        const response = await fetch("https://your-api.com/groups"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json(); // Convert response to JSON
        setGroups(data); // Update state with fetched groups
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGroups(); // Call the function
  }, []); // Empty dependency array -> Runs once on mount

  return (
	
    <div>
		<Header />
		
      <div className = 'group-page-header'>
		<img src = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" alt = "placeholder" height = "200"/>
    <div className = "group-page-title-description-layout">
		<div className = 'group-page-title'>
    <h1 id='title'>GROUP NAME </h1> 
    <GroupUserList users={users} />
    </div>
    
	  	<h2> Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h2>
       
    </div>
    </div>
    
	  <div id='content'> 
     
      {/* <Button variant="contained" color="primary" component={Link} to="/create-group">
        Create New Group
      </Button>

      {loading && <p>Loading groups...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>} */}

      {/* display list of groups */}
      {/* <List>
        {groups.map((group) => (
          <ListItem key={group.id} component={Link} to={`/groups/${group.id}`} button>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List> */}
{/*   
      <div className = 'group-page-header'>
      <h1 id='title'>GROUP NAME </h1> 
      <GroupUserList users={users} />
    
	  	<h2> Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h2>
       </div> */}

       <ChannelOverview/>
	  </div>
    
    </div>
  );
};

export default GroupPage;
