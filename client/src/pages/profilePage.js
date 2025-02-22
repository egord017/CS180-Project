import React from "react";
import "./profilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-image"></div>
        <div className="profile-name"></div>
        <div className="profile-bio"></div>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h3>Groups Joined</h3>
          <div className="profile-box"></div>
        </div>
        <div className="profile-section">
          <h3>Thread Posted</h3>
          <div className="profile-box"></div>
        </div>
        <div className="profile-section">
          <h3>Recent Comments</h3>
          <div className="profile-box"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
