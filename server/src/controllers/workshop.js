const workshops_db = require('../db/workshop.js');



async function get_workshop(req, res){
    const id = Object.values(req.params);
    console.log(id);
    const results = await workshops_db.get_workshop(id);
    res.send(results);
}

async function get_threads_from_workshop(req, res){
    const id = Object.values(req.params);
    const results = await workshops_db.get_threads_from_workshop(id);
    res.send(results);
}

async function post_workshop(req, res){
    const {group_id, name, description} = req.body;

    if (!group_id || !name || !description) {
        return res.status(400).json({
            error: "payload is malformed, should be : 'group_id', 'name', 'description'."
        });
    }
    const results = await workshops_db.post_workshop(group_id, name, description);
    res.send(results);
}

async function edit_workshop(req, res){
    const workshop_id = Object.values(req.params)[0];
    const {name, description} = req.body;
    console.log(workshop_id, name, description);
    if (!name || !description) {
        return res.status(400).json({
            error: "payload is malformed, should be :'name', 'description'."
        });
    }
    const results = await workshops_db.edit_workshop(workshop_id, name, description );
    res.send(results);
}

async function delete_workshop(req, res){
    const workshop_id = Object.values(req.params);
    const results = await workshops_db.delete_workshop(workshop_id);
    res.send(results);
}

module.exports = {
    get_workshop,
    get_threads_from_workshop,
    post_workshop,
    edit_workshop,
    delete_workshop
}