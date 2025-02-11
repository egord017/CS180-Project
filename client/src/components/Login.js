import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import './Login.css';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()

        try {

            const body = {email, password};

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            //console.log(parseResponse);

            if(parseResponse.token){
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            }
            else{
                setAuth(false);
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
      <div className="page my_fullscreen_div">
            <div className="login-container Container">
             
            <h1 id = "login-header">Log In</h1>
            <form onSubmit = {onSubmitForm}>
            <h2>EMAIL</h2>
                <input type="email" name ="email" placeholder= "" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
            <h2>PASSWORD</h2>
                <input type="password" name ="password" placeholder= "" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <button className= "btn btn-success w-100">Submit</button>
            </form>
            <Link to="/register">Register</Link>

            <Container maxWidth="sm">
            </Container>
            </div>
            
             </div>

   
    );
};

export default Login;