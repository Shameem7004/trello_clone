const { getBoard } = require("../services/boardService");

async function fetchBoard(req, res) {
  try {
    const { boardId } = req.params;
    const data = await getBoard(boardId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching board:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { fetchBoard };
