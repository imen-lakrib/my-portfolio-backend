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
            currentExperiance.start=req.body.start
            currentExperiance.title=req.body.title
            currentExperiance.end=req.body.end
            currentExperiance.company=req.body.company
            currentExperiance.description=req.body.description
        await currentExperiance.save()
        res.status(200).json({
            message: `edited experiance ${req.params.id}`
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteExperiance:async(req,res)=>{
        try {
            const currentExperiance = await Experiance.findById(req.params.id)
        
    

            if (!currentExperiance) {
                return res.status(404).json({ message: "experiance not found" });
            }
            await Experiance.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: `Deleted experiance ${req.params.id}`
            });
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller