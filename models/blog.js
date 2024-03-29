const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
    },

    description: {
        type: String,
    },
    imen: {
        type: String,

    },
    technologies: {
        type: String
    },
    author: {
        type: String
    },



}, {
    timestamps: {
        createdAt: "dateInscription"
    }
})

module.exports = mongoose.model('Blog', blogSchema)