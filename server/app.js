const express = require('express');
require('dotenv').config();

const db = require('./db.js');


const app = express();
const port = 8000;

app.get('/', async (req, res)=>{
    const users = await db.query("SELECT * FROM users");
    res.send(users.rows);
}); 
app.get('/users')
app.listen(port);
