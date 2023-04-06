const express = require('express')

const router = express.Router()

const EducationController = require('../controllers/educationController')


router.get('/', EducationController.getEducations )

router.put('/:id', EducationController.editEducation )

// cpUpload : its a middleware function :  
router.post('/', EducationController.addEducation )
router.delete('/:id', EducationController.deleteEducation )


module.exports = router