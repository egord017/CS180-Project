const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "max8882002",
    host: "localhost",
    port: 5432,
    database: "writersblock"
});

module.exports = pool;