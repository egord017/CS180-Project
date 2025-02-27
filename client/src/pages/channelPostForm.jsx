
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

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
        <Fragment>
            <div>Create New Channel</div>
            <form onSubmit={handleSubmit}>
                <label for="channel_name" require="true">Channel Name* :</label>
                <input type="text" id="channel_name" onChange={(e)=>(setName(e.target.value))}></input>

                <label for="description">Channel Description:</label>
                <textarea  id="description" onChange={(e)=>{setDescription(e.target.value)}} ></textarea>

                <button type="submit">Create Channel</button>
            </form>
        </Fragment>
        
    )
}

export default ChannelPostForm;
