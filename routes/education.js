const express = require('express')

const router = express.Router()

const EducationController = require('../controllers/educationController')
const {protect}  = require('../midleware/authMidleware')


router.get('/', EducationController.getEducations )

router.put('/:id',protect, EducationController.editEducation )

// cpUpload : its a middleware function :  
router.post('/',protect, EducationController.addEducation )
router.delete('/:id',protect, EducationController.deleteEducation )


module.exports = router