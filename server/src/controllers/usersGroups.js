const users_groups_db = require('../db/usersGroups.js');

//to get a user's groups, get all groups from a user is already in profile.

//get all members from a group
async function get_members(req, res){
    const id = Object.values(req.params);
    const results = await users_groups_db.get_members(id);
    res.send(results);
}

async function get_member(req, res){
    const group_id = Object.values(req.params)[0];
    const user_id = Object.values(req.query)[0];

    const results = await users_groups_db.get_member(group_id, user_id);
    
    if (!results){
        res.status(404).json({ error: "User not found in group" });
        return;
    }

    res.status(200).json(results);

}

async function get_admin(req, res){
    const group_id = Object.values(req.params)[0];
    const user_id = Object.values(req.query)[0];

    const results = await users_groups_db.get_admin(group_id, user_id);

    console.log("Res:", results);
    if (!results){
        res.status(404).json();
        return;
    }
    res.send(results);
}

async function post_member(req, res){

}

async function delete_member(req,res){

}




module.exports = {
    get_members,
    get_member,
    get_admin,
    post_member,
    delete_member

}   