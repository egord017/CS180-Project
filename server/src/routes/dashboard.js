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


module.exports = router;
