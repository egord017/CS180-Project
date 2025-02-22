const express = require('express');
const commentController = require("../controllers/comments.js");
const router = express.Router();


//post
router.post('/', commentController.post_comment);
//edit
router.patch('/:comment_id', commentController.edit_comment);
//delete
router.delete('/:comment_id', commentController.delete_comment);


module.exports = router;