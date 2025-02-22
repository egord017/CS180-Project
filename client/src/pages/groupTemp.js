import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './threadPage.css';

function GroupPage() {
    const [group, setGroup] = useState(null);
    const [channels, setChannels] = useState([]);
    const [threads, setThreads] = useState({});
    const { group_id } = useParams();
    const navigate = useNavigate();

    function visitChannel(channel_id) {
        navigate(`/channel/${channel_id}`);
    }

    useEffect(() => {
        async function fetchGroupData() {
            try {
                const [group_obj, channels_obj] = await Promise.all([
                    fetch(`http://localhost:5000/groups/${group_id}`),
                    fetch(`http://localhost:5000/groups/${group_id}/channels`),
                ]);

                const group_data = await group_obj.json();
                const channels_data = await channels_obj.json();

                setGroup(group_data);
                setChannels(channels_data);

            //craete promise.all to fetch multiple req??
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

    return (
        <div>
            <div className="group-header">{group?.name}</div>
            {Object.entries(threads).map(([channel_id, thread_list]) => (
                <Button class="channel-card" key={channel_id} onClick={() => visitChannel(channel_id)}>
                    {getChannelInfo(channel_id)}
                    {thread_list.map((thread) => (
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

export default GroupPage;
