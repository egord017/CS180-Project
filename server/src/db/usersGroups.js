const pool = require('../../db.js');


async function get_members(group_id){
    try{
        const query = "SELECT * FROM users_groups WHERE group_id=$1";
        const results = await pool.query(query, group_id);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}


async function get_member(group_id, user_id){
    try{
        const query = "SELECT * FROM users_groups WHERE group_id=$1 AND user_id=$2";
        const results = await pool.query(query, [group_id, user_id]);
        
        if (results.rows.length ==0){
            return null;
        }
        return results.rows[0];
        
    }
    catch (err){
        console.error(err);
    }
}

async function get_admin(group_id, user_id){
    try {
        const query = "SELECT role_id FROM users_groups WHERE group_id=$1 AND user_id=$2";
        const results = await pool.query(query, [group_id, user_id]);
        console.log(results.rows);

        if (results.rows.length ==0){
            return null;
        }
        return results;
    } catch (err) {
        console.error(err);
    }
}

async function post_member(group_id, user_id, role_id){
    try{
        const query = "INSERT INTO users_groups(group_id, user_id, role_id) VALUES ($1, $2, $3) RETURNING *";
        const results = await pool.query(query, [group_id, user_id, role_id]);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function delete_member(group_id, user_id){
    try{
        const query = "DELETE FROM workshops WHERE group_id=$1 AND user_id=$2 RETURNING *";
        const result = await pool.query(query, workshop_id);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    get_members,
    get_member,
    get_admin,
    post_member,
    delete_member
}
