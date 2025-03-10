const pool = require('../../db.js');


async function get_critique(id){
    try {
        const query = "SELECT * FROM freeform_critiques WHERE id = $1";
        const result = await pool.query(query, id); 
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}
async function post_critique(user_id, workshop_thread_id, opening, body, closing, edited_passage=null){
    try{
        const query = "INSERT INTO freeform_critiques (user_id, workshop_thread_id, opening,body, closing, edited_passage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const result = await pool.query(query, [user_id, workshop_thread_id, opening,body, closing, edited_passage]);
        return (result).rows[0];
    }
    catch (err){
        console.error(err);
    }
}

async function edit_critique(id, body){
    try{
        const query = "UPDATE freeform_critiques SET body=$2 WHERE id=$1 RETURNING *";
        const result = await pool.query(query, [id, body]);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function delete_critique(id){
    try{
        const query = "DELETE FROM freeform_critiques WHERE id=$1 RETURNING *";
        const result = await pool.query(query, id);
        return result.rows[0];
    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    get_critique,
    post_critique,
    edit_critique,
    delete_critique
}