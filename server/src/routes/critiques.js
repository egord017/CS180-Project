const express = require('express');
const critiqueController = require("../controllers/critiques.js");
const router = express.Router();

router.get('/:critique_id', critiqueController.get_critique);
//post
router.post('/', critiqueController.post_critique);

//edit
router.patch('/:critique_id', critiqueController.edit_critique);

//delete
router.delete('/:critique_id', critiqueController.delete_critique);


module.exports = router;