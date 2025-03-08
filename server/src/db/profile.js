const pool = require('../../db.js');

// gets the user's UniqueID to make testing easier. 
// ex: http://localhost:5000/profile/69193896-ec98-48ba-b06d-2d74407096d1
async function get_users() { 
    try {
        const results = await pool.query("SELECT users.userID, users.userName FROM users");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user(userID) {
    try {
        const query = "SELECT * FROM users WHERE userID = $1";
        const results = await pool.query(query, userID);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_groups_from_user(userID) {
    try {
        const query = "SELECT * FROM groups g JOIN users_groups ug ON g.id = ug.group_id WHERE ug.user_id = $1";
        const results = await pool.query(query, userID)
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

async function get_threads_from_user(user_id) {
    try {
        const query = "SELECT * FROM threads WHERE user_id = $1";
        const results = await pool.query(query, user_id);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user_followers(user_id) {
    try {
        const query = "SELECT * FROM users_followers uf JOIN users u ON uf.follower_id = u.userID WHERE uf.user_id = $1";
        const results = await pool.query(query, user_id);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function get_user_following(userID) {
    try {
        const query = "SELECT u.userID, u.userName, u.userEmail, u.userBio FROM users_followers uf JOIN users u ON uf.user_id = u.userID WHERE uf.follower_id = $1";
        const results = await pool.query(query, userID);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function user_follow(userID, follower_id) {
    try {
        const query = "INSERT INTO users_followers(user_id, follower_id) VALUES ((SELECT userID FROM users WHERE userName = $1), (SELECT userID FROM users WHERE userName = $2))";
        const results = await pool.query(query, [userID, follower_id]);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

async function user_unfollow(userID, follower_id) {
    try {

        const query = "DELETE FROM users_followers WHERE user_id = $1 AND follower_id = $2";
        const results = await pool.query(query, [userID, follower_id]);
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    get_users,
    get_user,
    get_groups_from_user,
    get_comments_from_user,
    get_threads_from_user,
    get_user_followers,
    get_user_following,
    user_follow,
    user_unfollow
};