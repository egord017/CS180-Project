import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import {useNavigate, useParams} from 'react-router-dom';
import './ChannelOverview.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import'./PostPreview.css';

import { Button, Typography } from '@mui/material';


function ThreadButton({ thread_id, thread_title, thread_body }) {
	const navigate = useNavigate();

	function visitThread(thread_id){
		navigate(`/thread/${thread_id}`);
	}

    return (
		<div className = "post-preview-layout">

			<div className = "bullet-point"></div>
	

		<div className = "post-button-container">
				<Button className="thread-button" onClick={()=>{visitThread(thread_id)}}>
					<Typography className="thread-button-title">{thread_title}</Typography>
					<Typography className="thread-button-body">{thread_body}</Typography>
					
				</Button>
				
				<div className = "arrow-container" > <ArrowForwardIosIcon className = "arrow" fontSize="small" /> </div>
		</div>
		</div>
		
    );
}

export default ThreadButton;
