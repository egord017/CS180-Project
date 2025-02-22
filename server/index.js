

const express = require("express");
require('dotenv').config();
const db = require('./db.js');
const morgan = require("morgan");

const app = express();
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); //added morgan for api testing

//routes
app.use("/auth", require("./src/routes/jwtAuth.js")); //login and register route
app.use("/dashboard", require("./src/routes/dashboard.js")); //dashboard route
app.use('/groups', require('./src/routes/groups.js')); //groups route
app.use('/channels', require('./src/routes/channels.js'));
app.use("/threads", require("./src/routes/threads.js")); //threads route
app.use("/comments", require("./src/routes/comments.js")); 
app.use("/profile", require("./src/routes/profile.js")); //profile route

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});