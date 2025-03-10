import React, { useState } from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import Button from '../components/Button';

const CreatePost = ({ handlePostClick, curr_channel }) => {
    const [body, setBody] = useState('');

    return (
        <Card
            sx={{
                top: "10%",
                left: "50%",
                maxWidth: "95%",
                margin: "auto",
                height: "90%",
                mt: 2,
                p: 2,
                background: "rgb(255, 255, 255)",
                zIndex: 1000
            }}
        >
            <CardContent className='post-card'>
                <h4 id='new-post-title'>Create New Thread in Channel {curr_channel}</h4>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="What's on your mind?"
                    className="custom-textfield"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <Button
                    className="button-post"
                    id="new-post-title"
                    onClick={() => handlePostClick(body)}
                >
                    Post
                </Button>
            </CardContent>
        </Card>
    );
};

export default CreatePost;
