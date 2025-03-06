import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './critiquePostForm.css';
//title
//body
//user_id (supplied innately)
//channel_id (should be supplied ...in URL?)
//channel/id/submit ?


function CritiquePostForm(){
    const [opening, setOpening] = useState("");
    const [body, setBody] = useState("");
    const [closing, setClosing] = useState("");
    const [workshopThread, setWorkshopThread] = useState("");
    const {workshop_thread_id} = useParams();
    const [selection, setSelection] = useState(null);
    

    const navigate = useNavigate();


    useEffect(()=>{
        async function getData(){
            //get thread
            const thread_obj = await fetch(`http://localhost:5000/workshop-threads/${workshop_thread_id}`);
            const thread_data = await thread_obj.json();
            setWorkshopThread(thread_data);

        }

        getData();
    },[]);


    async function handleSubmit(event){
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:5000/critiques", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        workshop_thread_id: workshop_thread_id,
                        user_id:"9a80cfb3-5535-4889-8fca-b213ae3607ba",
                        opening,
                        body,
                        closing
                    }) //currently using a dummy user_id.                        
                });
            const data = await res.json();
            navigate(`/critique/${data.id}`)

        }
        catch (err){
            console.error(err);
        }
    }

    async function handleSelection(){
        const passage = document.querySelector('.passage-body');

        const selection =window.getSelection();
        setSelection();
        console.log(selection);
        const selected_text = selection.toString();
        const range= selection.getRangeAt(0);
        console.log(selection.toString());
        // console.log(range);
      
        const parent_anchor = selection.anchorNode.parentNode;
        const parent_focus = selection.anchorNode.parentNode;
        if (parent_anchor.classList && parent_anchor.classList.contains("strikethrough")){
            const new_string = document.createTextNode(selected_text);

            const span_former = parent_anchor.innerText.slice(0, selection.anchorOffset);
            const span_latter = parent_anchor.innerText.slice(selection.focusOffset);

            const span1 = document.createElement("span");
            span1.innerText=span_former;


            

            //parent.parentNode.removeChild(parent);


            console.log("former: ", span_former);
            console.log("latter: ", span_latter);


            //once i figure this out
            //we can do strikethroughs, highlights, comments.
            //mark
            //ins
            //del

            console.log(
                    "Nice"
            )
        }
        else{
            const new_string = document.createElement('span');
            new_string.className='strikethrough';
            new_string.innerText = selected_text;
            range.deleteContents();
            range.insertNode(new_string);
           
        }

        // console.log(selection.getRangeAt(0).getBoundingClientRect());
        // console.log(selection.anchorOffset);
        // console.log(selection.focusOffset);

        

        

    }

    return (
        <div className="page">
            <div className="passage">
                <h3>Author's Notes</h3>
                <p>{workshopThread?.post_body}</p>
                <h3>Context</h3>
                <p>{workshopThread?.context}</p>
                <h3>Work</h3>
                <p className="passage-body" onMouseUp={handleSelection}>{workshopThread?.passage_body}</p>

            </div>
            <div className="right-container">
                <h3>Critique Preference</h3>
                <p>{workshopThread?.preference}</p>
                <form onSubmit={handleSubmit}>
                    <label for="opening">Opening :</label>
                    <textarea type="text" id="opening" onChange={(e)=>(setOpening(e.target.value))}></textarea>

                    <label for="body">Main Critique:</label>
                    <textarea  id="body" onChange={(e)=>{setBody(e.target.value)}} ></textarea>

                    <label for="closing">Closing Statements:</label>
                    <textarea  id="closing" onChange={(e)=>{setClosing(e.target.value)}} ></textarea>

                    <button type="submit">Post Thread</button>
                </form>
            </div>

        </div>
        
    )
}

export default CritiquePostForm;
