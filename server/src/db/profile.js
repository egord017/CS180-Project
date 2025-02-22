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

// async function get_comments_from_user(userID) {
//     try {
//         const query = "SELECT * FROM comments WHERE userID = $1";
//         const results = await pool.query(query, userID);
//         return results.rows;
//     } catch (err) {
//         console.error(err);
//     }
// }

// async function get_threads_from_user(userID) {
//     try {
//         const query = "SELECT * FROM threads WHERE userID = $1";
//         const results = await pool.query(query, userID);
//         return results.rows;
//     } catch (err) {
//         console.error(err);
//     }
// }





module.exports = {
    get_users,
    get_user,
    get_groups_from_user
    // get_comments_from_user,
    //get_threads_from_user,
    
};