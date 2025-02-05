const { Pool } = require('pg');
const fs = require('fs');


const pool = new Pool({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDB,
});

async function init_db(){
    try{
        var sql_init = fs.readFileSync('./init.sql').toString();

        const res = await pool.query(sql_init);
        console.log("init db");
    }
    catch (err){
        console.log(err);
    }
    
}
init_db();


module.exports = pool;