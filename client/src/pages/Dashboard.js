import React, {Fragment, useState, useEffect} from "react";

const Dashboard = ({setAuth}) => {

    //logged in user's name gets set into name
    const [name, setName] = useState("");


    //logged in user's id gets set into id (user this id for various fetch requests)
    const [id, setID] = useState("");

    const [groups, setGroups] = useState([]);

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
    }, []);

    return (
        <fragment>
        <div className="dashboard-page">
            <h1 className="mt-5">{name}'s Dashboard</h1>
            <button onClick={e => logout(e)}>Logout</button>

            
        </div>
        </fragment>
    );
};

export default Dashboard;