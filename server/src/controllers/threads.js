const threads_db = require('../db/threads.js');

async function get_threads(req, res) {
    const results = await threads_db.get_threads();
    res.send(results);
}

async function get_thread(req, res) {
    const params = Object.values(req.params);
    console.log(params);
    const results = await threads_db.get_thread(params);
    
    res.send(results);
}

async function get_comments_from_thread(req, res) {
    const params = Object.values(req.params);
    const results = await threads_db.get_comments_from_thread(params);
    res.send(results);
}

async function create_thread(req, res) {
    
        const {user_id, channel_id, title, body } = req.body;

        if (!user_id || !channel_id || !title || !body) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newThread = await threads_db.create_thread(user_id, channel_id, title, body);
        res.status(201).json(newThread);
        console.error("Error creating thread:", err);
        res.status(500).json({ error: "Internal server error" });
    
}


async function update_thread(req, res) {
    const {thread_id } = req.params;
    const {title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Title and body missing" });
    }

    const updatedThread = await threads_db.update_thread(thread_id, title, body);
    res.json(updatedThread);
    
}

async function delete_thread(req, res) {
    const {thread_id } = req.params;
    await threads_db.delete_thread(thread_id);
    res.json({ message: "thread delted"});
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread,
    create_thread,
    update_thread,
    delete_thread
};