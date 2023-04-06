const mongoose = require('mongoose')

const experianceSchema= mongoose.Schema({
    start:{
        type:Number,
    },
    end:{
        type:Number,
    },
    title:{
        type:String,
    },
    company:{
        type:String,
    },
    description:{
        type:String,
    },
    

})

module.exports= mongoose.model('Experiance', experianceSchema)