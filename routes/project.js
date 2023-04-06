const express = require('express')

// upload images library
const multer  = require('multer')
// upload images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/../public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"." +file.mimetype.split("/")[1])
    }
  })
const upload = multer({ storage : storage })
const cpUpload = upload.single('image')

const router = express.Router()

const ProjectController = require('../controllers/projectController')


router.get('/', ProjectController.getProjects )

router.put('/:id', ProjectController.editProject )

// cpUpload : its a middleware function :  
router.put('/image/:id',[cpUpload], ProjectController.editImageProject )
router.post('/',[cpUpload], ProjectController.addProject )
router.delete('/:id', ProjectController.deleteProject )


module.exports = router