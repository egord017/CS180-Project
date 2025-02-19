import React from 'react';
import './Profile.css';
import cameraIcon from '../assets/Icon.png'; // Import your image here

function Profile() {
  const handleIconClick = () => {
    console.log('icon clicked');
  };

  return (
    <div className="profilePage"> 
      <div className="profilePicContainer">
        <div className="profilePic">
          {/* Icon button on top of the circle */}
          <button className="iconButton" onClick={handleIconClick}>
            <img src={cameraIcon} alt="Camera Icon" className="iconImage" />
          </button>
        </div>

        {/* Text Boxes Below the Profile Picture */}
        <div className="textBoxContainer">
          <input type="text" placeholder="Username" className="textBox" />
          <input type="email" placeholder="Email" className="textBox" />
          <input type="password" placeholder="Password" className="textBox" />
        </div>
      </div>
    </div>
    
  );
}

export default Profile;
