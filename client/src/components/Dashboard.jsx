import React, {Fragment, useState, useEffect} from "react";

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
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
    }, []);

    return (
        <Fragment>
            <h1 className="mt-5">{name}'s Dashboard</h1>
            <button onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;