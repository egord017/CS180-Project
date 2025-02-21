const pool = require('../../db.js');

async function get_users() {
    try {
        const results = await pool.query("SELECT * FROM users");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user(user_id) {
    try {
        const query = "SELECT * FROM users WHERE id = $1";
        const results = await pool.query(query, user_id);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_comments_from_user(user_id) {
    try {
        const query = "SELECT * FROM comments WHERE user_id = $1";
        const results = await pool.query(query, user_id);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_threads_from_user(user_id) { // aka get posts from user
    try {
        const query = "SELECT * FROM threads WHERE user_id = $1";
        const results = await pool.query(query, user_id);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_groups_from_user(user_id) {
    try {
        const query = "SELECT * FROM groups g JOIN users_groups ug ON g.id = ug.group_id WHERE ug.user_id = #1";
        const results = await pool.query(query, user_id)
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}



module.exports = {
    get_users,
    get_user,
    get_comments_from_user,
    get_threads_from_user,
    get_groups_from_user
};