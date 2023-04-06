const Experiance = require('../models/experiance')

const controller={
    getExperiances:async(req,res)=>{
        try {
            const experiance = await Experiance.find()
            res.status(200).json(experiance)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addExperiance:async(req,res)=>{
        try {
            if(!req.body.title || !req.body.description ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newExperiance = await Experiance.create({
                start: req.body.start,
                end: req.body.end,
                title: req.body.title,
                company: req.body.company,
                description: req.body.description,
                
            })
            res.status(200).json(newExperiance)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editExperiance:async(req,res)=>{
        try {
            const currentExperiance = await Experiance.findById(req.params.id)
            currentExperiance.status= req.body.status
        await currentExperiance.save()
        res.status(200).json({
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteExperiance:async(req,res)=>{
        try {
            const currentExperiance = await Experiance.findById(req.params.id)
        
            await currentExperiance.remove()
            res.status(200).json({
                message: `delete currentExperiance ${req.params.id}`
            })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller