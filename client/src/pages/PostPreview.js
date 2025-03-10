import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import './ChannelOverview.css';


const PostPreview = () => {

	return(
		<div className = 'channel-wrapper'>
		<h1 id='channel-title'> # Channel Name</h1> 
		
		<Button variant="outlined" id='see-more-button'>Go to Channel</Button>
		</div>

	);
};

export default PostPreview;