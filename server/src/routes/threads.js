const express = require('express');
const groupController = require("../controllers/threads.js");

const router = express.Router();

//Get /threads
router.get("/", threadController.get_threads);

// GET a specific thread by thread ID
router.get("/:thread_id", threadController.get_thread);

// GET comments for a thread using thread ID
router.get("/:thread_id/comments", threadController.get_comments_from_thread);

module.exports = router;