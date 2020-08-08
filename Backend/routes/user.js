const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/signin", userController.fetch);
router.post("/signup", userController.signup);
router.post("/googlesignin", userController.google);

module.exports = router;
