const express = require('express');
const usersGroupsController = require("../controllers/usersGroups.js");

const router = express.Router();

router.get('/:group_id', usersGroupsController.get_members);
router.get('/:group_id/get-member', usersGroupsController.get_member);
router.post('/:group_id', usersGroupsController.post_member);
router.delete('/group_id', usersGroupsController.post_member);

module.exports = router;    