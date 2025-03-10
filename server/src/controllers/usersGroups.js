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
    res.send(results);

}

async function post_member(req, res){

}

async function delete_member(req,res){

}




module.exports = {
    get_members,
    get_member,
    post_member,
    delete_member

}   