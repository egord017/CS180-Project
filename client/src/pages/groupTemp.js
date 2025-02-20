//temporary page just to test functionality between everything.

import React,{Fragment, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';


function GroupPage(){
    const test = [
        {"title":"A"},
        {"title":"B"}
    ]
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState([{}]);
    const group_id = Object.values(useParams())[0];
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function getGroup(){
            const group_obj = await fetch(`http://localhost:5000/groups/${group_id}`);

            const group_dat = await group_obj.json();
            const channels_obj = await fetch(`http://localhost:5000/groups/${group_id}/channels`);
            const channels_dat = await channels_obj.json();
            //console.log(channels_dat);
            setGroup(group_dat);
            setChannels(channels_dat);
        }
        getGroup();
    }, []);
    
    useEffect(()=>{
        var thread_dict = {};

        async function getFewThreads(dictionary, channels){
            for (let i = 0; i < channels.length; i++){
                let channel = channels[i];
                const threads = await fetch(`http://localhost:5000/channels/${channel.id}/threads`)
                const thread_data = await threads.json();
                dictionary[channel?.id] = thread_data;
                //console.log(thread_data);
                //console.log("^");
                ////console.log(dictionary);

                //console.log("__");
            }
            setThreads(dictionary)
            
            //
        }
        getFewThreads(thread_dict, channels);
    }, [channels]);



    //once you got the channels, grab all threads from each cahnnel?
    function insertChannelsWithThreads(){
        let html = null;
        let rows = [];
        for (const key in threads){
            rows.push(key);
        }
    }
    function returnThreads(threads){
        const new_threads = []
        for (const i in threads){
            console.log(threads[i]?.title);
            new_threads.oush(threads[i]);
        }

        
    }
    return (
        <div>
            <div>{group?.name}</div>

            {Object.entries(threads).map((channel)=>{
                
                return (<Fragment>
                    <div>{channel[0]}</div>
                    {/* {returnThreads(channel[1])} */}
                
                    {/* {channel[1]?.map((thread)=>{
                        return <div>{thread?.title}</div>
                    })} */}
                    <div>{channel[1][0]?.title}</div>
                </Fragment>)
                
            })}
            
        </div>
    )
}

export default GroupPage;