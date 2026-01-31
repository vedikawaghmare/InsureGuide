const express = require("express");
const router = express.Router();
const { getRisk } = require("../controllers/risk.controller");

router.get("/", getRisk);

module.exports = router;
