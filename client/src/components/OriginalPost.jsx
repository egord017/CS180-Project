import { Link } from "react-router-dom";


function OriginalPost({op, thread, onCreateCommentPress}){

    return (
        <div className="op-container">
            <p className="op-username"></p>
            <p className="op-title">{thread?.title}</p>
            <Link to={`/profile/${op?.username}`} className="op-username">
                {op?.username}
            </Link>
            <p className="op-body">{thread?.body}</p>

            <button className="reply-button" onClick={onCreateCommentPress}>
            Reply
            </button>
        </div>
    );
}

export default OriginalPost