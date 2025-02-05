const { Client } = require('pg');


const client = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDB,
});
client.connect()

client.query('SELECT * FROM users',(err, result)=>{
    if (result){
        console.log(result.rows);
        
    }
    else{
        console.log("ERROR");
    }
    client.end();
})




module.exports = client;