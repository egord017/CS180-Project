import React, { useState, useEffect } from "react";
import { useParams, useSearchParams,  } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "./profilePage.css";
import Header from './Header';

function ProfilePage({setAuth}) {
  //const {} userId } = useParams();
  const username= Object.values(useParams())[0];
  
  //const [search_params] = useSearchParams();
  //const username = search_params.get('username');
  
  const [userData, setUserData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${username}/followers`);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user info
        const userResponse = await fetch(`http://localhost:5000/profile/profile?username=${username}`);
        const userJson = await userResponse.json();
        // Assume the API returns an array and we need the first element
        setUserData(userJson);
        

        // Fetch groups the user has joined
        const groupsResponse = await fetch(`http://localhost:5000/profile/${userJson?.userid}/groups`);
        const groupsJson = await groupsResponse.json();
        setGroups(groupsJson);

        // Fetch threads posted by the user
        const threadsResponse = await fetch(`http://localhost:5000/profile/${userJson?.userid}/threads`);
        const threadsJson = await threadsResponse.json();
        setThreads(threadsJson);
        console.log(threadsJson);

        // Fetch comments made by the user
        const commentsResponse = await fetch(`http://localhost:5000/profile/${userJson?.userid}/comments`);
        const commentsJson = await commentsResponse.json();
        setComments(commentsJson);

        // Fetch followers
        const followersResponse = await fetch(`http://localhost:5000/profile/${userJson?.userid}/followers`);
        const followersJson = await followersResponse.json();
        setFollowers(followersJson);

        // Fetch following
        const followingResponse = await fetch(`http://localhost:5000/profile/${userJson?.userid}/following`);
        const followingJson = await followingResponse.json();
        setFollowing(followingJson);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    
    fetchData();
    
  }, []);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div><Header setAuth={setAuth}/>
    <div className="profile-page-container-main">
      <div className="profile-page-container">
        <div className="profile-container">
            <img src={userData.image || "/images/placeholder.jpg"} alt={userData.name} className="avatar-circle" />
          <h2>{userData.username || "N/A"}</h2>

          <div className="followers-container">
            <button onClick={handleClick} id="followers-text"> <b>{followers.length}</b> followers</button>
            <button onClick={handleClick} id="followers-text"> <b>{following.length}</b> following</button>
          </div>
          <h3>About Me</h3>
          <div className="bio-box">
            <p>{userData.userbio || "No bio available."}</p>
          </div>
        </div>


        <div className="sections-container">
          <h3>Groups Joined</h3>
          <div className="section-box">
            <div className="groups-box-container">
          
                <div className="sections-container-in-box">
                    {groups.length ? (
                      groups.map((group) => (
                        <div className="groups-box" key={group.id}>

                          <div className="groups-box-elem">
                            <img src={group.image || "/images/placeholder.jpg"} alt={group.name} className="group-box-image" />
                          </div>
                          <div className="groups-box-elem">
                            <h2>{group.category || "No Category"}</h2> 
                            <Link to={`/group/${group.id}`}>
                              <h1>{group.name || "Unnamed Group"}</h1>
                            </Link>
                            <p>{group.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h4>No groups joined.</h4>
                    )}
                </div>
            </div>
          </div>

          <h3>Threads Posted</h3>
          <div className="section-box">
            <div className="groups-box-container">
          
                <div className="sections-container-in-box">
                    {threads.length ? (
                      threads.map((thread) => (
                        <div className="threads-box" key={thread.id}>
                            <Link to={`/thread/${thread.id}`}>
                              <h1>{thread.title || "Untitled Thread"}</h1>
                            </Link>
                            <p>{thread.body}</p>
                          </div>
                      
                      ))
                    ) : (
                      <h4>No threads posted.</h4>
                    )}
                </div>
            </div>
          </div>

          <h3>Recent Comments</h3>
          <div className="section-box">
            <div className="groups-box-container">
          
                <div className="sections-container-in-box">
                    {comments.length ? (
                      comments.map((comment) => (
                        <div className="comments-box" key={comment.id}>
                
                            <h2>{comment.body || "No Comment"}</h2> 
                            <Link to={`/thread/${comment.thread_id}`}>
                              <h1>{comment.thread_id || "Untitled Thread"}</h1>
                            </Link>
                
                          </div>
                        
                      ))
                    ) : (
                      <h4>No Comments Posted.</h4>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
        
      
  </div>
  </div>
  );
}

export default ProfilePage;
