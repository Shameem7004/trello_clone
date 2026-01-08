const pool = require("../db");

async function getBoard(boardId) {
  const result = await pool.query(
    `
    SELECT 
      b.id AS board_id,
      b.title AS board_title,
      l.id AS list_id,
      l.title AS list_title,
      l.position AS list_position,
      c.id AS card_id,
      c.title AS card_title,
      c.position AS card_position
    FROM boards b
    LEFT JOIN lists l ON l.board_id = b.id
    LEFT JOIN cards c ON c.list_id = l.id
    WHERE b.id = $1
    ORDER BY l.position, c.position
    `,
    [boardId]
  );

  return result.rows;
}

module.exports = { getBoard };
