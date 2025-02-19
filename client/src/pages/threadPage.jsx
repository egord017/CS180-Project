import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';

import {get_groups} from "../api/groupAPI.js"

function ThreadPage(){
    const navigate = useNavigate();
    function onClickGoHome(){
        navigate('/');
    }
    function BackToChannel(channel_id){
        navigate(`/channel/${channel_id}`);
    }

    //fetch thread object using my url param thread/:thread_id
    const thread_id = Object.values(useParams());
    const [thread, setThreadData] = useState(null);
    const [comments, setComments] = useState([]);
    const [group, setGroup] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(()=>{
        async function fetchThreadAndComments(){
            const thread_obj = await fetch((`http://localhost:5000/threads/${thread_id[0]}`),
            {
                method:"GET"
            });
            const thread_data = await thread_obj.json();
            setThreadData(thread_data);
            
            const comments_obj = await fetch((`http://localhost:5000/threads/${thread_id[0]}/comments`));
            setComments(await comments_obj.json());
            return thread_data;
        }
        const thread_dat = fetchThreadAndComments();
    }, []); 
    
    useEffect(()=>{
        async function getChannelAndGroup(){
            if (!thread) return;
            const channelObj = await fetch(`http://localhost:5000/channels/${thread.channel_id}`);
            const new_channel = await channelObj.json();


            const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
            setChannel(new_channel);
            setGroup(await groupObj.json());
            //return new_channel.group_id;
        }
        getChannelAndGroup();
    }, [thread]);
    
    //somehow put data into the return ina nice way. maybe ill create a commentssection component and threadview component
    return (
        <div>
            <Button onClick={onClickGoHome}>Back</Button>
            <div>{group?.name}</div>
            <div>{channel?.name}</div>
            <div>
                <p>{thread?.title}</p>
                <p>{thread?.user_id}</p>
                <p>{thread?.body}</p>
            </div>
            
            <div>
                <div>Comments</div>
                {comments.map((comment)=>(
                    <div>{comment?.body}</div>
                ))}
            </div>


        </div>
    );
}

export default ThreadPage;