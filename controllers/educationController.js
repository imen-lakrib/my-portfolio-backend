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
            currentEducation.start=req.body.start
            currentEducation.title=req.body.title
            currentEducation.end=req.body.end
            currentEducation.university=req.body.university
            currentEducation.description=req.body.description
        await currentEducation.save()
        res.status(200).json({
            message: `edited education ${req.params.id}`
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteEducation:async(req,res)=>{
        try {
            const currentEducation = await Education.findById(req.params.id)
        
            if (!currentEducation) {
                return res.status(404).json({ message: "education not found" });
            }
            await Education.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: `Deleted Education ${req.params.id}`
            });
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller