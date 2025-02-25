const express = require('express');
const workshopController = require("../controllers/workshop.js");

const router = express.Router();

router.get("/", workshopController.get_users);

module.exports = router;