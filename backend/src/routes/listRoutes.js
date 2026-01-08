const express = require("express");
const router = express.Router();
const { addList, updateList, deleteList } = require("../controllers/listController");

router.post("/", addList);
router.put("/:listId", updateList);
router.delete("/:listId", deleteList);

module.exports = router;
