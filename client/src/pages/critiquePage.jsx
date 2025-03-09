import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import './threadPage.css';

import {get_groups} from "../api/groupAPI.js"

function CritiquePage(){
    const {critique_id} = useParams();
    const [critique, setCritique] = useState(null);
    const [thread, setThread] = useState(null);
    const navigate = useNavigate();

    function backToThread() {
        if (thread) navigate(`/workshop-thread/${thread?.id}`);
    }
    useEffect(()=>{
        async function fetchData(){
            //fetch critqiue
            const critique_obj = await fetch(`http://localhost:5000/critiques/${critique_id}`);
            const critique_data = await critique_obj.json();
            console.log(critique_data);
            setCritique(critique_data);

            //fetch thread
            const thread_obj = await fetch(`http://localhost:5000/workshop-threads/${critique_data?.workshop_thread_id}`)
            
            const thread_data = await thread_obj.json();
            console.log()
            setThread(thread_data);


        }
        fetchData();
   }, []);

   return (

    <div>
        <button className="back-to-thread-btn" onClick={()=>{backToThread()}}>Back</button>
        <div className="critique-container">
            <h3>Opening Comments</h3>
            <p>{critique?.opening}</p>
            <h3>Main Critique</h3>
            <p>{critique?.body}</p>
            <h3>Closing Statements</h3>
            <p>{critique?.closing}</p>
            <p dangerouslySetInnerHTML={{ __html: critique?.edited_passage }} />

        </div>
        
    </div>
   )

}

export default CritiquePage;