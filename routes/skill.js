const express = require('express')

const router = express.Router()

const SkillController = require('../controllers/skillController')


router.get('/', SkillController.getSkills )

router.put('/:id', SkillController.editSkill )

// cpUpload : its a middleware function :  
router.post('/', SkillController.addSkill )
router.delete('/:id', SkillController.deleteSkill )


module.exports = router