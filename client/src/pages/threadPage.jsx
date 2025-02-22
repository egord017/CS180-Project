import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';

import {get_groups} from "../api/groupAPI.js"

function ThreadPage(){
    let is_error = false;
    const navigate = useNavigate();
    function onClickGoHome(){
        navigate('/');
    }
    function backToChannel(channel_id){
        if (channel_id) navigate(`/channel/${channel_id}`);
    }

    

    //fetch thread object using my url param thread/:thread_id
    const thread_id = Object.values(useParams());
    const [thread, setThreadData] = useState(null);
    const [comments, setComments] = useState([]);
    const [group, setGroup] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(()=>{
        async function fetchThreadAndComments(){
            try{
                const thread_obj = await fetch((`http://localhost:5000/threads/${thread_id[0]}`),
                {
                    method:"GET"
                });
                const thread_data = await thread_obj.json();
                setThreadData(thread_data);
                console.log(thread_data);
                
                const comments_obj = await fetch((`http://localhost:5000/threads/${thread_id[0]}/comments`));
                setComments(await comments_obj.json());
   
            }
            catch (err){
                console.error(err);
                is_error=true;
            }
            
        }
        fetchThreadAndComments();
    }, []); 
    
    useEffect(()=>{
        async function getChannelAndGroup(){
            try{
                if (!thread) return;
                console.log(thread.channel_id);
                const channelObj = await fetch(`http://localhost:5000/channels/${thread.channel_id}`);
                const new_channel = await channelObj.json();
    
    
                const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
                setChannel(new_channel);
                setGroup(await groupObj.json());
                //return new_channel.group_id;
            }
            catch (err){
                console.error(err);
            }
            
        }
        getChannelAndGroup();
    }, [thread]);

    async function deleteThread(){
        const req = await fetch((`http://localhost:5000/threads/${thread_id[0]}`),
        {
            method:"DELETE"
        }
        );
        return (
            <div>THREAD DELETED</div>
        );

    }


    if (is_error==true){
        return (
            <div>Page not found.</div>
        )
    }
    //somehow put data into the return ina nice way. maybe ill create a commentssection component and threadview component
    return (
        <div>
            <Button onClick={()=>{backToChannel(thread?.channel_id)}}>Back</Button>
            <Button className="delete-btn" onClick={()=>{deleteThread()}}>Delete Thread</Button>
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