const express = require("express");
const router = express.Router();
const { fetchBoard } = require("../controllers/boardController");

router.get("/:boardId", fetchBoard);

module.exports = router;
