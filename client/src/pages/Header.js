import React from "react";
import { AppBar, Toolbar, Typography, Button, circularProgressClasses } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css"; // Importing CSS file for custom styles
// import logo-circle from "./media/logo-circle.png";


const Header = () => {
	
  return (
    <AppBar position="static" className="header">
     <div className = ".header">
	  <Toolbar>
		
        <Typography variant="h6" className="logo">
		  {/* <img src={"logo-circle.png"} alt="Writer's Block" width="65" /> */}
		  Writer's Block
        </Typography>

        <div className="nav-links">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/groups">
            Groups
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
		  </div>
        
      </Toolbar>
	  </div>
    </AppBar>
  );
};

export default Header;
