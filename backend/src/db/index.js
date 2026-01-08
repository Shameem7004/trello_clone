const { Pool } = require("pg");

const pool = new Pool({
  user: "mdshameemalam",
  host: "localhost",
  database: "trello_clone",
  password: "ShameemR@7004",
  port: 5432,
});

module.exports = pool;
