const express = require('express')

const router = express.Router()

const SkillController = require('../controllers/skillController')
const {protect}  = require('../midleware/authMidleware')


router.get('/', SkillController.getSkills )

router.put('/:id',protect, SkillController.editSkill )

// cpUpload : its a middleware function :  
router.post('/',protect, SkillController.addSkill )
router.delete('/:id',protect, SkillController.deleteSkill )


module.exports = router