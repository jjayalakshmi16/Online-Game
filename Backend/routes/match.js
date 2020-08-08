const express = require("express");

const router = express.Router();

const matchController = require("../controllers/matchController");

router.post("/add", matchController.add);
router.post("/get", matchController.get);
router.post("/fetch", matchController.fetch);

module.exports = router;
