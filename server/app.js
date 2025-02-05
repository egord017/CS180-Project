const express = require('express');
require('dotenv').config();

const db = require('./db.js');


const app = express();
const port = 8000;

app.get('/', (req, res)=>{
    res.send(db);
});
app.get('/users')
app.listen(port);
