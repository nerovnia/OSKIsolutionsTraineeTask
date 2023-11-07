const express = require("express");
const router = express.Router();
const controller = require("../controllers/tests");

/* GET list of allowed tests */
router.get("/", controller.getAllowedTests);

module.exports = router;
