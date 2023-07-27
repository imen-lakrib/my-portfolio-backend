const Project = require('../models/project')
const fs = require('fs')


const controller={
    getProjects:async(req,res)=>{
        try {
            const projects = await Project.find().sort({ _id: -1 })
            res.status(200).json(projects)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addProject:async(req,res)=>{
        try {
            if(!req.body.title || !req.body.description ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newProject = await Project.create({
                link: req.body.link,
                image: req.file?.filename,
                title: req.body.title,
                technologies: req.body.technologies,
                description: req.body.description,
                
            })
            res.status(200).json(newProject)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editProject:async(req,res)=>{
        try {
            const currentProject = await Project.findById(req.params.id)
            currentProject.title=req.body.title
            currentProject.description=req.body.description
            currentProject.technologies=req.body.technologies
            currentProject.link=req.body.link
          
        await currentProject.save()
        res.status(200).json({
            message: `edited blog ${req.params.id}`
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteProject:async(req,res)=>{
        try {
            const currentProject = await Project.findById(req.params.id)
            if (!currentProject) {
                return res.status(404).json({ message: "project not found" });
            }
            if(currentProject.image)
            fs.unlinkSync( __dirname +"/../public/uploads/"+ currentProject.image )
        
            await Project.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: `Deleted project ${req.params.id}`
            });
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    editImageProject : async(req, res)=>{
        try {
            console.log(req.file);
            const project = await Project.findById(req.params.id);
            if (project.image) {
              const imagePath = __dirname + '/../public/uploads/' + project.image;
              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
              }
            }
            project.image = req.file.filename;
            await project.save();
            res.status(200).json({});
          } catch (err) {
            console.log(err);
          }
        
    }
}

module.exports = controller