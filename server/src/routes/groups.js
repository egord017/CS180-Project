const express = require('express');
const pool = require("../../db");
const groupController = require("../controllers/groups.js");
const channels_db = require("../db/groups.js");

const router = express.Router();

//GET /groups/
router.get("/", groupController.get_groups);

//GET /groups/:group_id
router.get("/:group_id", groupController.get_group);

//GET /groups/:group_id/channels
router.get('/:group_id/channels', groupController.get_channels_from_group);
//get /groups/:group_id/channels/channel_id

//get threads by group
router.get('/:group_id/threads', groupController.get_threads_from_group);

module.exports = router;