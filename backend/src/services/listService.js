const pool = require("../db");

async function createList(title, boardId) {
  const posResult = await pool.query(
    "SELECT COALESCE(MAX(position), 0) + 1 AS position FROM lists WHERE board_id = $1",
    [boardId]
  );

  const position = posResult.rows[0].position;

  const result = await pool.query(
    "INSERT INTO lists (title, position, board_id) VALUES ($1, $2, $3) RETURNING *",
    [title, position, boardId]
  );

  return result.rows[0];
}

module.exports = { createList };
