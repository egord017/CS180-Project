import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
//title : 
//body : 
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?


function WorkshopThreadPostForm(){
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    const [preference, setPreference] = useState("");
    const [postBody, setPostBody] = useState("");
    const [passageBody, setPassageBody] = useState("");
    const {workshop_id} = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();
        
        try{
            const res = await fetch("http://localhost:5000/workshop-threads", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id:localStorage.getItem("userID"),
                        workshop_id,
                        title,
                        context,
                        preference,
                        post_body: postBody,
                        passage_body: passageBody
                        
                        
                    }) //currently using a dummy user_id.                        
                });
            const data = await res.json();
       
            
            navigate(`/workshop-thread/${data.thread.id}`)

        }
        catch (err){
            alert(err);
            console.error(err);
        }
    }


    return (
        <div>
            <Header/>
            <div className="page">
        
        <form onSubmit={handleSubmit}>
            <label for="title" require="true">Title :</label>
            <input type="text" id="title" onChange={(e)=>(setTitle(e.target.value))} required></input>

            <label for="context">
                Context For Work:
                <p>Any context needed going into the passage/chapter. Historical facts/information from previous chapters, etc</p>
            </label>
            <textarea  id="context" onChange={(e)=>{setContext(e.target.value)}}></textarea>

            <label for="preference">Critique Guidance:</label>
            <textarea  id="preference" onChange={(e)=>{setPreference(e.target.value)}}></textarea>
            <label for="post_body">Post Body/Author's Notes:</label>
            <textarea  id="post_body" onChange={(e)=>{setPostBody(e.target.value)}} ></textarea>
            <label for="passage_body">Your Work/Passage:</label>
            <textarea  id="passage_body" onChange={(e)=>{setPassageBody(e.target.value)}} required></textarea>

            
            <button type="submit">Post Thread</button>
        </form>
    </div>
        </div>
        

    )
}

export default WorkshopThreadPostForm;
