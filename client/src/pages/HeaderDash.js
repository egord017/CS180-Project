import React from "react";
import { AppBar, Toolbar, Typography, Button, circularProgressClasses } from "@mui/material";
import { Link, UNSAFE_createClientRoutes, useNavigate } from "react-router-dom";
import "./Header.css"; // Importing CSS file for custom styles
import * as UserClient from "../utils/user";


const HeaderDash = ({setAuth}) => {
  const navigate = useNavigate();

  async function onProfileClick(){
    const user_name = await UserClient.getUsername();
    console.log("username:",user_name);

    navigate(`/profile/profile?username=${user_name}`);
  }

  const logout = async (e) => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        setAuth(false);
    } catch (err) {
        console.error(err.message);            
    }
}
	
  return (
    <AppBar position="static" className="header">
     <div className = "header">
	  <Toolbar sx = {{height: '100%'}}>
		
        <Typography variant="h6" className="logo">
        <img src="/logo-2.png" alt="Writer's Block" className="logo-img" />
        </Typography>

        <div className="nav-links">
        <Button 
          color="inherit" 
          component={Link} 
          onClick={()=>{logout()}} 
          sx={{ textTransform: "none" }}
        >
            <Typography variant="h6">Logout</Typography>
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/groups" 
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6">Groups</Typography>
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            onClick={()=>{onProfileClick()}} 
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6">Profile</Typography>
          </Button>
		  </div>
        
      </Toolbar>
	  </div>
    </AppBar>
  );
};

export default HeaderDash;
