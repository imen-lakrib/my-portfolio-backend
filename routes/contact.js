const express = require('express')


const router = express.Router()

const ContactController = require('../controllers/contactController')
const {protect}  = require('../midleware/authMidleware')


router.get('/', ContactController.getContacts )

router.put('/:id',protect, ContactController.editContact )

router.post('/',protect, ContactController.addContact)
router.delete('/:id',protect, ContactController.deleteContact )


module.exports = router