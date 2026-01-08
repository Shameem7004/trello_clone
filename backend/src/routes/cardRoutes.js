const express = require("express");
const router = express.Router();
const { addCard, move } = require("../controllers/cardController");

router.post("/", addCard);
router.put("/move", move);

module.exports = router;

