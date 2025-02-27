import React, { useState, useEffect } from "react";
import "./profilePage.css";

function ProfilePage({ userId }) {
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
    <div className="profile-page-container">
      <div className="profile-header">
        <div className="avatar-circle">
          {/* Optionally render an <img> if userData contains an avatar URL */}
        </div>
        <div className="profile-summary">
          <h2>{userData.username || "N/A"}</h2>
          <p>{userData.userbio || "No bio available."}</p>
        </div>
      </div>

      {/* i added this to see the unique id of the user. hide this for normal user or make only admins see it */}
      <div className="small-box">
        <p>User ID: {userData.userid}</p>
      </div>

      {/* longer bio can go here if we want */}
      <div className="large-box">
        <p>{userData.userbio}</p>
      </div>

      <div className="sections-container">
        <div className="section-box">
          <h3>Groups Joined</h3>
          <ul>
            {groups.length ? (
              groups.map((group) => (
                <li key={group.id}>
                  <strong>{group.name || "Unnamed Group"}</strong> (Group ID: {group.id})
                  <p>{group.description}</p>
                </li>
              ))
            ) : (
              <li>No groups joined.</li>
            )}
          </ul>
        </div>

        <div className="section-box">
          <h3>Threads Posted</h3>
          <ul>
            {threads.length ? (
              threads.map((thread) => (
                <li key={thread.id}>
                  <strong>{thread.title || "Untitled Thread"}</strong> (Thread ID: {thread.id})
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
                  <strong>{comment.body || "No Comment"}</strong>
                  <p>(Comment ID: {comment.id}) (Thread ID: {comment.thread_id})</p>
                </li>
              ))
            ) : (
              <li>No comments found.</li>
            )}
          </ul>
        </div>


        {/* New section for Followers and Following */}
      <div className="follow-container">
        <div className="follow-box">
          <h3>Followers</h3>
          <ul>
            {followers.length ? (
              followers.map((follower) => (
                <li key={follower.id}>
                  <strong>{follower.username || "Unknown"}</strong> (ID: {follower.follower_id})
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
                  <strong>{followed.username || "Unknown"}</strong> (ID: {followed.userid})
                </li>
              ))
            ) : (
              <li>Not following anyone.</li>
            )}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProfilePage;
