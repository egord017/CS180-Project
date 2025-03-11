const express = require('express');
const threadController = require("../controllers/workshopThread.js");
const router = express.Router();


// //Get /threads
router.get("/", threadController.get_threads);

// //GET a specific thread by thread ID
router.get("/:thread_id", threadController.get_thread);

// //GET comments for a thread using thread ID
router.get("/:thread_id/critiques", threadController.get_critiques_from_thread);

// //POST a thread
router.post("/", threadController.create_thread);

// //UPDATE thread
//router.put("/:thread_id", threadController.update_thread);

// //DELETE thread
router.delete("/:thread_id", threadController.delete_thread);


module.exports = router;