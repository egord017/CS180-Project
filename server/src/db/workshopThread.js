const pool = require('../../db.js');

async function get_threads() {
    try {
        const results = await pool.query("SELECT * FROM workshop_threads");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_thread(thread_id) {
    try {
        const query = "SELECT * FROM workshop_threads WHERE id = $1";
        const result = await pool.query(query, thread_id); 
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

async function get_critiques_from_thread(thread_id) {
    try {
        const query = "SELECT * FROM freeform_critiques WHERE workshop_thread_id = $1";
        const result = await pool.query(query, thread_id);
        return result.rows;
    } catch (err) {
        console.error(err);
    }
}

async function create_thread(user_id, workshop_id, title, context, preference, post_body, passage_body) {
    const query = `INSERT INTO workshop_threads (user_id, workshop_id, title, context, preference, post_body, passage_body) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *; `;

    try {
        console.log("Executing query with:", [user_id, workshop_id, title, context, preference, post_body, passage_body]);

        const result = await pool.query(query, [user_id, workshop_id, title, context, preference, post_body, passage_body]);
        return result.rows[0];
    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
}

//todo
// async function update_thread(user_id, workshop_id, title, context, preference, post_body, passage_body) {

//     if (!title || !body) {
//         throw new Error("Title and body missingd");
//     }
//     const result = await pool.query("UPDATE threads SET title = $1, body = $2 WHERE id = $3 RETURNING *",[user_id, workshop_id, title, context, preference, post_body, passage_body])
//     return result.rows[0];
// }

async function delete_thread(thread_id) {
    try {

        const result = await pool.query("DELETE FROM workshop_threads WHERE id = $1 RETURNING *", [thread_id]);//deletes thrwad

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
    get_critiques_from_thread,
    create_thread,
    delete_thread
};