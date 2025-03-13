import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import './threadPage.css';
import Header from './Header.js';
import * as userClient from "./../utils/user.js";

import {get_groups} from "../api/groupAPI.js"

function WorkshopThreadPage({setAuth}){
    const [isAdmin, setIsAdmin] = useState(false);
    

    let is_error = false;
    const navigate = useNavigate();


    function onClickGoHome(){
        navigate('/');
    }

    function backToWorkshop(workshop_id){
        if (workshop_id) navigate(`/workshop/${workshop_id}`);
    }
    function visitCritique(critique_id){
        if (critique_id) navigate(`/critique/${critique_id}`)
    }

    function visitCritiqueForm(){
        navigate("submit");
    }
    //fetch thread object using my url param thread/:thread_id
    const thread_id = Object.values(useParams())[0];
    const [thread, setThreadData] = useState(null);
    const [critiques, setCritiques] = useState([]);
    const [group, setGroup] = useState(null);
    const [workshop, setWorkshop] = useState(null);

    const [critics, setCritics] = useState({}); //map with key being user_id 
    const [op, setOp] = useState(null);

    const [reply, setReply] = useState("");

    //TODO: the useffects are fucked up, mush into one or something idk.
    useEffect(()=>{
        async function fetchThreadAndCritiques(){
            try{
                //fetch threads
                const thread_obj = await fetch((`http://localhost:5000/workshop-threads/${thread_id}`));
                const thread_data = await thread_obj.json();
                setThreadData(thread_data);

                //fetch critiques
                const critiques_obj = await fetch((`http://localhost:5000/workshop-threads/${thread_id}/critiques`));
                const critiques_data = await critiques_obj.json();
                console.log("critiques:", thread_id, critiques_data);
                setCritiques(critiques_data);

                //USERS
                //fetch OP
                const op_resp = await fetch((`http://localhost:5000/profile/${thread_data.user_id}`));
                const op_data = await op_resp.json();
                
                setOp(op_data);
                //fetch channel info
                //fetch users for each comment.

                const critics_data = await Promise.all(critiques_data.map(async comment => {
                    const results = await fetch(`http://localhost:5000/profile/${comment.user_id}`)
                    return await results.json();    
                }));

                const users_dict = {};
                for (const i in critics_data){
                    
                    console.log(critics_data[i]);
                    users_dict[critics_data[i].userid] = critics_data[i];
                }
                console.log(users_dict);
                setCritics(users_dict);
                
                
                //fetch channel info
                const channelObj = await fetch(`http://localhost:5000/workshops/${thread_data.workshop_id}`);
                const new_channel = await channelObj.json();
            
                //fetch group info
                const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
                setWorkshop(new_channel);
                const group_data = await groupObj.json();
                setGroup(group_data);
                setIsAdmin(await userClient.isAdminOfGroup(group_data?.id));
                
   
            }
            catch (err){
                console.error(err);
                is_error=true;
            }
            
        }
        fetchThreadAndCritiques();
    }, []); 
        
   
    async function deleteThread(){
        const req = await fetch((`http://localhost:5000/workshop-threads/${thread_id}`),
        {
            method:"DELETE"
        }
        );
        navigate(`/workshop/${workshop?.id}`)
    }

    async function deleteComment(e,comment_id){
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await fetch((`http://localhost:5000/critiques/${comment_id}`),
                {
                    method:"DELETE"
                }
            );
            
            window.location.reload();
        }
        catch (err){
            console.error(err);
        }
    }


    if (is_error==true){
        return (
            <div>Page not found.</div>
        )
    }
    //somehow put data into the return ina nice way. maybe ill create a commentssection component and threadview component
    return (
        <div>
            <Header/>
            <Button onClick={()=>{backToWorkshop(thread?.workshop_id)}}>Back</Button>
            {
                (isAdmin ||userClient.isOwnerOfID(op?.userid)) && <Button className="delete-btn" onClick={()=>{deleteThread()}}>Delete Thread</Button>
            }
            
            <div>{group?.name}</div>
            <div>{workshop?.name}</div>
            <div className="op-container">
                <div className="op">
                    <p>{op?.username}</p>
                </div>
                <div>
                    <p>{thread?.title}</p>
                    <p>{thread?.context}</p>
                    <p>{thread?.post_body}</p>
                    <p>Passage</p>
                    <p>{thread?.passage_body}</p>
                </div>
            </div>
            <button onClick={()=>{visitCritiqueForm()}}>Critique</button>
            <div>
                <div>Critiques</div>
                {critiques.map((comment)=>(
                    <button key={comment.id} className="comment-container" onClick={()=>{visitCritique(comment.id)}}>
                        <div>{critics[comment?.user_id]?.username}'s Critique</div>
                        <div>{new Date(comment?.time_stamp).toLocaleString('en-US')}</div>
                        {console.log("PLEASE CHECK:", userClient.isOwnerOfID(comment.id))}
                        {(isAdmin || userClient.isOwnerOfID(comment.user_id) )&&  <button className="del-btn" onClick={(e)=>{deleteComment(e,comment.id)}}>Delete</button>}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default WorkshopThreadPage;