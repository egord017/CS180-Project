const threads_db = require('../db/threads.js');

async function get_threads(req, res) {
    const results = await threads_db.get_threads();
    res.send(results);
}

async function get_thread(req, res) {
    const params = Object.values(req.params);
    console.log(params);
    const results = await threads_db.get_thread(params);
    
    res.send(results);
}

async function get_comments_from_thread(req, res) {
    const params = Object.values(req.params);
    const results = await threads_db.get_comments_from_thread(params);
    res.send(results);
}

module.exports = {
    get_threads,
    get_thread,
    get_comments_from_thread
};
