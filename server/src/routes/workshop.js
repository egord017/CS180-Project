const express = require('express');
const workshopController = require("../controllers/workshop.js");

const router = express.Router();

router.get("/:workshop_id/threads", workshopController.get_threads_from_workshop);
router.get("/:workshop_id", workshopController.get_workshop);
router.post("/", workshopController.post_workshop);
router.put("/:workshop_id", workshopController.edit_workshop);
router.delete("/:workshop_id", workshopController.delete_workshop);


module.exports = router;    