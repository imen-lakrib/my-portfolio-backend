const express = require('express')

const router = express.Router()

const ExperianceController = require('../controllers/experianceController')
const {protect}  = require('../midleware/authMidleware')


router.get('/', ExperianceController.getExperiances )

router.put('/:id',protect, ExperianceController.editExperiance )

// cpUpload : its a middleware function :  
router.post('/',protect, ExperianceController.addExperiance )
router.delete('/:id',protect, ExperianceController.deleteExperiance )


module.exports = router