// src/components/UsersInGroup.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function UsersInGroup() {
    const [users, setUsers] = useState([]);
    const { group_id } = useParams(); // Get the group_id from URL

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`http://localhost:5000/groups/${group_id}/users`);

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, [group_id]);

    return (
        <div className="users-in-group">
            <h2>Group Members</h2>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                        <Link to={`/profile/${user.username}`}>
                            {user.username}
                        </Link>
                        </li>
                    ))
                ) : (
                    <p>No users in this group.</p>
                )}
            </ul>
        </div>
    );
}

export default UsersInGroup;
