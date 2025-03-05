import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./profilePage.css";

function ProfilePage({}) {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [groups, setGroups] = useState([]);
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user info
        const userResponse = await fetch(`http://localhost:5000/profile/${userId}`);
        const userJson = await userResponse.json();
        // Assume the API returns an array and we need the first element
        setUserData(userJson[0]);

        // Fetch groups the user has joined
        const groupsResponse = await fetch(`http://localhost:5000/profile/${userId}/groups`);
        const groupsJson = await groupsResponse.json();
        setGroups(groupsJson);

        // Fetch threads posted by the user
        const threadsResponse = await fetch(`http://localhost:5000/profile/${userId}/threads`);
        const threadsJson = await threadsResponse.json();
        setThreads(threadsJson);

        // Fetch comments made by the user
        const commentsResponse = await fetch(`http://localhost:5000/profile/${userId}/comments`);
        const commentsJson = await commentsResponse.json();
        setComments(commentsJson);

        // Fetch followers
        const followersResponse = await fetch(`http://localhost:5000/profile/${userId}/followers`);
        const followersJson = await followersResponse.json();
        setFollowers(followersJson);

        // Fetch following
        const followingResponse = await fetch(`http://localhost:5000/profile/${userId}/following`);
        const followingJson = await followingResponse.json();
        setFollowing(followingJson);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page-container-1">
      <div className="profile-container">
        <div className="avatar-circle">
          {/* Optionally render an <img> if userData contains an avatar URL */}
        </div>
        <h2>{userData.username || "N/A"}</h2>
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
                    <h3>No groups joined.</h3>
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
                    <h3>No threads posted.</h3>
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
                            <h1>{comment.thread_title || "Untitled Thread"}</h1>
                          </Link>
               
                        </div>
                      
                    ))
                  ) : (
                    <li>No groups joined.</li>
                  )}
               </div>
           </div>
        </div>

        

        {/* <div className="section-box">
          <h3>Threads Posted</h3>
          <ul>
            {threads.length ? (
              threads.map((thread) => (
                <li key={thread.id}>
                  <Link to={`/thread/${thread.id}`}>
                    <strong>{thread.title || "Untitled Thread"}</strong> (Thread ID: {thread.id})
                  </Link>
                  <p>{thread.description} {thread.body}</p>
                </li>
              ))
            ) : (
              <li>No threads posted.</li>
            )}
          </ul>
        </div>

        <div className="section-box">
          <h3>Recent Comments</h3>
          <ul>
            {comments.length ? (
              comments.map((comment) => (
                <li key={comment.id}>
                  <Link to={`/thread/${comment.thread_id}`}>
                    <strong>{comment.body || "No Comment"}</strong>
                  </Link>
                  <p>(Comment ID: {comment.id}) (Thread ID: {comment.thread_id})</p>
                </li>
              ))
            ) : (
              <li>No comments found.</li>
            )}
          </ul>
        </div> */}
      

        {/* New section for Followers and Following */}
      {/* <div className="follow-container">
        <div className="follow-box">
          <h3>Followers</h3>
          <ul>
            {followers.length ? (
              followers.map((follower) => (
                <li key={follower.id}>
                  <Link to={`/profile/${follower.userid}`}>
                    <strong>{follower.username || "Unknown"}</strong> (ID: {follower.follower_id})
                  </Link>
                </li>
              ))
            ) : (
              <li>No followers yet.</li>
            )}
          </ul>
        </div>
      
        <div className="follow-box">
          <h3>Following</h3>
          <ul>
            {following.length ? (
              following.map((followed) => (

                <li key={followed.id}>
                  <Link to={`/profile/${followed.userid}`}>
                    <strong>{followed.username || "Unknown"}</strong> (ID: {followed.userid})
                  </Link>
                </li>
              ))
            ) : (
              <li>Not following anyone.</li>
            )}
          </ul>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
