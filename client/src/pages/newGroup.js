import React, { useState } from "react";
import "./newGroup.css";

const NewGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    // image
    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    // submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ groupName, category, description, image });
    };

    return (
        <div className="new-group-container">
            <h2>New Group</h2>
            <form onSubmit={handleSubmit}>
                {/* file image upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {/* text input for group name */}
                <input
                    type="text"
                    placeholder="Group Name..."
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                {/* dropdown menu for category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">- Select -</option>
                    <option value="Tech">Tech</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {/* text area for group description */}
                <textarea
                    placeholder="Text Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default NewGroup;