const comments_db = require('../db/comments.js');


async function post_comment(req, res){
    const {thread_id, user_id, body} = req.body;
    if (!thread_id||!body){
        return res.status(400).json({
            error: "payload is malformed, should be : 'thread_id', 'user_id', 'body'."
        });
    }
    console.log(body, thread_id, user_id);
    const results = await comments_db.post_comment(thread_id, user_id, body);
    res.send(results);
}

async function edit_comment(req, res){
    const id = Object.values(req.params);
    const {body} = req.body;
    console.log(id, body);
    if (!body){
        return res.status(400).json({
            error: "payload is malformed, should be : 'body'."
        });
    }
    const results = await comments_db.patch_comment(id[0], body);
    res.send(results);

}

async function delete_comment(req, res){
    const id = Object.values(req.params);
    console.log(id);
    const results = await comments_db.delete_comment(id);
    res.send(results);
}

module.exports = {
    post_comment,
    edit_comment,
    delete_comment
}