const critiques_db = require('../db/critiques.js');

async function get_critique(req, res){
    const params = Object.values(req.params);
    const results = await critiques_db.get_critique(params);
    res.send(results);
}

async function post_critique(req, res){
    const {workshop_thread_id, user_id, opening, body, closing, edited_passage} = req.body;
    console.log("POST CRIT:",workshop_thread_id, user_id, opening, body, closing);
    if (!workshop_thread_id||!body){
        return res.status(400).json({
            error: "payload is malformed, should be : 'thread_id', 'user_id', 'body'."
        });
    }
    console.log(req.body);
    const results = await critiques_db.post_critique(user_id, workshop_thread_id, opening, body, closing, edited_passage);
    res.send(results);
}

async function edit_critique(req, res){
    const id = Object.values(req.params);
    const {body} = req.body;
    console.log(id, body);
    if (!body){
        return res.status(400).json({
            error: "payload is malformed, should be : 'body'."
        });
    }
    const results = await critiques_db.edit_critique(id[0], body);
    res.send(results);

}

async function delete_critique(req, res){
    const id = Object.values(req.params);
    console.log("idd:", id);
    const results = await critiques_db.delete_critique(id);
    res.send(results);
}

module.exports = {
    get_critique,
    post_critique,
    edit_critique,
    delete_critique
}