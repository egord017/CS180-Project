import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import './threadPage.css';
import Header from './Header.js';
import { Link } from "react-router-dom";
import OriginalPost from '../components/OriginalPost.jsx';
import CommentList from '../components/CommentList.jsx';

function ThreadPage({ setAuth }) {
  let is_error = false;
  const navigate = useNavigate();

  function onCreateCommentPress() {
    setIsCommenting(true);
  }

  async function handleCommentSubmit(event) {
    // event.preventDefault();
    console.log("HI");
    try {
      const res = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: reply,
          thread_id: thread_id,
          user_id: localStorage.getItem("userID")
        })
      });
      setIsCommenting(false);
    } catch (err) {
      console.error(err);
    }
  }

  function backToChannel(channel_id) {
    if (channel_id) navigate(-1);
  }

  async function deleteThread() {
    const req = await fetch(`http://localhost:5000/threads/${thread_id[0]}`, {
      method: "DELETE"
    });
    navigate(-1);
  }

  async function deleteComment(comment_id) {
    try {
      const response = await fetch(`http://localhost:5000/comments/${comment_id}`, {
        method: "DELETE"
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  // Route param: /threads/:thread_id
  const thread_id = Object.values(useParams())[0];

  const [thread, setThreadData] = useState(null);
  const [comments, setComments] = useState([]);
  const [group, setGroup] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commenters, setCommenters] = useState({});
  const [op, setOp] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    async function fetchThreadAndComments() {
      try {
        // Fetch thread
        const thread_obj = await fetch(`http://localhost:5000/threads/${thread_id}`);
        const thread_data = await thread_obj.json();
        setThreadData(thread_data);

        // Fetch comments
        const comments_obj = await fetch(`http://localhost:5000/threads/${thread_id}/comments`);
        const comments_data = await comments_obj.json();
        setComments(comments_data);

        // Fetch OP (original poster)
        const op_resp = await fetch(`http://localhost:5000/profile/${thread_data.user_id}`);
        const op_data = await op_resp.json();
        setOp(op_data);

        // Fetch channel info
        const channelObj = await fetch(`http://localhost:5000/channels/${thread_data.channel_id}`);
        const new_channel = await channelObj.json();
        setChannel(new_channel);

        // Fetch group info
        const groupObj = await fetch(`http://localhost:5000/groups/${new_channel.group_id}`);
        setGroup(await groupObj.json());

        // Fetch each commenter’s profile
        const commenters_data = await Promise.all(
          comments_data.map(async (comment) => {
            const results = await fetch(`http://localhost:5000/profile/${comment.user_id}`);
            return results.json();
          })
        );

        // Create a lookup for user info by user_id
        const users_dict = {};
        for (const user of commenters_data) {
          users_dict[user.userid] = user;
        }
        setCommenters(users_dict);
      } catch (err) {
        console.error(err);
        is_error = true;
      }
    }
    fetchThreadAndComments();
  }, []);

  if (is_error === true) {
    return <div>Page not found.</div>;
  }

  return (
    <div>
      <Header setAuth={setAuth} />
        
      <div>
        <Button className="back-btn" onClick={() => backToChannel(thread?.channel_id)}>
          Back
        </Button>

        <Button className="delete-btn" onClick={() => deleteThread()}>
          Delete Thread
        </Button>
        
        
        <div className="info-container">
          <p className="group-name">{group?.name}</p>
          <p className="channel-name">{channel?.name}</p>
        </div>

        <OriginalPost op={op} thread={thread} onCreateCommentPress={onCreateCommentPress}/>

        {isCommenting ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              onChange={(e) => {
                setReply(e.target.value);
              }}
              name="comment-body"
              id="comment-body"
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>
        ) : null}

        <div className="comments-section">
          <h3>Comments</h3>
          <CommentList comments={comments} commenters={commenters} deleteComment={deleteComment}/>
        </div>
        
      </div>
      
    </div>
  );
}

export default ThreadPage;
