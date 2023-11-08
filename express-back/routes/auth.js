const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

/* GET users listing. */
router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);

module.exports = router;
