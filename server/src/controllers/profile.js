const users_db = require('../db/profile.js');

async function get_users(req, res) {
    const results = await users_db.get_users();
    res.send(results);
}

async function get_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_user(params);
    console.log(results);
    
    if (!results){
        res.status(200).json(null);
        return;
    }
    res.send(results);
}

async function get_user_by_name(req, res){
    const user_name = Object.values(req.query);
    console.log("USER:", user_name);
    const results = await users_db.get_user_by_name(user_name);
    res.send(results);
}
async function get_groups_from_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_groups_from_user(params);
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
async function get_threads_from_user(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_threads_from_user(params);
    res.send(results);
}

async function get_user_followers(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_user_followers(params);
    res.send(results);
}

async function get_user_following(req, res) {
    const params = Object.values(req.params);
    const results = await users_db.get_user_following(params);
    res.send(results);
}

module.exports = {
    get_users,
    get_user,
    get_user_by_name,
    get_groups_from_user,
    get_comments_from_user,
    get_threads_from_user,
    get_user_followers,
    get_user_following
};