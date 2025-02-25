const express = require('express');
const workshopController = require("../controllers/workshop.js");

const router = express.Router();

//Get all users user_id for testing
router.get("/", workshopController.get_users);

module.exports = router;