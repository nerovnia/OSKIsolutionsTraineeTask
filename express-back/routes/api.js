const express = require("express");
const router = express.Router();
const controller = require("../controllers/tests");

console.log("router tests");
/* GET list of allowed tests */
router.get("/tests", controller.getAllowedTests);
/*
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
*/
module.exports = router;
