import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';

// import "./groups.css"; // Import the CSS file

// function Groups() {
//   const [groupsData, setGroupsData] = useState([]);

//   useEffect(() => {
//     const getGroups = async () => {
//     const response = await fetch("http://localhost:5000/groups");
//     if (!response.ok) {
//         throw new Error("Failed to fetch groups");
//     }
//     const data = await response.json();
//     setGroupsData(data); 
//     };

//     getGroups();
//   }, []);

//   return (
//     <div className="groups-container">
//       <div className="groups-header">
//         <h1>Join A Group</h1>
//         <button className="groups-add-button">
//           <span>+</span>
//         </button>
//       </div>
//       <div className="groups-grid">
//         {groupsData.length > 0 ? (
//           groupsData.map((group) => (
//             <div className="group-card" key={group.id}>
//               <div className="group-card-top"></div>
//               <div className="group-card-body">
//                 <p className="group-category">{group.category || "No Category"}</p>
//                 <h2 className="group-title">{group.name}</h2>
//                 <p className="group-subtitle">{group.description}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading groups...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Groups;

function GroupPageTemp() {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const { group_id } = useParams();
    const navigate = useNavigate();

    function visitChannel(channel_id) {
        navigate(`/channel/${channel_id}`);
    }
    function visitChannelForm(){
        navigate('submit')
    }

    useEffect(() => {
        async function fetchGroupData() {
            try {
                //fetch and wait for both fetches to finish...
                const [group_obj, channels_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`),
                ]);

                const group_data = await group_obj.json();
                const channels_data = await channels_obj.json();

                setGroup(group_data);
                setChannels(channels_data);

            //craete promise.all to fetch multiple req??
            //for each channel grab all threads here. wait for all threads to return.
                const threads_data = await Promise.all(channels_data.map(async channel => {
                    const results = await fetch(`http://localhost:5000/channels/${channel.id}/threads`)
                    return await results.json();    
                }));

                const threads_dict = channels_data.reduce((acc, channel, index) => {
                    acc[channel.id] = threads_data[index];
                    return acc;
                }, {});

                setThreads(threads_dict);
            } catch (error) {
                console.error("error fetching in group : ", error);
            }
        }
        //console.log("running useeffect");
        fetchGroupData();
    }, [group_id]);

    function getChannelInfo(channel_id) {
        const channel = channels.find(c => c.id == channel_id);
        if (!channel) return null;
        return (
            <Fragment>
                <div>{channel.name}</div>
                <div>{channel.description}</div>
                <div>-------------</div>
            </Fragment>
        );
    }

    async function deleteChannel(channel_id){
        try{
            //refresh lol
        }
        catch (err){

        }
        

    }

    return (
        <div>
            <button onClick={()=>(visitChannelForm())}>Create Channel$</button>
            <div className="group-header">{group?.name}</div>
            {Object.entries(threads).map(([channel_id, thread_list]) => (
                <Button class="channel-card" key={channel_id} onClick={() => visitChannel(channel_id)}>
                    <button onClick={(e)=>{
                        e.stopPropagation();
                        deleteChannel(channel_id);
                    }}>X</button>
                    {getChannelInfo(channel_id)}
                    {thread_list.slice(0,3).map((thread) => (
                        <Fragment key={thread.id}>
                            <div>{thread.title}</div>
                            <p>{thread.body?.substr(0, 25)}</p>
                            <div>--------</div>

                        </Fragment>
                    ))}
                </Button>
            ))}
        </div>
    );
}

export default GroupPageTemp;
