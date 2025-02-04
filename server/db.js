const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "YOUR_POSTGRES_PASSWORD",
    host: "localhost",
    port: 5432,
    database: "writersblock"
});

module.exports = pool;
