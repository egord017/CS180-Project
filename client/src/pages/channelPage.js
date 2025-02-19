import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';


function ChannelPage(){
    const channel_id = Object.values(useParams())[0];
    const [channel, setChannel] =  useState(null);
    const [group, setGroup] =  useState(null);
    const [threads, setThreads] = useState([]);

    const navigate = useNavigate();

    function visitThread(thread_id){
        navigate(`/thread/${thread_id}`);
    }
    useEffect(()=>{
        async function getThreads(){
            const threadsObj = await fetch(`http://localhost:5000/channels/${channel_id}/threads`);
            const new_threads = await threadsObj.json();

            setThreads(new_threads);
        }
        async function getChannelAndGroup(){
            const channelObj = await fetch(`http://localhost:5000/channels/${channel_id}`);
            const new_channel = await channelObj.json();

            const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
            setGroup(await groupObj.json());
            setChannel(new_channel);
            //return new_channel.group_id;
        }

        getChannelAndGroup();
        getThreads();
    }, []);

    return (
        <div>
            <div>{group?.name}</div>
            <div>{channel?.name}</div>
            <div>{channel?.description}</div>
            <div>
               {threads.map((thread)=>{
                    return (
                        <Button key={thread.id} onClick={()=>{visitThread(thread.id)}}>
                            <p>{thread.title}</p>
                            <p>{thread.body}</p>
                        </Button>
                        
                    )
               })}
            </div>
            
        </div>
    )
}

export default ChannelPage;