const express = require('express');
const userController = require("../controllers/users.js");

const router = express.Router();

//Get all users
router.get("/", userController.get_users);

//GET get user based on user id
router.get("/:user_id", userController.get_user);

//GET get all comments based on user id
router.get("/:user_id/comments", userController.get_comments_from_user);

//GET get all threads (posts) based on user id
router.post("/:user_id/threads", userController.get_threads_from_user);

//GET get all groups based on user id
router.post("/:user_id/groups", userController.get_groups_from_user);

module.exports = router;