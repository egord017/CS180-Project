import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import "./GroupUserList.css";

const GroupUserList = ({ users }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <div className="group-user-list">
            <div className="member-button">

            
            <IconButton onClick={toggleDrawer(true)} className="toggle-button">
                <PeopleIcon fontSize="small" /> <h2 id="member-text">Members</h2>
            </IconButton>
            </div>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <div className="drawer-header">
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <List>
                    {users.map((user, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={user.name} secondary={user.role} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};

export default GroupUserList;