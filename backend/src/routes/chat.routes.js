const express = require("express");
const router = express.Router();
const { chatWithAgent } = require("../controllers/chat.controller");

router.post("/", chatWithAgent);

module.exports = router;
