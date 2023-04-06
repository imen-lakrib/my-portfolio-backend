const mongoose = require('mongoose')

const contacSchema= mongoose.Schema({
    email:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
    fullName:{
        type:String,
    },
    twitter:{
        type:String,
    },
    job:{
        type:String,
    },


})

module.exports= mongoose.model('Contact', contacSchema)