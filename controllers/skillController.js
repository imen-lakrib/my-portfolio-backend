const Skill = require('../models/skill')

const controller={
    getSkills:async(req,res)=>{
        try {
            const skill = await Skill.find()
            res.status(200).json(skill)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addSkill:async(req,res)=>{
        try {
            if(!req.body.title || !req.body.technologies ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newSkill = await Skill.create({
                title: req.body.title,
                technologies: req.body.technologies,
                
            })
            res.status(200).json(newSkill)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editSkill:async(req,res)=>{
        try {
            const currentSkill = await Skill.findById(req.params.id)
            currentSkill.status= req.body.status
        await currentSkill.save()
        res.status(200).json({
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteSkill:async(req,res)=>{
        try {
            const currentSkill = await Skill.findById(req.params.id)
        
            await currentSkill.remove()
            res.status(200).json({
                message: `delete currentSkill ${req.params.id}`
            })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    }
}

module.exports = controller