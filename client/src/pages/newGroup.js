import React, { useState } from "react";
import "./newGroup.css";
import {newGroup} from "../api/groupAPI";

function NewGroup() {
    const [inputs, setInputs] = useState({
        groupName: "",
        description: ""
    });

    const {groupName, description} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };
    
    const userID = localStorage.userID;

    // image
    //const handleImageUpload = (event) => {
       // setImage(event.target.files[0]);
    //};
    
    // submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({groupName, description, userID});
        newGroup(groupName, description, userID);
    };
    
    return (
        <div className="new-group-container">
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