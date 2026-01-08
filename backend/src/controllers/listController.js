const { createList } = require("../services/listService");

async function addList(req, res) {
  try {
    const { title, boardId } = req.body;
    const list = await createList(title, boardId);
    res.json(list);
  } catch (error) {
    console.error("Error adding list:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addList };
