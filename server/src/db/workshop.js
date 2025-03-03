const pool = require('../../db.js');

async function get_workshop(id){
    try{
        const query = "SELECT * FROM workshops WHERE id=$1";
        const results = await pool.query(query, id);
        
        console.log(results);
        return results.rows[0];
    }
    catch (err){
        console.log("r", id);
        console.error(err);
    }
}

async function get_threads_from_workshop(workshop_id){
    try{
        const query = "SELECT * FROM workshop_threads WHERE workshop_id=$1";
        const results = await pool.query(query, workshop_id);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function post_workshop(group_id, name, description){
    try{
        const query = "INSERT into workshops (group_id, name, description) VALUES ($1, $2, $3) RETURNING *";
        const results = await pool.query(query, [group_id, name, description]);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function edit_workshop(workshop_id, name, description){
    try{
        const query = "UPDATE workshops SET name=$2, description=$3 WHERE id=$1 RETURNING *";
        const results = await pool.query(query, [workshop_id, name, description]);
    }
    catch (err){
        console.error(err);
    }
}

async function delete_workshop(workshop_id){
    try{
        const query = "DELETE FROM workshops WHERE id=$1 RETURNING *";
        const result = await pool.query(query, workshop_id);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    get_workshop,
    get_threads_from_workshop,
    post_workshop,
    edit_workshop,
    delete_workshop
}