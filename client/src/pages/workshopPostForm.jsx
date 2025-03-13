
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

import Header from './Header.js';

function ChannelPostForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {group_id} = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event){
        console.log(event);
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:5000/workshops", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name:name,
                        description:description,
                        group_id:group_id
                    }) //currently using a dummy user_id.                        
                });
            
            const data = await res.json();
            console.log(data);
            //navigate if successful
            navigate(`/workshop/${data.id}`)

        }
        catch (err){
            console.error(err);
        }

        

    }


    return (
        <div>
            <Fragment>
            <Header/>
            <div>Create New Workshop Channel</div>
            <form onSubmit={handleSubmit}>
                <label for="channel_name" require="true">Workshop Name* :</label>
                <input type="text" id="channel_name" onChange={(e)=>(setName(e.target.value))} required></input>

                <label for="description">Workshop Description:</label>
                <textarea  id="description" onChange={(e)=>{setDescription(e.target.value)}} required></textarea>

                <button type="submit">Create Workshop</button>
            </form>
        </Fragment>
        </div>
            
            
        
    )
}

export default ChannelPostForm;
