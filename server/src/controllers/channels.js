const channels_db = require('../db/channels.js');


async function get_channel(req, res){
    const id = Object.values(req.params);
    console.log(id);
    const results = await channels_db.get_channel(id);
    res.send(results);
}

async function get_threads_from_channel(req, res){
    const id = Object.values(req.params);
    const results = await channels_db.get_threads_from_channel(id);
    res.send(results);
}

async function post_channel(req, res){
    const {group_id, name, description} = req.body;
    
    if (!group_id || !name) {
        return res.status(400).json({
            error: "payload is malformed, should be : 'group_id', 'name', 'description'."
        });
    }
    const results = await channels_db.post_channel(group_id, name, description);
    
    res.send(results);
}

async function edit_channel(req, res){
    const channel_id = Object.values(req.params);
    const {name, description} = req.body;
    console.log(channel_id[0], name, description);
    if (!name || !description) {
        return res.status(400).json({
            error: "payload is malformed, should be :'name', 'description'."
        });
    }
    const results = await channels_db.edit_channel(channel_id[0], name, description );
    res.send(results);
}

async function delete_channel(req, res){
    const channel_id = Object.values(req.params);
    const results = await channels_db.delete_channel(channel_id);
    res.send(results);
}

module.exports = {
    get_channel,
    get_threads_from_channel,
    post_channel,
    edit_channel,
    delete_channel
}