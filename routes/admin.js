const express = require('express')


const router = express.Router()

const AdminController = require('../controllers/adminController')


router.get('/me', AdminController.getAdmin )
router.post('/secretpannel', AdminController.registerAdmin )
router.post('/login', AdminController.loginAdmin )


module.exports = router