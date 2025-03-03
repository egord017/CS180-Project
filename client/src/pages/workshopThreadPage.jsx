import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import './threadPage.css';

import {get_groups} from "../api/groupAPI.js"

function ThreadPage(){
    let is_error = false;
    const navigate = useNavigate();

    function onCreateCommentPress(){
        setIsCommenting(true);
    }

    async function handleCommentSubmit(event){
        event.preventDefault();
        console.log("HI");
        try{
            const res = await fetch("http://localhost:5000/comments",
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        body:reply,
                        thread_id:thread_id,
                        user_id:"9a80cfb3-5535-4889-8fca-b213ae3607ba"
                    })
                }
            )
            const comment = await res.json();
            setComments((prev) => [...prev, comment]);
        }
        catch (err){
            console.error(err);
        }
    }

    function onClickGoHome(){
        navigate('/');
    }
    function backToChannel(channel_id){
        if (channel_id) navigate(`/channel/${channel_id}`);
    }

    //fetch thread object using my url param thread/:thread_id
    const thread_id = Object.values(useParams())[0];
    const [thread, setThreadData] = useState(null);
    const [comments, setComments] = useState([]);
    const [group, setGroup] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false);
    const [commenters, setCommenters] = useState({}); //map with key being user_id 
    const [op, setOp] = useState(null);

    const [reply, setReply] = useState("");

    //TODO: the useffects are fucked up, mush into one or something idk.
    useEffect(()=>{
        async function fetchThreadAndComments(){
            try{
                //fetch threads
                const thread_obj = await fetch((`http://localhost:5000/threads/${thread_id}`));
                const thread_data = await thread_obj.json();
                setThreadData(thread_data);
                console.log("HreL:");
                
                //fetch comments
                const comments_obj = await fetch((`http://localhost:5000/threads/${thread_id}/comments`));
                const comments_data = await comments_obj.json();
                setComments(comments_data);


                //USERS
                //fetch OP
                const op_resp = await fetch((`http://localhost:5000/profile/${thread_data.user_id}`));
                const op_data = await op_resp.json();
                console.log(op_data);
                setOp(op_data);
                //fetch channel info
                //fetch users for each comment.

                const commenters_data = await Promise.all(comments_data.map(async comment => {
                    const results = await fetch(`http://localhost:5000/profile/${comment.user_id}`)
                    return await results.json();    
                }));

                const users_dict = {};
                for (const i in commenters_data){
                    
                    console.log(commenters_data[i]);
                    users_dict[commenters_data[i].userid] = commenters_data[i];
                }
                console.log(users_dict);
                setCommenters(users_dict);
                
                
                //fetch channel info
                const channelObj = await fetch(`http://localhost:5000/channels/${thread_data.channel_id}`);
                const new_channel = await channelObj.json();
            
                //fetch group info
                const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
                setChannel(new_channel);
                setGroup(await groupObj.json());
   
            }
            catch (err){
                console.error(err);
                is_error=true;
            }
            
        }
        fetchThreadAndComments();
    }, []); 
        
   
    async function deleteThread(){
        const req = await fetch((`http://localhost:5000/threads/${thread_id[0]}`),
        {
            method:"DELETE"
        }
        );


        navigate(`/channel/${channel?.id}`)

    }

    async function deleteComment(comment_id){
        try {
            const response = await fetch((`http://localhost:5000/comments/${comment_id}`),
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
            <Button onClick={()=>{backToChannel(thread?.channel_id)}}>Back</Button>
            <Button className="delete-btn" onClick={()=>{deleteThread()}}>Delete Thread</Button>
            <div>{group?.name}</div>
            <div>{channel?.name}</div>
            <div className="op-container">
                <div className="op">
                    <p>{op?.username}</p>
                </div>
                <div>
                    <p>{thread?.title}</p>
                    <p>{thread?.body}</p>
                </div>
                
            </div>
            <button onClick={()=>{onCreateCommentPress()}}>Reply</button>
            {isCommenting ? 
                (<form onSubmit={handleCommentSubmit}>
                    <textarea onChange={(e)=>{setReply(e.target.value)}} name="comment-body" id="comment-body"></textarea>
                    <button type="submit"></button>
                </form>)
                :
                null
                }
            
            <div>
                <div>Comments</div>
                {comments.map((comment)=>(
                    <div className="comment-container">
                        <div>{commenters[comment?.user_id]?.username} | {comment?.body}</div>
                        <button className="del-btn" onClick={()=>{deleteComment(comment.id)}}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThreadPage;