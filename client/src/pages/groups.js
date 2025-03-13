import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { getGroups } from "../api/groupAPI";
import './threadPage.css';
import "./groups.css";

import { Link } from "react-router-dom";
import Header from './Header';

function Groups({setAuth}) {
  const [groupsData, setGroupsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {

    const fetchGroups = async () => {
      const data = await getGroups();
      setGroupsData(data);
    };

    fetchGroups();
  }, []);

  const filteredGroups = groupsData.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );

  return (
    <div className="background">
    <div className="groups-container">
      <div className="groups-header">
        <h1>Join A Group</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a group..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="groups-search-bar"
        />

        <Link to="/groups/new_group">
          <button className="groups-add-button">
            <span>+</span>
          </button>
        </Link>
      </div>

      <div className="groups-grid">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <Link to={`/group/${group.id}`} key={group.id} className="group-card">
              <div className="group-card-top"></div>
              <div className="group-card-body">
                <h2 className="group-title">{group.name}</h2>
                <p className="group-subtitle">{group.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No groups found</p>
        )}
      </div>
    </div>
  </div>
  );
}

export default Groups;