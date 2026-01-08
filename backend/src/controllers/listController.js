const { createList, editList, removeList } = require("../services/listService");

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

async function updateList(req, res) {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const list = await editList(listId, title);
    res.json(list);
  } catch (error) {
    console.error("Error updating list:", error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteList(req, res) {
  try {
    const { listId } = req.params;
    await removeList(listId);
    res.json({ success: true, message: "List deleted" });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addList, updateList, deleteList };
