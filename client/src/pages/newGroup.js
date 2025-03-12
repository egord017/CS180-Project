import React, { useState } from "react";
import "./newGroup.css";
import {newGroup} from "../api/groupAPI";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function NewGroup({setAuth}) {
    const [inputs, setInputs] = useState({
        groupName: "",
        description: ""
    });

    const {groupName, description} = inputs;

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };
    
    const userID = localStorage.userID;

    // image
    //const handleImageUpload = (event) => {
       // setImage(event.target.files[0]);
    //};
    
    // submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({groupName, description, userID});

        try {
            const response = await newGroup(groupName, description, userID);
            console.log(response)
            if(response && response.created_group){
                navigate(`/group/${response.created_group[0].id}`);
            }

        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <Header setAuth={setAuth}/>
            <h2>New Group</h2>
            <form onSubmit={handleSubmit}>
                {/* text input for group name */}
                <input
                    type="text"
                    name="groupName"
                    placeholder="Group Name..."
                    value={groupName}
                    onChange={e => onChange(e)}
                />
                {/* text area for group description */}
                <textarea
                     name="description"
                     placeholder="Group Description..."
                     value={description}
                     onChange={e => onChange(e)}
                />
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}

//Code for group image, temporarily removed

//{/* file image upload */}
//<input
//type="file"
//accept="image/*"
//onChange={handleImageUpload}
///>


export default NewGroup;