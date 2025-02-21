const users_db = require('../db/users.js');

async function get_users(req, res) {
    const results = await users_db.get_users();
    res.send(results);
}

async function get_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_user(params);
    res.send(results);
}

async function get_comments_from_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_comments_from_user(params);
    res.send(results);
}

async function get_threads_from_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_threads_from_user(params);
    res.send(results);
}

async function get_groups_from_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_groups_from_user(params);
    res.send(results);
}

module.exports = {
    get_users,
    get_user,
    get_comments_from_user,
    get_threads_from_user,
    get_groups_from_user
};