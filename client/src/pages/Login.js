import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import './Login.css';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from "./Header";

const Login = ({setAuth}) => {
    const [loginIsInvalid, setLoginIsInvalid] = useState(false);
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

            

            if(parseResponse.token){
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            }
            else{
                setLoginIsInvalid(true);
                setAuth(false);
            }

        } catch (err) {
            console.log(err.message);
          
        }
    }

    return (
      <div className="page my_fullscreen_div">
         {/* <CssBaseline /> */}
         <Container disableGutters maxWidth={false}>
            <div className="login-container  my_fullscreen_div">
            
            <h1 id = "login-header">Log In</h1>
            <form onSubmit = {onSubmitForm}>
            <h2>EMAIL</h2>
                <input type="email" name ="email" placeholder= "" className="form-control my-3" value={email} onChange={e => onChange(e)} required/>
            <h2>PASSWORD</h2>
                <input type="password" name ="password" placeholder= "" className="form-control my-3" value={password} onChange={e => onChange(e)} required/>
                {loginIsInvalid && <p class="error-message">Invalid email or password.</p>}
                
                <button className= "btn btn-success w-100"><h2>SUBMIT</h2></button>
            </form>
            

          
            
            </div>
            </Container>
            <Container disableGutters maxWidth={false}>
            <div className="register-container my_fullscreen_div">
              <h2 id = "register-header">Welcome to Writer's Block!</h2>
              <h2 id = "register-subheader">Don't Have An Account?</h2>
             
             
              <Link to="/register">
              <button className= "sign-up-btn">SIGN UP</button>
              </Link>
            
            </div>
            </Container>
             </div>
             

   
    );
};

export default Login;