import React, {Fragment, useState, useEffect, useRef, useCallback} from "react";
import {getUserGroups} from "../api/dashboardAPI";
import { getFollowingThreads } from "../api/dashboardAPI";
import { Link } from "react-router-dom";
import Header from './Header';

import './Dashboard.css';

const Dashboard = ({setAuth}) => {

    //logged in user's name gets set into name
    const [name, setName] = useState("");


    //logged in user's id gets set into id (user this id for various fetch requests)
    const [id, setID] = useState("");
    
    //logged in user's groups
    const [groups, setGroups] = useState([]);

    //useStates for get threads from whoever the user follows
    const [threads, setThreads] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const initialFetch = useRef(false);


    async function getGroups() {
        try {
            const groupsResponse = await fetch(`http://localhost:5000/profile/${getID}/groups`);
            const groupsJson = await groupsResponse.json();
            setGroups(groupsJson);

        } catch (err) {
            console.error(err.message);
        }
    }
    

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/username", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseResponse = await response.json();

            //console.log(parseResponse);

            setName(parseResponse.username)

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getID() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/userid", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseResponse = await response.json();
            localStorage.setItem("userID", parseResponse.userID);
            
            //console.log(parseResponse);

            setID(parseResponse.userID)

        } catch (err) {
            console.error(err.message);
        }
    }

    async function getGroups() {
        const data = await getUserGroups();
        setGroups(data.userGroups.rows);
    }

    const LIMIT = 20;
    const getThreads = async () => {
        if(loading || !hasMore) {
            return;
        }

        setLoading(true);

        try {
            const response = await getFollowingThreads(LIMIT, offset);
            if(response.length < LIMIT) {
                setHasMore(false);
            }

            setThreads(prevThreads => [...prevThreads, ...response]);
            setOffset(prevOffset => prevOffset + LIMIT); 
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const lastThreadRef = useRef();
        useEffect(() => {
            if (loading) return;
            if (!lastThreadRef.current) return;

            const observerCallback = (entries) => {
                if (entries[0].isIntersecting) {
                    getThreads();
                }
            };

            observer.current = new IntersectionObserver(observerCallback);
            observer.current.observe(lastThreadRef.current);

            return () => {
                if (observer.current) observer.current.disconnect();
            };
    }, [loading]);

    useEffect(() => {
        if(!initialFetch.current){
            getName();
            getID();
            getGroups();
            getThreads();
            initialFetch.current = true;
        }
    }, []);

    return (
        <Fragment>
            <Header setAuth={setAuth}/>
            <div className="dashboard-name"><h1>{name}'s Dashboard</h1></div>
    
            {/* Main Container for Side-by-Side Layout */}
            <div className="dashboard-container">
                {/* Left: User's Groups */}
                <div className="groups-section">
                    <h2>Your Groups</h2>
                    <ul>
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <Link to={`/group/${group.id}`} key={group.id} className="group-card">
                                    <div className="group-card-top"></div>
                                    <div className="group-card-body">
                                        <h2 className="group-title">{group.name}</h2>
                                        <p className="group-subtitle">{group.description}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>You are not a member of any groups.</p>
                        )}
                    </ul>
                </div>
    
                {/* Right: Threads from Followed Users */}
                <div className="threads-section">
                    <h2>Threads from Users You Follow</h2>
                    <div className="threads-container">
                        {threads.length > 0 ? (
                            threads.map((thread, index) => (
                                <Link
                                    to={`/thread/${thread.id}`}
                                    key={thread.id}
                                    ref={index === threads.length - 1 ? lastThreadRef : null}
                                    className="thread-card"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <h3>{thread.title}</h3>
                                    <p>{thread.body}</p>
                                    <small>Posted on: {new Date(thread.time_stamp).toLocaleString()}</small>
                                </Link>
                            ))
                        ) : (
                            <p>No threads to display.</p>
                        )}
                    </div>
                    {loading && <p>Loading more threads...</p>}
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;