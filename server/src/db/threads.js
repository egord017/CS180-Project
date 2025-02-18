const pool = require('../../db.js');

async function get_threads() {
    try {
        const results = await pool.query("SELECT * FROM threads");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_thread(thread_id) {
    try {
        const query = "SELECT * FROM threads WHERE id = $1";
        const result = await pool.query(query, thread_id); 
        console.log("get thread lol")
        return result.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_comments_from_thread(thread_id) {
    try {
        const query = "SELECT * FROM comments WHERE thread_id = $1";
        const result = await pool.query(query, thread_id); 
        return result.rows;
    } catch (err) {
        console.error(err);
    }
}

async function post_thread(user_id, channel_id, title, body){
    try {
        const query = "INSERT into threads (user_id, channel_id, title, body) VALUES ($1, $2, $3, $4) RETURNING id, user_id, channel_id, title, body";
        const result = await pool.query(query, [user_id, channel_id, title, body]);
        return result.rows;

    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread,
    post_thread
};