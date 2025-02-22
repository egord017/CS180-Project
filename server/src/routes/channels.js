const express = require('express');
const channelController = require("../controllers/channels.js");
const router = express.Router();



//get channel by id
router.get("/:channel_id", channelController.get_channel);

//get threads
router.get('/:channel_id/threads', channelController.get_threads_from_channel);

//add channel (requires body: group_id, name, description)
router.post('/', channelController.post_channel)


//edit channel (requires name, description)
router.put('/:channel_id', channelController.edit_channel);

//delete channel
router.delete('/:channel_id', channelController.delete_channel);



module.exports = router;