const pool = require('../../db.js');

// gets the user's UniqueID to make testing easier. 
// ex: http://localhost:5000/profile/69193896-ec98-48ba-b06d-2d74407096d1
async function get_users() { 
    try {
        const results = await pool.query("SELECT * FROM users");
        // const results = await pool.query("SELECT users.userID, users.userName FROM users");
        return results.rows;
    } catch (err) {
        console.error(err);
    }
}

//CHANGED: returns object instead of array [single object]

async function get_user_by_name(username){
    try {
        
        const query = "SELECT * FROM users WHERE userName = $1";
        const results = await pool.query(query, username);
        return results.rows[0];
    } catch (err) {
        console.error(err);
    }
}
async function get_user(userID) {
    try {
        const query = "SELECT * FROM users WHERE userID = $1";
        const results = await pool.query(query, userID);

        if (results.rows.length ==0){
            return null;
        }
        return results.rows[0];

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

// async function post_user(userName, userEmail, userPassword){
//     try{
//         const query = "INSERT INTO users(userName, userEmail, userPassword) VALLUES ($1, $2, $3) RETURN *";
//         const results = await pool.query(query, [userName, userEmail, userPassword]);
//         return results.rows[0];
//     }
//     catch (err){
//         console.error(err);
//     }
// }

module.exports = {
    get_users,
    get_user_by_name,
    get_user,
    get_groups_from_user,
    get_comments_from_user,
    get_threads_from_user,
    get_user_followers,
    get_user_following
};