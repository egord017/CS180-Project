import {createElement, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMousePosition from '../hooks/useMousePosition';
import './critiquePostForm.css';
import Header from './Header.js';
import {strike, mark} from "../utils/markup.js";
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
    const [isSelected, setIsSelected] = useState(false);
    const mousePosition = useMousePosition();
    

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

        //VALIDATE FIRST, then manipulate.
        event.preventDefault();
        const passage= document.querySelector(".passage-body");
        const editableElements = passage.querySelectorAll('ins');
        editableElements.forEach(element => {element.contentEditable = "false";});
        const user_id = localStorage.getItem("userID");
        try{
            const res = await fetch("http://localhost:5000/critiques", 
                {
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        workshop_thread_id: workshop_thread_id,
                        user_id:user_id,
                        opening,
                        body,
                        closing,
                        edited_passage:passage.innerHTML
                    }) //currently using a dummy user_id.                        
                });
            const data = await res.json();
            navigate(`/critique/${data.id}`)

        }
        catch (err){
            alert(err);
            console.error(err);
        }
    }

    async function handleSelection(event){
        //event.stopPropagation();
        //return component.
        const selection =window.getSelection();
        const range = selection.getRangeAt(0);

        if (selection.toString().length==0){
            if (event.target.closest('ins')) return;
            if (event.target.closest('mark')) return;
            if (event.target.closest('del')) return;

            //setIsSelected(false);
            console.log(range);
            const insert = document.createElement('ins');
            insert.contentEditable = true;
        
            setTimeout(function() { //why did this work....https://stackoverflow.com/questions/2388164/set-focus-on-div-contenteditable-element
                insert.focus();
            }, 0);
            insert.addEventListener("blur", (event) => {
                if (insert.innerText.length==0){
                    insert.remove();
                }
            });
            insert.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
            range.insertNode(insert);
            return;
        }
        setSelection(selection);
        setIsSelected(true);
    }

    useEffect(() => {
        if (isSelected && selection) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
            const coord_x = rect.left+(rect.width/2)+window.scrollX;
            const coord_y = rect.top+(rect.height/2)+window.scrollY+5;
        
            const float_window = document.querySelector(".float");
            if (float_window) {
                float_window.style.top = `${coord_y}px`;
                float_window.style.left = `${coord_x}px`;
            }
        }
      }, [isSelected]);

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.closest(".float")){
                setIsSelected(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    },[]);




    return (
        <div>
          <Header/>
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
                    <textarea  id="body" onChange={(e)=>{setBody(e.target.value)}} required ></textarea>

                    <label for="closing">Closing Statements:</label>
                    <textarea  id="closing" onChange={(e)=>{setClosing(e.target.value)}} ></textarea>

                    <button type="submit">Post Thread</button>
                </form>
            </div>
            {isSelected && (
                <div className="float">
                    <button onClick={strike}>---</button>
                    <button onClick={mark}>Highlight</button>
                </div>
            )
            }
            
        </div>
        </div>
       
        
        
    )
}

export default CritiquePostForm;
