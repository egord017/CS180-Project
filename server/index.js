

const express = require("express");
require('dotenv').config();
const db = require('./db.js');

const app = express();
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", require("./src/routes/jwtAuth.js")); //login and register route

app.use("/dashboard", require("./src/routes/dashboard.js")); //dashboard route
app.use('/groups', require('./src/routes/groups.js'));


//temporary test, will remove lol
app.get('/', (req, res)=>{
    res.send("/ GET request");
});
app.get('/users', async (req, res)=>{
    const users = await db.query("SELECT * FROM users");
    res.send(users.rows);
}); 

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});