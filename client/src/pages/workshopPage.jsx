import React,{Fragment, useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import Button from '../components/Button';
import './workshopPage.css';


function WorkshopPage(){

    const workshop_id = Object.values(useParams())[0];
    const [workshop, setWorkshop] =  useState(null);
    const [group, setGroup] =  useState(null);
    const [threads, setThreads] = useState([]);

    const navigate = useNavigate();

    function backToGroup(group_id){
        if (group_id) navigate(`/group/${group_id}`);
    }

    function visitThreadForm(){
        navigate('submit');
    }
    

    function visitThread(thread_id){
        navigate(`/workshop-thread/${thread_id}`);
    }
    useEffect(()=>{
        async function getThreads(){
            const threadsObj = await fetch(`http://localhost:5000/workshops/${workshop_id}/threads`);
            const new_threads = await threadsObj.json();

            setThreads(new_threads);
        }
        async function getworkshopAndGroup(){
            const workshopObj = await fetch(`http://localhost:5000/workshops/${workshop_id}`);
            const new_workshop = await workshopObj.json();

            const groupObj = await fetch(`http://localhost:5000/groups/${new_workshop?.group_id}`);
            setGroup(await groupObj.json());
            setWorkshop(new_workshop);
            //return new_workshop.group_id;
        }
        getworkshopAndGroup();
        getThreads();
    }, []);


    return (
        <div>
            <Button onClick={()=>{backToGroup(workshop?.group_id)}}>Back To Group</Button>
            <Button onClick={()=>{visitThreadForm()}}>Post</Button>
            <div>{group?.name}</div>
            <div>{workshop?.name}</div>
            <div>{workshop?.description}</div>
            <div className="threads-container">
               {threads.map((thread)=>{
                    return (
                        <Button key={thread.id} onClick={()=>{visitThread(thread.id)}}>
                            {/* <Link to={`/profile/${user id here}`}></Link>  */}
                            <p>{thread.title}</p>
                            <p>{thread.body}</p>
                            
                        </Button>
                        
                    )
               })}
            </div>
            
        </div>
    )
}

export default WorkshopPage;