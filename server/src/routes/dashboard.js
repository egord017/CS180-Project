const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../middleware/authorization");


//get current user's name
router.get("/username", authorization, async(req, res) => {
    try {
        
        const user = await pool.query("SELECT username FROM users WHERE userid = $1", [req.user]);

        res.json(user.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//get current user's id
router.get("/userid", authorization, async(req, res) => {
    try {
        res.json({ userID: req.user });
    } catch (err) {
        console.log(err.message);
    }
})

//get current user's groups
router.get("/usergroups", authorization, async(req, res) => {
    try {
        const userGroups = await pool.query("SELECT g.* FROM groups G JOIN users_groups ug ON g.id = ug.group_id WHERE ug.user_id = $1", [req.user]);

        res.json({userGroups});
    } catch (error) {
        console.error(error);
    }
})

//get user's follower's threads
router.get("/followedthreads", authorization, async(req, res) => {
    try {
        
        const limit = parseInt(req.query.limit) || 20
        const offset = parseInt(req.query.offset) || 0

        const threads = await pool.query("SELECT t.* FROM threads t JOIN users_followers uf ON t.user_id = uf.user_id WHERE uf.follower_id = $1 ORDER BY t.time_stamp DESC LIMIT $2 OFFSET $3", 
            [req.user, limit, offset]);

        res.json(threads.rows);

    } catch (error) {
        console.error(error);
    }
})

module.exports = router;
