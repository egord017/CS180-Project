const groups_db = require('../db/groups.js');

async function get_groups(req, res){
    const results = await groups_db.get_groups();
    res.json(results);
}

async function get_group(req, res){
    const group_id = req.params.group_id;
    const results = await groups_db.get_group(group_id);
    res.send(results);
}

async function get_users_group(req, res) {
    // Extract group_id from the route parameters and convert to a number
    const group_id = Number(req.params.group_id); // or parseInt(req.params.group_id, 10)
    const results = await groups_db.get_users_group(group_id);
    res.send(results);
}

async function get_channels_from_group(req, res){
    const params = Object.values(req.params);
    const results = await groups_db.get_channels_from_group(params);
    res.send(results);
}
async function get_workshops_from_group(req, res){
    const params = Object.values(req.params);
    const results = await groups_db.get_workshops_from_group(params);
    res.send(results);
}

async function get_threads_from_group(req, res){
    const params = Object.values(req.params);
    const results = await groups_db.get_threads_from_group(params);
    res.send(results);
}
async function get_threads_from_channel(req, res){
    const params = Object.values(req.params);
    const results = await groups_db.get_threads_from_channel(params);
    res.send(results);
}

async function create_new_group(req, res){
    try {
        const {group_name, group_description, user_id} = req.body;
        const results = await groups_db.create_new_group({group_name, group_description, user_id});
        if(results === "already exists"){
            res.status(401).json("A group with that name already exists");
        } 
        if(results.status === "created"){
            return res.status(200).json({message: "User has created the group", created_group: results.group});
        }  
        if(results.status === "error"){
            return res.status(500).json({ message: "Database error", error: results.message });
        }
    } catch (error) {
        console.log(error)
        
    }
}

async function join_group(req, res){
    const {group_id, user_id} = req.body;
    const results = await groups_db.join_group({group_id, user_id});
    if(results === "user-in-group"){
        res.status(401).json("User is already in this group");
    }
    if(results.status === "joined"){
        return res.status(200).json({message: "User has joined the group", joined_group: results.group});
    }
}

async function leave_group(req, res){
    const {group_id, user_id} = req.body;
    const results = await groups_db.leave_group({group_id, user_id});
    if(results === "not-in-group"){
        res.status(404).json("User is not a part of this group");
    }
    if(results.status === "left"){
        return res.status(200).json({message: "User has left the group", left_group: results.group});
    }
}

async function delete_group(req, res){
    const {group_id, user_id} = req.body;
    const results = await groups_db.delete_group({group_id, user_id});
    if(results === "not_admin"){
        res.status(403).json("User does not have permission")
    }
    if(results === "no-group"){
        res.status(404).json("Group not found")
    }
    if(results.status === "deleted"){
        return res.status(200).json({message: "Group successfully deleted", deleted_group: results.group});
    }
}

async function update_name(req, res){
    const {group_id, user_id, new_name} = req.body;
    const results = await groups_db.update_name({group_id, user_id, new_name})
    if(results === "not_admin"){
        res.status(403).json("User does not have permission");
    }
    if(results.status === "updated"){
        return res.status(200).json({message: "Group name updated successfully", updated_group: results.group});
    }
}

async function update_description(req, res){
    const {group_id, user_id, new_name} = req.body;
    const results = await groups_db.update_description({group_id, user_id, new_name})
    if(results === "not_admin"){
        res.status(403).json("User does not have permission");
    }
    if(results.status === "updated"){
        return res.status(200).json({message: "Group description updated successfully", updated_group: results.group});
    }
}

module.exports = {
    get_groups,
    get_group,
    get_users_group,
    get_channels_from_group,
    get_workshops_from_group,
    get_threads_from_group,
    get_threads_from_channel,
    create_new_group,
    join_group,
    leave_group,
    delete_group,
    update_name,
    update_description
}