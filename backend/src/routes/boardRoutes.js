const express = require("express");
const router = express.Router();
const { fetchBoard, fetchAllBoards } = require("../controllers/boardController");

router.get("/", fetchAllBoards);
router.get("/:boardId", fetchBoard);

module.exports = router;
