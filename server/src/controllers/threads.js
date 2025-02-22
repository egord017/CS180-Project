const pool = require("../../db");
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
    console.log("Received body:", req.body);

    let { user_id, channel_id, title, body } = req.body;

    if (!title || !body || !channel_id || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const userCheck = await pool.query("SELECT userid FROM users WHERE userid = $1", [user_id]);

        if (userCheck.rows.length === 0) {
            return res.status(400).json({ error: `Invalid user_id: ${user_id}. User does not exist.` });
        }
        const result = await threads_db.create_thread(user_id, channel_id, title, body);
        res.status(201).json({ message: "Thread created successfully!", thread: result });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function update_thread(req, res) {
    const { thread_id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Title and body missing" });
    }
    try {
        const updatedThread = await threads_db.update_thread(thread_id, title, body);

        if (!updatedThread) {
            return res.status(404).json({ error: "Thread not found" });
        }

        res.status(200).json({ message: "Thread updated", thread: updatedThread });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function delete_thread(req, res) {
    const { thread_id } = req.params;

    try {
        const deletedThread = await threads_db.delete_thread(thread_id);

        if (!deletedThread) {
            return res.status(404).json({ error: "Thread missing" });
        }

        res.status(200).json({ message: "Thread deleted", thread: deletedThread });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread,
    create_thread,
    update_thread,
    delete_thread
};
