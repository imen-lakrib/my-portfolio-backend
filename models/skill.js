const mongoose = require('mongoose')

const skillSchema= mongoose.Schema({
    title:{
        type:String,
    },
    
    technologies:{
        type: String
    }
   

})

module.exports= mongoose.model('Skill', skillSchema)