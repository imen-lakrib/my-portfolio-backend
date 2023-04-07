const express = require('express')


const router = express.Router()

const AdminController = require('../controllers/adminController')
const {protect}  = require('../midleware/authMidleware')


router.get('/me', protect, AdminController.getAdmin )
router.post('/register', AdminController.registerAdmin )
router.post('/login', AdminController.loginAdmin )


module.exports = router