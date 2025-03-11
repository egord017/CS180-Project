const pool = require('../../db.js');

async function get_groups(){
    const results = await pool.query("SELECT * FROM groups");
    return results.rows;
}

//GET /groups
async function get_group(group_id){
    try{
        const result = await pool.query('SELECT * FROM groups WHERE groups.id=$1', [group_id]);
        return (result.rows[0]);
    }
    catch (err) {
        console.log(err);
    }
}

async function get_users_group(group_id){
    try {
        const users = await pool.query("SELECT users.username FROM users JOIN user_groups on users.userid = user_groups.user_id WHERE user_groups.group_id = $1", 
            [group_id]);

        return users.rows;
    } catch (err) {
        console.log(err)
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

async function get_workshops_from_group(group_id){
    const query = 'SELECT * FROM workshops WHERE group_id=$1';
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

async function create_new_group(params){
    try {
        const {group_name, group_description, user_id } = params;

        //check if group already exists
        const group = await pool.query("SELECT * FROM groups WHERE name = $1", [group_name]);
        if(group.rows.length !== 0){
            return "already exists";
        }

        //insert new group into db
        const newGroup = await pool.query("INSERT INTO groups (name, description) VALUES ($1, $2) RETURNING *", [group_name, group_description])

        //make user who created group the admin
        await pool.query("INSERT INTO users_groups (group_id, user_id, role_id) VALUES ($1, $2, 1)", [newGroup.rows[0].id, user_id])

        return {status: "created", group: newGroup.rows};

    } catch (err) {
        console.error("Database Error:", err.message);
        return {status: "error", message: err.message };
    }
}

async function join_group(params){
    try {
        const {group_id, user_id } = params;

        //check if user already in group
        const userInGroup = await pool.query("SELECT * FROM users_groups WHERE group_id = $1 AND user_id = $2", [group_id, user_id])
        if(userInGroup.rows.length !== 0){
            return "user-in-group";
        }

        //insert user into users_groups in db
        const userGroup = await pool.query("INSERT INTO users_groups (group_id, user_id, role_id) VALUES ($1, $2, 0)", [group_id, user_id])

        return {status: "joined", groups: userGroup.rows};

    } catch (err) {
        console.log(err.message);
    }
}

async function leave_group(params){
    try {
        const {group_id, user_id} = params;

        //check if user is in group
        const leaveGroup = await pool.query("DELETE FROM user_groups WHERE group_id = $1 AND user_id = $2 RETURNING *", [group_id, user_id]);
        if(leaveGroup.rowCount === 0){
            return "not-in-group";
        }

        return {status: "left", group: leaveGroup.rows};

    } catch (err) {
        console.log(err.message);
    }
}

async function delete_group(params){
    try {
        const {group_id, user_id} = params;

        //check if user is admin of group
        const adminCheck = await pool.query("SELECT * FROM user_groups WHERE group_id = $1 AND user_id = $2 AND role_id = 1", [group_id, user_id]);
        if(adminCheck.rows.length === 0){
            return "not_admin";
        }

        //remove all users from the group
        await pool.query("DELETE FROM user_groups WHERE group_id = $1", [group_id]);
        //delete the group
        const deleteGroup = await pool.query("DELETE FROM groups WHERE id = $1 RETURNING *", [group_id]);

        if(deleteGroup.rowCount === 0){
            return "no-group";
        }

        return {status: "deleted", group: deleteGroup.rows};
    } catch (err) {
        console.log(err.message);
    }
}

async function update_name(params){
    try {
       const {group_id, user_id, new_name} = params;

        //check if user is admin of group
        const adminCheck = await pool.query("SELECT * FROM user_groups WHERE group_id = $1 AND user_id = $2 AND role_id = 1", [group_id, user_id]);
        if(adminCheck.rows.length === 0){
            return "not_admin";
        }

        const updatedGroupName = await pool.query("UPDATE groups SET name = $1 WHERE id = $2 RETURNING *", [new_name, group_id]);

        return {status: "updated", group: updatedGroupName.rows[0]};

    } catch (err) {
        console.log(err.message)
    }
}

async function update_description(params){
    try {
       const {group_id, user_id, new_description} = params;

        //check if user is admin of group
        const adminCheck = await pool.query("SELECT * FROM user_groups WHERE group_id = $1 AND user_id = $2 AND role_id = 1", [group_id, user_id]);
        if(adminCheck.rows.length === 0){
            return "not_admin";
        }

        const updatedGroupDesc = await pool.query("UPDATE groups SET description = $1 WHERE id = $2 RETURNING *", [new_description, group_id]);

        return {status: "updated", group: updatedGroupDesc.rows[0]};

    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    get_groups,
    get_group,
    get_users_group,
    get_channels_from_group,
    get_workshops_from_group,
    get_channel,
    get_threads_from_group,
    get_threads_from_channel,
    create_new_group,
    join_group,
    leave_group,
    delete_group,
    update_name,
    update_description
}