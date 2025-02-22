const express = require('express');
const profileController = require("../controllers/profile.js");

const router = express.Router();

//Get all users user_id for testing
router.get("/", profileController.get_users);

//GET get user based on user id
router.get("/:user_id", profileController.get_user);

//GET get all groups based on user id
router.get("/:user_id/groups", profileController.get_groups_from_user);


//GET get all comments based on user id
// router.get("/:user_id/comments", profileController.get_comments_from_user);

//GET get all threads (posts) based on user id
// router.get("/:user_id/threads", profileController.get_threads_from_user);


module.exports = router;