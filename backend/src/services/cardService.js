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
      `UPDATE cards SET position = position + 1 WHERE list_id = $1 AND position >= $2`,
      [newListId, newPosition]
    );

    await client.query(
      `UPDATE cards SET list_id = $1, position = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`,
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

async function editCard(cardId, updates) {
  const { title, description, due_date } = updates;
  
  const result = await pool.query(
    `UPDATE cards 
     SET title = COALESCE($1, title), 
         description = COALESCE($2, description), 
         due_date = COALESCE($3, due_date),
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $4 
     RETURNING *`,
    [title, description, due_date, cardId]
  );

  if (result.rows.length === 0) {
    throw new Error("Card not found");
  }

  return result.rows[0];
}

async function removeCard(cardId) {
  const result = await pool.query(
    "DELETE FROM cards WHERE id = $1 RETURNING *",
    [cardId]
  );

  if (result.rows.length === 0) {
    throw new Error("Card not found");
  }

  return result.rows[0];
}

async function setArchiveCard(cardId) {
  const result = await pool.query(
    `UPDATE cards SET updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    [cardId]
  );

  if (result.rows.length === 0) {
    throw new Error("Card not found");
  }

  return result.rows[0];
}

async function getCard(cardId) {
  const result = await pool.query(
    `SELECT 
      c.*,
      json_agg(DISTINCT jsonb_build_object('id', l.id, 'name', l.name, 'color', l.color)) 
        FILTER (WHERE l.id IS NOT NULL) as labels,
      json_agg(DISTINCT jsonb_build_object('id', m.id, 'name', m.name, 'avatar', m.avatar, 'avatar_color', m.avatar_color)) 
        FILTER (WHERE m.id IS NOT NULL) as members,
      json_agg(DISTINCT jsonb_build_object('id', ch.id, 'title', ch.title, 'items', (
        SELECT json_agg(jsonb_build_object('id', ci.id, 'title', ci.title, 'is_completed', ci.is_completed, 'position', ci.position))
        FROM checklist_items ci WHERE ci.checklist_id = ch.id ORDER BY ci.position
      ))) FILTER (WHERE ch.id IS NOT NULL) as checklists
    FROM cards c
    LEFT JOIN card_labels cl ON c.id = cl.card_id
    LEFT JOIN labels l ON cl.label_id = l.id
    LEFT JOIN card_members cm ON c.id = cm.card_id
    LEFT JOIN members m ON cm.member_id = m.id
    LEFT JOIN checklists ch ON c.id = ch.card_id
    WHERE c.id = $1
    GROUP BY c.id`,
    [cardId]
  );

  if (result.rows.length === 0) {
    throw new Error("Card not found");
  }

  return result.rows[0];
}

module.exports = { createCard, moveCard, editCard, removeCard, setArchiveCard, getCard };
