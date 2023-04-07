const Contact = require('../models/contact')

const controller={
    getContacts:async(req,res)=>{
        try {
            const contact = await Contact.find()
            res.status(200).json(contact)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addContact:async(req,res)=>{
        try {
            if(!req.body.email || !req.body.linkedin ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newContact = await Contact.create({
                email: req.body.email,
                linkedin: req.body.linkedin,
                github: req.body.github,
                fullName: req.body.fullName,
                twitter: req.body.twitter,
                job: req.body.job,
                
            })
            res.status(200).json(newContact)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editContact:async(req,res)=>{
        try {
            const currentContact = await Contact.findById(req.params.id)
            currentContact.email= req.body.email
            currentContact.linkedin = req.body.linkedin
            currentContact.github= req.body.github
            currentContact.fullName = req.body.fullName
            currentContact.twitter = req.body.twitter
            currentContact.job = req.body.job
            await currentContact.save()
            res.status(200).json({
                message: `edited contact ${req.params.id}`
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error editing contact" })
        }

    },
    deleteContact:async(req,res)=>{
        try {
            const currentContact = await Contact.findById(req.params.id)
            if (!currentContact) {
                return res.status(404).json({ message: "Contact not found" });
            }
            await Contact.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: `Deleted contact ${req.params.id}`
            });
            // await currentContact.remove()
            // res.status(200).json({
            //     message: `delete currentContact ${req.params.id}`
            // })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller