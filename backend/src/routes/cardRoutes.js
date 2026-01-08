const express = require("express");
const router = express.Router();
const { addCard, move, updateCard, deleteCard, archiveCard, getCardDetails } = require("../controllers/cardController");

router.post("/", addCard);
router.put("/move", move);
router.put("/:cardId", updateCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/archive", archiveCard);
router.get("/:cardId", getCardDetails);

module.exports = router;

