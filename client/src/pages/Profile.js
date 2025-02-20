import './Profile.css';
import cameraIcon from '../assets/Icon.png'; 
import React, { useRef, useState } from 'react';

function Profile() {
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
    
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePhoto(imageURL); 
    }
  };

  return (
    <div className="profilePage"> 
      <div className="profilePicContainer">
        <div className="profilePic">
          {/* Icon button on top of the circle */}
          <button className="iconButton" onClick={handleIconClick}>
            <img src={cameraIcon} alt="Camera Icon" className="iconImage" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* Display the image preview if a file is selected */}
      { profilePhoto && (
        <img
        src={profilePhoto}
        alt="Preview"
        style={{
          width: '100%', 
          height: '100%', 
          borderRadius: '50%', 
          position: 'absolute', 
        }}
        />
      )}
          
        </div>
      </div>
        {/* Replace username/email/password with variables */}
        <div className="textBoxFullContainer">
          <div className="textBoxContainer"> 
            <h1> Change Username: </h1>
            <input type="text" placeholder="Username" className="textBox" />
          </div>
          <div className="textBoxContainer"> 
            <h1> Change Email: </h1>
            <input type="text" placeholder="Email" className="textBox" />
          </div>
          <div className="textBoxContainer"> 
            <h1> Change Password: </h1>
            <input type="text" placeholder="*********" className="textBox" />
          </div>
        </div>
    </div>


  );
}

export default Profile;
