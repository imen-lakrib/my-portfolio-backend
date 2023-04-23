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
const cpUpload = upload.single('imen')

const router = express.Router()

const BlogController = require('../controllers/blogController')

const {protect}  = require('../midleware/authMidleware')



router.get('/', BlogController.getBlogs )
router.get('/:id', BlogController.getSingleBlog )

router.put('/:id',protect, BlogController.editBlog )

// cpUpload : its a middleware function :  
router.put('/image/:id',[protect,cpUpload], BlogController.editImageBlog )
router.post('/',[protect,cpUpload], BlogController.addBlog )
router.delete('/:id',protect, BlogController.deleteBlog )


module.exports = router