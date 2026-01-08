const { createCard, moveCard } = require("../services/cardService");

async function addCard(req, res) {
  try {
    const { title, listId } = req.body;
    const card = await createCard(title, listId);
    res.json(card);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ error: error.message });
  }
}

async function move(req, res) {
  try {
    const { cardId, listId, position } = req.body;
    await moveCard(cardId, listId, position);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error moving card:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addCard, move };