const pool = require('../../db.js');


async function get_channel(id){
    try{
        const query = "SELECT * FROM channels WHERE id=$1";
        const results = await pool.query(query, id);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
    
}

async function get_threads_from_channel(channel_id){
    try{
        const query = "SELECT * FROM threads WHERE channel_id=$1";
        const results = await pool.query(query, channel_id);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function post_channel(group_id, name, description){
    try{
        const query = "INSERT into channels (group_id, name, description) VALUES ($1, $2, $3) RETURNING *";
        const results = await pool.query(query, [group_id, name, description]);
        return results.rows;
    }
    catch (err){
        console.error(err);
    }
}

async function edit_channel(channel_id, name, description){
    try{
        const query = "UPDATE channels SET name=$2, description=$3 WHERE id=$1 RETURNING *";
        const results = await pool.query(query, [channel_id, name, description]);
    }
    catch (err){
        console.error(err);
    }
}

async function delete_channel(channel_id){
    try{
        //delete all threads depending on this channel
        const res1 = await pool.query("DELETE FROM threads WHERE channel_id=$1", channel_id);

        const query = "DELETE FROM channels WHERE id=$1 RETURNING *";
        const result = await pool.query(query, channel_id);
        return result.rows;
    }
    catch (err){
        console.error(err);
    }
}

module.exports = {
    get_channel,
    get_threads_from_channel,
    post_channel,
    edit_channel,
    delete_channel
}