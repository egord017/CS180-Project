import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//title
//body
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?
import './threadPostForm.css';
import Header from './Header';


function ThreadPostForm({setAuth}){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const {channel_id} = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();
        
        try{
            const res = await fetch("http://localhost:5000/threads", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title:title,
                        body:body,
                        channel_id:channel_id,
                        user_id:localStorage.getItem("userID")
                    }) //currently using a dummy user_id.                        
                });


            const data = await res.json();
            navigate(`/thread/${data.thread.id}`)

        }
        catch (err){
            
            console.error(err);
        }
    }


    return (
        <div className="form-container">
            <Header setAuth = {setAuth}/>
            <h2 className="create-thread"> Create New Thread </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="body">Body:</label>
                <textarea id="body" onChange={(e) => setBody(e.target.value)}></textarea>

                <button type="submit">Post Thread</button>
            </form>
        </div>
    );
}

export default ThreadPostForm;
