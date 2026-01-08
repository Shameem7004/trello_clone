const pool = require("../db");

async function createCard(title, listId) {
  const posResult = await pool.query(
    "SELECT COALESCE(MAX(position), 0) + 1 AS position FROM cards WHERE list_id = $1",
    [listId]
  );

  const position = posResult.rows[0].position;

  const result = await pool.query(
    "INSERT INTO cards (title, position, list_id) VALUES ($1, $2, $3) RETURNING *",
    [title, position, listId]
  );

  return result.rows[0];
}

async function moveCard(cardId, newListId, newPosition) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      UPDATE cards
      SET position = position + 1
      WHERE list_id = $1 AND position >= $2
      `,
      [newListId, newPosition]
    );

    await client.query(
      `
      UPDATE cards
      SET list_id = $1, position = $2
      WHERE id = $3
      `,
      [newListId, newPosition, cardId]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { createCard, moveCard };
