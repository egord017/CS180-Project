import React, {Fragment, useState, useEffect} from "react";

const Dashboard = ({setAuth}) => {

    //logged in user's name gets set into name
    const [name, setName] = useState("");


    //logged in user's id gets set into id (use this id for various fetch requests)
    const [id, setID] = useState("");

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
            
            //console.log(parseResponse);

            setID(parseResponse.username)

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
    }, []);

    return (
        <Fragment>
            <h1 className="mt-5">{name}'s Dashboard</h1>
            <button onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;