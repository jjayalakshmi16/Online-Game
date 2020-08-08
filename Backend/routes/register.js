const express = require("express");

const router = express.Router();

const registerController = require("../controllers/registerController");

router.post("/add", registerController.add);
router.post("/fetch", registerController.fetch);
router.post("/check", registerController.check);
router.post("/cancel", registerController.cancel);
module.exports = router;
