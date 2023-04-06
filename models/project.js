const mongoose = require('mongoose')

const projectSchema= mongoose.Schema({
    title:{
        type:String,
    },
    
    description:{
        type:String,
    },
    link:{
        type:String,
    },
    image:{
        type:String,

    },
    technologies:{
        type: String
    }
   

})

module.exports= mongoose.model('Project', projectSchema)