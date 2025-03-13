import React, { useState } from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import Button from '../components/Button';
import "./CreatePost.css";

const CreatePost = ({ handlePostClick, curr_channel, hasTitle }) => {
    const [body, setBody] = useState('');
    const [postTitle, setPostTitle] = useState('');

    return (
        <Card
            sx={{
                top: "10%",
                left: "50%",
                maxWidth: "95%",
                margin: "auto",
                height: "60%",
                mt: 2,
                p: 2,
                background: "rgb(255, 255, 255)",
                zIndex: 1000
            }}
        >
            <CardContent className='post-card'>
                <h4 id='new-post-title'>Create New Thread</h4>
                {!hasTitle && <p>Need a title</p>}
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Title"
                    className="custom-textfield-title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    maxRows={2} // Ensures a max number of lines for title
                />

                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="What's on your mind?"
                    className="custom-textfield"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    maxRows={5} // Adjust based on content size
                />

                <Button
                    className="button-post"
                    id="new-post-title"
                    onClick={() => handlePostClick(body, postTitle, curr_channel)}
                >
                    Post
                </Button>
            </CardContent>
        </Card>
    );
};

export default CreatePost;
