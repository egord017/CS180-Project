import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { getGroups } from "../api/groupAPI";
import './threadPage.css';
import "./groups.css";

import { Link } from "react-router-dom";

function Groups() {
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {

    const fetchGroups = async () => {
      const data = await getGroups();
      setGroupsData(data);
    };

    fetchGroups();
  }, []);

  return (
    <div className = "background">
      <div className="groups-container">
        <div className="groups-header">
          <h1>Join A Group</h1>
          <button className="groups-add-button">
            <span>+</span>
          </button>
        </div>
        <div className="groups-grid">
          {groupsData.map((group) => (
            <Link to={`/group/${group.id}`} key={group.id} className="group-card">
              <div className="group-card-top"></div>
              <div className="group-card-body">
                <h2 className="group-title">{group.name}</h2>
                <p className="group-subtitle">{group.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Groups;