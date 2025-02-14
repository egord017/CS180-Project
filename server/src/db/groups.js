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

//UNUSED
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
    const query = 'SELECT * FROM threads WHERE threads.channel_id = $1';
    try{
        const result = await pool.query(query, channel_id);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }

}

async function put_new_group(params){
    try {
        const {group_name, group_description, user_id } = params;

        //check if group already exists
        const group = await pool.query("SELECT * FROM groups WHERE name = $1", [group_name]);

        if(group.rows.length !== 0){
            return res.status(401).json("A group with that name already exists");
        }

        //insert new group into db
        const newGroup = await pool.query("INSERT INTO groups (name, description) VALUES ($1, $2)", [group_name, group_description])

        //make user who created group the admin
        const userAdmin = await pool.query("INSERT INTO users_groups (group_id, user_id, role_id) VALUES ($1, $2, 1)", [newGroup.rows[0].id, user_id])

        const result = newGroup.rows[0];

        res.json({result});

    } catch (err) {
        console.log(err.message);
    }
}

async function join_group(params){
    try {
        const {group_id, user_id } = params;

        //check if user already in group
        const userInGroup = await pool.query("SELECT * FROM users_groups WHERE group_id = $1 AND user_id = $2", [group_id, user_id])
        if(userInGroup.rows.length !== 0){
            return res.status(401).json("User is already in this group");
        }

        //insert user into users_groups in db
        const userGroup = await pool.query("INSERT INTO users_groups (group_id, user_id, role_id) VALUES ($1, $2, 0)", [group_id, user_id])

        const result = userGroup.rows[0];

        res.json({result});

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    get_groups,
    get_group,
    get_channels_from_group,
    get_channel,
    get_threads_from_group,
    get_threads_from_channel,
    put_new_group,
    join_group
}