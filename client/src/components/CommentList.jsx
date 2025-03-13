import { Link } from "react-router-dom";

function CommentList({ comments, commenters, deleteComment }){
  if (!comments ||comments.length===0) {
    return <p>No comments yet.</p>;
  }
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-container">
          <div className="comment-content">
            <Link to={`/profile/${commenters[comment?.user_id]?.username}`} className="username">
              {commenters[comment?.user_id]?.username || "<deleted>"}
            </Link>
            <p className="comment-text">{comment?.body}</p>
          </div>
          <button className="del-btn" onClick={() => deleteComment(comment.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
