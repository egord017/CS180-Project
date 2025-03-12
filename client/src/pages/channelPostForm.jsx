
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './channelPostForm.css';

//NAME
//DESCRIPTION
//CHANNELS
//
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?


function ChannelPostForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {group_id} = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event){
        console.log(event);
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:5000/channels", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name:name,
                        description:description,
                        channel_id:1,
                        group_id:group_id
                    }) //currently using a dummy user_id.                        
                });
            const data = await res.json();

            console.log(data.thread);
            //navigate if successful
            navigate(`/thread/${data.thread.id}`)

        }
        catch (err){
            console.error(err);
        }

        

    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="channel_name">Channel Name: </label>
                <input type="text" id="channel_name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="description">Channel Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button type="submit">Create Channel</button>
            </form>
        </div>
    );
}

export default ChannelPostForm;
