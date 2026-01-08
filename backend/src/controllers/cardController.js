const { createCard, moveCard, editCard, removeCard, setArchiveCard, getCard } = require("../services/cardService");

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

async function updateCard(req, res) {
  try {
    const { cardId } = req.params;
    const { title, description, due_date } = req.body;
    const card = await editCard(cardId, { title, description, due_date });
    res.json(card);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteCard(req, res) {
  try {
    const { cardId } = req.params;
    await removeCard(cardId);
    res.json({ success: true, message: "Card deleted" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: error.message });
  }
}

async function archiveCard(req, res) {
  try {
    const { cardId } = req.params;
    const card = await setArchiveCard(cardId);
    res.json(card);
  } catch (error) {
    console.error("Error archiving card:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getCardDetails(req, res) {
  try {
    const { cardId } = req.params;
    const card = await getCard(cardId);
    res.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addCard, move, updateCard, deleteCard, archiveCard, getCardDetails };