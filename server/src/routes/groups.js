const express = require('express');
const groupController = require("../controllers/groups.js");

const router = express.Router();

//GET /groups/
router.get("/", groupController.get_groups);

//GET /groups/:group_id
router.get("/:group_id", groupController.get_group);

//GET /groups/:group_id/channels
router.get('/:group_id/channels', groupController.get_channels_from_group);


//get users in group
router.get('/:group_id/users', groupController.get_users_group);

//get threads by group
router.get('/:group_id/threads', groupController.get_threads_from_group);

//post new group (required body: group_id, group_description, user_id)
router.post('/create', groupController.create_new_group);

//post new user into group (required body: group_id, user_id)
router.post('/join', groupController.join_group);

//leave group (required body: group_id, user_id)
router.delete('/leave', groupController.leave_group);

//delete group (Required body: group_id, user_id)
router.delete('/delete', groupController.delete_group);

//update group name (Required body: group_id, user_id, new_name)
router.put('./update-name', groupController.update_name);

//update description (Required body: group_id, user_id, new_description)
router.put('./update-description', groupController.update_description);

module.exports = router;