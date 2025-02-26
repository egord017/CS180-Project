import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//title
//body
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?


function ThreadPostForm(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const channel_id = useParams()[0];

    const navigate = useNavigate();

    async function handleSubmit(event){
        console.log(event);
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:5000/threads", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title:title,
                        body:body,
                        channel_id:1,
                        user_id:"9a80cfb3-5535-4889-8fca-b213ae3607ba"
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

    function handleChange(event){
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="title" require="true">Title* :</label>
            <input type="text" id="title" onChange={(e)=>(setTitle(e.target.value))}></input>

            <label for="body">Body:</label>
            <textarea  id="body" onChange={(e)=>{setBody(e.target.value)}} ></textarea>

            <button type="submit">Post Thread</button>
        </form>
    )
}

export default ThreadPostForm;
