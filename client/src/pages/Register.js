import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import './Register.css';

const Register = ({setAuth}) => {

    const [regError, setRegError] = useState({
        username:"",
        email:"",
        password:""
    });
    
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    });

    const {username, email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    };
    
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {

            const body = {username, email, password};

            let errorTriggered = false;
            //clientside validation
            if (username.length===0){
                setRegError((prevState)=>({...prevState, username:"Username required."}));
                errorTriggered = true;
            }
            else if (username.length<3){
                setRegError((prevState)=>({...prevState, username:"Username is too short (min:3)"}));
                errorTriggered = true;

            }
            else if (username.length>15){
                setRegError((prevState)=>({...prevState, username:"Username is too long (max:15)"}));
                errorTriggered = true;

            }
            else{
                setRegError((prevState)=>({...prevState, username:""}));

            }
            if(password.length ===0){
                setRegError((prevState)=>({...prevState, password:"Password required"}));
                errorTriggered = true;

            }
            else if (password.length <3){
                setRegError((prevState)=>({...prevState, password:"Password too short (min:3)"}));
                errorTriggered = true;

            }
            else{
                console.log("??")
                setRegError((prevState)=>({...prevState, password:""}));
                
            }
            if (errorTriggered===true){
                return;
            }

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            console.log(parseResponse);
            if (!response.ok){
                if (parseResponse==="Email already exists"){
                    setRegError((prevState)=>({...prevState, email:parseResponse}));
                    return;
                }
                else if (parseResponse==="Username is taken"){
                    setRegError((prevState)=>({...prevState, username:parseResponse}));
                    return;
                }

            }

            if(parseResponse.token){
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            }
            else{
                setAuth(false);
            }
        
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        // <Fragment>
        //     <h1 className="text-center my-5">Register</h1>
        //     <form onSubmit={onSubmitForm}>
        //         <input type="text" name="username" placeholder="Username" className = "form-control my-3" value={username} onChange={e => onChange(e)}/> 
        //         <input type="email" name="email" placeholder="Email" className = "form-control my-3" value={email} onChange={e => onChange(e)}/>
        //         <input type="password" name="password" placeholder="Password" className = "form-control my-3" value={password} onChange={e => onChange(e)}/>
        //         <button className= "btn btn-success w-100">Submit</button>
        //     </form>
        //     <Link to="/login">Login</Link>
        // </Fragment>

        <div className="login-container  my_fullscreen_div" id = "register-page-background">
            <div id = 'register-background'>
        <h1  id = "login-header">Register</h1>
        <form onSubmit = {onSubmitForm}>
            <h2>USERNAME</h2>
                <input type="text" name="username" className = "form-control my-3" value={username} onChange={e => onChange(e)} required/> 
                {regError.username && <p>{regError.username}</p>}
            <h2>EMAIL</h2>
                <input type="email" name="email" className = "form-control my-3" value={email} onChange={e => onChange(e)} required/>
                {regError.email && <p>{regError.email}</p>}

            <h2>PASSWORD</h2>
                <input type="password" name="password" className = "form-control my-3" value={password} onChange={e => onChange(e)} required/>
                {regError.password && <p>{regError.password}</p>}
                {console.log(regError)}
            <button className= "btn btn-success w-100"><h2>SUBMIT</h2></button>
        </form>
        <h2 id = "already-have-account">Already have an account? <a href="/login">Return to Login</a></h2>
        </div>
      
        
        </div>


    );
};

export default Register;