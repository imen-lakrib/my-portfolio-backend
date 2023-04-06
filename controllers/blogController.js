const Blog = require('../models/blog')
const fs = require('fs')


const controller={
    getBlogs:async(req,res)=>{
        try {
            const blogs = await Blog.find()
            res.status(200).json(blogs)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    addBlog:async(req,res)=>{
        try {
            if(!req.body.title || !req.body.description ){
                return res.status(400).json({message:'please add all fields'})
            }
            const newBlog = await Blog.create({
                title: req.body.title,
                description: req.body.description,
                technologies: req.body.technologies,
                images: req.body.iamges,
                author: req.user._id,
            })
            res.status(200).json(newBlog)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editBlog:async(req,res)=>{
        try {
            const currentBlog = await Blog.findById(req.params.id)
            currentBlog.status= req.body.status
        await currentBlog.save()
        res.status(200).json({
        })
            
        } catch (error) {
            console.log(error)
            
        }

    },
    deleteBlog:async(req,res)=>{
        try {
            const currentBlog = await Blog.findById(req.params.id)
            if(currentBlog.image)
            fs.unlinkSync( __dirname +"/../public/uploads/"+ currentBlog.image )
        
            await currentBlog.remove()
            res.status(200).json({
                message: `delete currentBlog ${req.params.id}`
            })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    editImageBlog : async(req, res)=>{
        try{
            console.log(req.file)
            const blog = await Blog.findById(req.params.id)
            if(blog.image)
                fs.unlinkSync( __dirname +"/../public/uploads/"+ blog.image )
                blog.image = req.file.filename
           
            await blog.save()
            res.status(200).json({
            })
        }
        catch(err){
            console.log(err)
        }
        
    }
}

module.exports = controller