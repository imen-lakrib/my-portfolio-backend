const express = require('express')


const router = express.Router()

const ContactController = require('../controllers/contactController')


router.get('/', ContactController.getContacts )

router.put('/:id', ContactController.editContact )

router.post('/', ContactController.addContact)
router.delete('/:id', ContactController.deleteContact )


module.exports = router