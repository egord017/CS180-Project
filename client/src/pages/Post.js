import React from 'react';
import { Typography } from '@mui/material';

const Post = ({ threads }) => {
    return (
        <>
            {threads.length > 0 ? (
                threads.map((thread) => (
                    <div key={thread.id} className="thread-item">
                        
                        <h3>{thread.title}</h3>
                        <p>{thread.body}</p>
                    </div>
                ))
            ) : (
                <Typography>No threads available in this channel. Create a new thread and start the discussion!</Typography>
            )}
        </>
    );
};

export default Post;
