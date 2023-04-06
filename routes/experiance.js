const express = require('express')

const router = express.Router()

const ExperianceController = require('../controllers/experianceController')


router.get('/', ExperianceController.getExperiances )

router.put('/:id', ExperianceController.editExperiance )

// cpUpload : its a middleware function :  
router.post('/', ExperianceController.addExperiance )
router.delete('/:id', ExperianceController.deleteExperiance )


module.exports = router