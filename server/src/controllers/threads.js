const threads_db = require('../db/threads.js');

async function get_threads(req, res) {
    const results = await threads_db.get_threads();
    res.send(results);
}

async function get_thread(req, res) {
    const params = Object.values(req.params);
    console.log("ahh"
    )
    console.log(params);
    const results = await threads_db.get_thread(params);
    
    res.send(results);
}

async function get_comments_from_thread(req, res) {
    const params = Object.values(req.params);
    const results = await threads_db.get_comments_from_thread(params);
    res.send(results);
}

async function post_thread(req, res){

    const body = req.body;
    const header = req.header;
    console.log(header);
    console.log(body);
    const results = await threads_db.post_thread(body.user_id, body.channel_id, body.title, body.body);
    console.log("returning: ", results);
    res.send(results);
    
    
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread,
    post_thread
};
