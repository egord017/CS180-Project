import React from "react";
import { AppBar, Toolbar, Typography, Button, circularProgressClasses } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Importing CSS file for custom styles
import * as UserClient from "../utils/user";


const Header = ({setAuth}) => {
  const navigate = useNavigate();

  async function onProfileClick(){
    const user_name = await UserClient.getUsername();
    console.log("username:",user_name);

    navigate(`/profile/${user_name}`);
  }

const logout = async () => {
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
        <Toolbar sx = {{height: '100%', display: "flex", justifyContent: "space-between", alignItems: "center"}}>

          <Button
            component={Link} 
            to="/" 
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6" className="logo">
          <img src="/logo-2.png" alt="Writer's Block" className="logo-img" />
          </Typography>
          </Button>
      
          <div className="nav-links">

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

            <Button 
            onClick={logout}
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6"><b>Logout</b></Typography>
          </Button>


        </div>
          
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;