const pool = require('../../db.js');

async function post_comment(thread_id, user_id, body){
    console.log("posting comment");
    try{

        const query = "INSERT INTO comments (thread_id, user_id, body) VALUES ($1, $2, $3) RETURNING *";
        const result = await pool.query(query, [thread_id, user_id, body]);

        console.log("result:", result.rows[0]);
        return (result).rows[0];
    }
    catch (err){
        console.error(err);
    }
}

async function patch_comment(id, body){
    try{
        const query = "UPDATE comments SET body=$2 WHERE id=$1 RETURNING *";
        const result = await pool.query(query, [id, body]);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function delete_comment(id){
    try{
        const query = "DELETE FROM comments WHERE id=$1 RETURNING *";
        const result = await pool.query(query, id);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    post_comment,
    patch_comment,
    delete_comment
}