const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering

router.post("/register", validInfo, async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        //check if user already exists
        const user = await pool.query("SELECT * FROM users WHERE useremail = $1", [
            email
        ]);

        if(user.rows.length !== 0){
            return res.status(401).send("User already exists");
        }

        //encrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter new user into database
        const newUser = await pool.query("INSERT INTO users (username, useremail, userpassword) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
        );

        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].userID);

        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
router.post("/login", validInfo, async (req, res) => {
    try {
        
        const {email, password} = req.body;

        //check if user exists
        const user = await pool.query("SELECT * FROM users where useremail = $1", 
            [email]
        );

        if(user.rows.length === 0){
            return res.status(401).json("Email or Password do not match");
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].userpassword);

        if(!validPassword){
            return res.status(401).json("Email or Password do not match");
        }
        
        //give jwt token
        const token = jwtGenerator(user.rows[0].userID);
        res.json(token);

    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {

        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});

module.exports = router;