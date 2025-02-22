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

async function create_thread(user_id, channel_id, title, body) {
    const query = `INSERT INTO threads (user_id, channel_id, title, body) VALUES ($1, $2, $3, $4) RETURNING *; `;

    try {
        console.log("Executing query with:", [user_id, channel_id, title, body]);

        const result = await pool.query(query, [user_id, channel_id, title, body]);
        return result.rows[0];
    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
}

async function update_thread(thread_id, title, body) {

    if (!title || !body) {
        throw new Error("Title and body missingd");
    }
    const result = await pool.query("UPDATE threads SET title = $1, body = $2 WHERE id = $3 RETURNING *",[title, body, thread_id])
    return result.rows[0];
}

async function delete_thread(thread_id) {
    try {
        
        await pool.query("DELETE FROM comments WHERE thread_id = $1", [thread_id]);//deletes all coments in a therwad

        const result = await pool.query("DELETE FROM threads WHERE id = $1 RETURNING *", [thread_id]);//deletes thrwad

        if (result.rowCount === 0) {
            return null; //Thread missing
        }

        return result.rows[0];
    } catch (err) {
        console.error("Database error:", err);
        throw err;
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