const Blog = require('../models/blog')
const fs = require('fs')


const controller={
    getBlogs:async(req,res)=>{
        try {
            const blogs = await Blog.find()
            res.status(200).json(blogs)
            // console.log(`get blogs: ${JSON.stringify(res)}`)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    getSingleBlog: async(req,res)=>{
        try {
            const currentBlog = await Blog.findById(req.params.id)
            
        res.status(200).json(currentBlog)
        console.log(req)
        // console.log(`get single blog: ${JSON.stringify(res)}`)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            res.status(404).json(error)
            
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
                imen: req.file?.filename,
                author: req.user._id,
            })
            // console.log(`add blog: ${JSON.stringify(res)}`)
            res.status(200).json(newBlog)
            
        } catch (error) {
            console.log(error)
            
        }

    },
    editBlog:async(req,res)=>{
        try {
            const currentBlog = await Blog.findById(req.params.id)
            currentBlog.title=req.body.title
            currentBlog.description=req.body.description
            currentBlog.technologies=req.body.technologies
          
        await currentBlog.save()
        res.status(200).json({
            message: `edited blog ${req.params.id}`
        })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error editing blog" })

        }

    },
    deleteBlog:async(req,res)=>{
        try {
            const currentBlog = await Blog.findById(req.params.id)
            if (!currentBlog) {
                return res.status(404).json({ message: "blog not found" });
            }
            if(currentBlog.image)
            fs.unlinkSync( __dirname +"/../public/uploads/"+ currentBlog.imen )
        
            await Blog.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: `Deleted blog ${req.params.id}`
            });
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    // editImageBlog : async(req, res)=>{
    //     try{
    //         console.log(req.file)
    //         const blog = await Blog.findById(req.params.id)
    //         if(blog.image)
    //             // fs.unlinkSync( __dirname +"/../public/uploads/"+ blog.image )
    //             blog.image = req.file.filename
           
    //         await blog.save()
    //         res.status(200).json({
    //         })
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
        
    // }
    editImageBlog: async (req, res) => {
        try {
          console.log(req.file);
          const blog = await Blog.findById(req.params.id);
          if (blog.imen) {
            const imagePath = __dirname + '/../public/uploads/' + blog.imen;
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }
          blog.imen = req.file.filename;
          await blog.save();
          res.status(200).json({});
        } catch (err) {
          console.log(err);
        }
      }
      
      
      
      
}

module.exports = controller