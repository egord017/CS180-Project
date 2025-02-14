const groups_db = require('../db/groups.js');

async function get_groups(req, res){
    const results = await groups_db.get_groups();
    res.send(results);
}

async function get_group(req, res){
    const params = Object.values(req.params);
    console.log(params);
    const results = await groups_db.get_group(params);
    res.send(results);
}

async function get_channels_from_group(req, res){
    const params = Object.values(req.params);
    const results = await groups_db.get_channels_from_group(params);
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

async function put_new_group(req, res){
    const {group_name, group_description, user_id} = req.body;
    const results = await groups_db.put_new_group({group_name, group_description, user_id});
    res.json(results);
}

async function join_group(req, res){
    const {group_id, user_id} = req.body;
    const results = await groups_db.join_group({group_id, user_id});
    res.json(results);
}

module.exports = {
    get_groups,
    get_group,
    get_channels_from_group,
    get_threads_from_group,
    get_threads_from_channel,
    put_new_group,
    join_group
}