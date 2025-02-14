const express = require('express');
const groupController = require("../controllers/groups.js");

const router = express.Router();

//GET /groups/
router.get("/", groupController.get_groups);

//GET /groups/:group_id
router.get("/:group_id", groupController.get_group);

//GET /groups/:group_id/channels
router.get('/:group_id/channels', groupController.get_channels_from_group);


//get threads by group
router.get('/:group_id/threads', groupController.get_threads_from_group);

//post new group (required body: group_id, group_description, user_id)
router.post('/create', groupController.put_new_group);

//post new user into group (required body: group_id, user_id)
router.post('/join', groupController.join_group);

module.exports = router;