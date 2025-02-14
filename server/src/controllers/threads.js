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
    const { user_id, channel_id, title, body } = req.body;
    if (!user_id || !channel_id || !title) {
        return res.status(400).json({ error: "user_id, channel_id, and title are required" });
    }
    const newThread = await threads_db.create_thread(user_id, channel_id, title, body);
    res.status(201).json(newThread);
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread,
    create_thread
};