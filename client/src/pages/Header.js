import React from "react";
import { AppBar, Toolbar, Typography, Button, circularProgressClasses } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css"; // Importing CSS file for custom styles



const Header = () => {
	
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
          to="/" 
          sx={{ textTransform: "none" }}
        >
            <Typography variant="h6">Home</Typography>
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
            to="/profile" 
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

export default Header;
