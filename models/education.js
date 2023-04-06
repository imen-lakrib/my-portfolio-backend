const mongoose = require('mongoose')

const educationSchema= mongoose.Schema({
    start:{
        type:Number,
    },
    end:{
        type:Number,
    },
    title:{
        type:String,
    },
    university:{
        type:String,
    },
    description:{
        type:String,
    },
    

})

module.exports= mongoose.model('Education', educationSchema)