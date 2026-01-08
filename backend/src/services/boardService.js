const pool = require("../db");

async function getBoard(boardId) {
  try {
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
        c.description AS card_description,
        c.position AS card_position
      FROM boards b
      LEFT JOIN lists l ON l.board_id = b.id
      LEFT JOIN cards c ON c.list_id = l.id
      WHERE b.id = $1
      ORDER BY l.position, c.position
      `,
      [boardId]
    );

    if (result.rows.length === 0) {
      throw new Error(`Board with id ${boardId} not found`);
    }

    return result.rows;
  } catch (error) {
    console.error('Error in getBoard:', error);
    throw error;
  }
}

async function getAllBoards() {
  try {
    const result = await pool.query(
      `SELECT id, title, created_at FROM boards ORDER BY created_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('Error in getAllBoards:', error);
    throw error;
  }
}

module.exports = { getBoard, getAllBoards };
