const express = require("express");
const router = express.Router();
const { addList } = require("../controllers/listController");

router.post("/", addList);

module.exports = router;
