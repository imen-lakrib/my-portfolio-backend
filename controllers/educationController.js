const Education = require('../models/education')

const controller={
    getEducations:async(req,res)=>{
        try {
            const education = await Education.find()
            res.status(200).json(education)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addEducation:async(req,res)=>{
        try {
            if(!req.body.title || !req.body.description ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newEducation = await Education.create({
                start: req.body.start,
                end: req.body.end,
                title: req.body.title,
                university: req.body.university,
                description: req.body.description,
                
            })
            res.status(200).json(newEducation)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editEducation:async(req,res)=>{
        try {
            const currentEducation = await Education.findById(req.params.id)
            currentEducation.status= req.body.status
        await currentEducation.save()
        res.status(200).json({
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteEducation:async(req,res)=>{
        try {
            const currentEducation = await Education.findById(req.params.id)
        
            await currentEducation.remove()
            res.status(200).json({
                message: `delete currentEducation ${req.params.id}`
            })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller