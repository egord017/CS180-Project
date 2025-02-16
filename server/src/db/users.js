const pool = require('../../db.js');

async function get_users() {
    try {
        const results = await pool.query("SELECT * FROM users");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user() {
    try {
        const results = await pool.query("SELECT * FROM users WHERE id = $1");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user_groups() {
    // try {
    //     const results = await pool.query("SELECT * FROM users WHERE id = $1");
    //     return results.rows;
    // } catch (err) {
    //     console.error(err);
    // }
}

async function get_user_posts() {
    // try {
    //     const results = await pool.query("SELECT * FROM users WHERE id = $1");
    //     return results.rows;
    // } catch (err) {
    //     console.error(err);
    // }
}