import React, {Fragment, useState, useEffect, useRef, useCallback} from "react";
import {getUserGroups} from "../api/dashboardAPI";
import { getFollowingThreads } from "../api/dashboardAPI";
import { Link } from "react-router-dom";

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
        const userGroups = await getUserGroups();
        setGroups(userGroups.userGroups.rows)
    }

    const LIMIT = 20;
    const getThreads = async () => {
        if(loading || hasMore) return;

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

    const lastThreadRef = useCallback(node => {
        if(loading) return;

        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                getThreads();
            }
        });

        if(node) observer.current.observe(node);
    }, [loading, hasMore]);
    
    const logout = async (e) => {
        try {
            localStorage.removeItem("token");
            setAuth(false);
        } catch (err) {
            console.error(err.message);            
        }
    }

    useEffect(() => {
        getName();
        getID();
        getGroups();
        getThreads();
    }, []);

    return (
        <Fragment>
            <h1 className="mt-5">{name}'s Dashboard</h1>
            <button onClick={e => logout(e)}>Logout</button>

            {/* Display the user's groups */}
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

            <h2>Threads from Users You Follow</h2>
            <div className="threads-container">
                {threads.length > 0 ? (
                    threads.map((thread, index) => (
                        <div
                            key={thread.id}
                            ref={index === threads.length - 1 ? lastThreadRef : null}
                            className="thread-card"
                        >
                            <h3>{thread.title}</h3>
                            <p>{thread.body}</p>
                            <small>Posted on: {new Date(thread.time_stamp).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No threads to display.</p>
                )}
            </div>

            {loading && <p>Loading more threads...</p>}
        </Fragment>
    );
};

export default Dashboard;