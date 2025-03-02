import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import './ChannelOverview.css';
import PostPreview from "./PostPreview";

const ChannelOverview = () => {

	return(
		<div className = 'channel-wrapper'>
		<h1 id='channel-title'> # Channel Name</h1> 
		<div className="post-preview-container">
			<PostPreview></PostPreview>
			<PostPreview></PostPreview>
			
		</div>
		
		<Button variant="outlined" id='see-more-button'>Go to Channel</Button>
		</div>

	);
};

export default ChannelOverview;