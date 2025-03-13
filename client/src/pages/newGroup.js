import React, { useState } from "react";
import "./newGroup.css";
import {newGroup} from "../api/groupAPI";
import { useNavigate } from 'react-router-dom';

function NewGroup({setAuth}) {
    const [submitErrors, setSubmitErrors] = useState({
        "group_name":"",
        "description":""
    });


    const [inputs, setInputs] = useState({
        groupName: "",
        description: ""
    });

    const {groupName, description} = inputs;

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };

    const handleExit = () => {
        navigate('/groups');
    }
    
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
            //clientside
            let hasError = false;
            if (groupName===""){
                setSubmitErrors((prev)=>({...prev, group_name:"Group must have a name."}));
                hasError=true;
            }
            else if (groupName.trim()===""){
                setSubmitErrors((prev)=>({...prev, group_name:"Group must have letters."}));
                hasError=true;

            }
            else{
                setSubmitErrors((prev)=>({...prev, group_name:""}));
            }
            if (description===""){
                setSubmitErrors((prev)=>({...prev, description:"Must include description."}));
                hasError=true;

            }
            else if (description.trim()===""){
                setSubmitErrors((prev)=>({...prev, description:"Description must contain letters."}));
                hasError=true;

            }
            else{
                setSubmitErrors((prev)=>({...prev, description:""}));
            }
            if (hasError) return;


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
            <div className="group-form">
            <h2>New Group</h2>
            <form onSubmit={handleSubmit}>
                
            <button onClick={handleExit} id="exit">X</button> 
                {/* placeholder for a group's image */}

                <div className="firstline-container">

                    
                    
                    <img src={"/images/placeholder.jpg"} alt={"groupimage"} className="image-box" />
                    <div>
                {submitErrors.group_name && <p>{submitErrors.group_name}</p>}
                {submitErrors.description && <p>{submitErrors.description}</p>}
                <input
                        type="text"
                        id="groupname"
                        name="groupName"
                        placeholder="Group Name..."
                        value={groupName}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    

                    <button id="submit" type="submit">✓</button>

                </div>

                {/* text area for group description */}
               
                <textarea
                     name="description"
                     id="groupdescription"
                     placeholder="Group Description..."
                     value={description}
                     onChange={e => onChange(e)}
                />
             
            </form>
            </div>
            
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