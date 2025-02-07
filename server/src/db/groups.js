const pool = require('../../db.js');

async function get_groups(){
    const results = await pool.query("SELECT * FROM groups");
    return results.rows;
}

//GET /groups
async function get_group(group_id){
    try{
        const result = await pool.query('SELECT * FROM groups WHERE groups.id=$1', group_id);
        return (result.rows);
    }
    catch (err) {
        console.log(err);
    }
}

//groups/:group_id/channels
async function get_channels_from_group(group_id){
    const query = 'SELECT * FROM channels WHERE channels.group_id=$1';
    try{
        const result = await pool.query(query, group_id);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

async function get_channel(channel_id){
    const query = 'SELECT * FROM channels WHERE channels.id=$1';
    try{
        const result = await pool.query(query, group_id);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

async function get_threads_from_group(group_id){
    const query = 'SELECT threads.* FROM threads JOIN channels ON threads.channel_id = channels.id WHERE channels.group_id=$1';
    try{
        const result = await pool.query(query, group_id);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

async function get_threads_from_channel(channel_id){

}

module.exports = {
    get_groups,
    get_group,
    get_channels_from_group,
    get_channel,
    get_threads_from_group,
    get_threads_from_channel
}