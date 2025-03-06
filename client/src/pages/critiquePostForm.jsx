import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMousePosition from '../hooks/useMousePosition';
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
    const [isSelected, setIsSelected] = useState(true);

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

    async function handleSelection(event){
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
        //setIsSelected(true);
        
        const rect = range.getBoundingClientRect();
        

        const coord_x = rect.left+(rect.width/2)+window.scrollX;
        const coord_y = rect.top+(rect.height/2)+window.scrollY+5;
        
        const float_window = document.querySelector(".float");
        if (float_window) {
            float_window.style.top = `${coord_y}px`;
            float_window.style.left = `${coord_x}px`;
        }
        
        
    }

    // useEffect(() => {
    //     const checkOutOfBoundsClick = (event) => {
    //         const float_window = document.querySelector(".float");
    //         if (float_window && !float_window.contains(event.target)) {
    //             setIsSelected(false); 
    //         }
    //     };

    //     document.addEventListener('click', checkOutOfBoundsClick);

    //     return () => {
    //         document.removeEventListener('click', checkOutOfBoundsClick);
    //     };
    // }, []);

    async function strike(event){
        event.stopPropagation();
        const passage = document.querySelector('.passage-body');
        const selection =window.getSelection();
        if (selection.toString().length==0){
            return;
        }
        setSelection();
        const selected_text = selection.toString();
        const range= selection.getRangeAt(0);

        const safari_range = document.createRange();
        
        const parent_anchor = selection.anchorNode.parentNode;
        const parent_focus = selection.focusNode.parentNode;

        const anchor = range.startContainer;
        console.log("anchor:",parent_anchor);
        console.log("focus:",parent_focus);
  

        if ((parent_anchor.tagName=="DEL" || parent_anchor.tagName=="MARK") && parent_anchor==parent_focus){
            console.log("SPLIT.");
            let new_string = document.createTextNode(selected_text)
            let split_type = "del";
            if (parent_anchor.tagName=="MARK"){
                split_type = "mark";
                new_string = document.createElement("del");
                new_string.innerText = selected_text;
            }
            
            const placeholder = document.createElement("del");
            placeholder.innerText = selected_text;
            range.deleteContents();
            range.insertNode(placeholder);

            const prev = placeholder.previousSibling;
            const next = placeholder.nextSibling;
            console.log(prev);
            console.log(next);

            const split_1 = document.createElement(split_type);
            const split_2 = document.createElement(split_type);
            
            split_1.innerText = prev.nodeValue;
            parent_anchor.parentNode.insertBefore(split_1, parent_anchor);
            
            parent_anchor.parentNode.insertBefore(new_string, parent_anchor);

            split_2.innerText = next.nodeValue;
            parent_anchor.parentNode.insertBefore(split_2, parent_anchor); 

            parent_anchor.remove();
        }
        else{
            const new_string = document.createElement('del');
            //new_string.className='strikethrough';
            new_string.innerText = selected_text;
            range.deleteContents();
            range.insertNode(new_string);

            const prev = new_string.previousSibling;
            const next = new_string.nextSibling;

            let merged_string = "";
            if ((prev.nodeType==Node.TEXT_NODE && prev.nodeValue=="") || prev.tagName=="DEL"){
                const prev_element = new_string.previousElementSibling;
                if (prev_element.tagName=="DEL"){
                    // console.log("Merge before.");
                    // console.log(prev);
                    merged_string+=prev_element.innerText;
                    prev_element.remove();
                }
            }
            merged_string+=new_string.innerText;
            if ((next.nodeType==Node.TEXT_NODE && next.nodeValue=="") || next.tagName=="DEL"){
                const next_element = new_string.nextElementSibling;
                if (next_element.tagName=="DEL"){
                    // console.log("Please merge after.");
                    // console.log(next);
                    merged_string+= next_element.innerText;
                    next_element.remove();
                }
            }
        

            new_string.innerText = merged_string;

        }
    }


    async function mark(event){
        event.stopPropagation();
        const passage = document.querySelector('.passage-body');
        const selection =window.getSelection();
        if (selection.toString().length==0){
            return;
        }
        setSelection();
        const selected_text = selection.toString();
        const range= selection.getRangeAt(0);
        const parent_anchor = selection.anchorNode.parentNode;
        const parent_focus = selection.focusNode.parentNode;

        const anchor = range.startContainer;
        console.log("anchor:",parent_anchor);
        console.log("focus:",parent_focus);
  

        if ((parent_anchor.tagName=="DEL" || parent_anchor.tagName=="MARK") && parent_anchor==parent_focus){
            console.log("SPLIT.");
            
            let new_string = document.createTextNode(selected_text)
            let split_type = "mark";
            if (parent_anchor.tagName=="DEL"){
                split_type = "del";
                new_string = document.createElement("mark");
                new_string.innerText = selected_text;
            }
            const placeholder = document.createElement("mark");
            placeholder.innerText = selected_text;
            range.deleteContents();
            range.insertNode(placeholder);

            const prev = placeholder.previousSibling;
            const next = placeholder.nextSibling;
            console.log(prev);
            console.log(next);

            const split_1 = document.createElement(split_type);
            const split_2 = document.createElement(split_type);
            
            split_1.innerText = prev.nodeValue;
            parent_anchor.parentNode.insertBefore(split_1, parent_anchor); 
            
            parent_anchor.parentNode.insertBefore(new_string, parent_anchor);

            split_2.innerText = next.nodeValue;
            parent_anchor.parentNode.insertBefore(split_2, parent_anchor); 

            parent_anchor.remove();
        }
        else{
            const new_string = document.createElement('mark');
            new_string.innerText = selected_text;
            range.deleteContents();
            range.insertNode(new_string);

            const prev = new_string.previousSibling;
            const next = new_string.nextSibling;

            let merged_string = "";
            if ((prev.nodeType==Node.TEXT_NODE && prev.nodeValue=="") || prev.tagName=="MARK"){
                const prev_element = new_string.previousElementSibling;
                if (prev_element.tagName=="MARK"){
                    // console.log("Merge before.");
                    // console.log(prev);
                    merged_string+=prev_element.innerText;
                    prev_element.remove();
                }
            }
            merged_string+=new_string.innerText;
            if ((next.nodeType==Node.TEXT_NODE && next.nodeValue=="") || next.tagName=="MARK"){
                const next_element = new_string.nextElementSibling;
                if (next_element.tagName=="MARK"){
                    // console.log("Please merge after.");
                    // console.log(next);
                    merged_string+= next_element.innerText;
                    next_element.remove();
                }
            }
        

            new_string.innerText = merged_string;

        }

        
        
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
            {isSelected ? 
                (
                <div className="float">
                    <button onClick={strike}>---</button>
                    <button onClick={mark}>Highlight</button>
                </div>
                ) : <div></div>
            }
            
        </div>
        
        
    )
}

export default CritiquePostForm;
