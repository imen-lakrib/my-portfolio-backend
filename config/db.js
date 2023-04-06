const mongoose = require('mongoose');

const connectDb=async()=>{
    try {
        const connect= await mongoose.connect("mongodb+srv://imen:imen@cluster0.q12vs2l.mongodb.net/?retryWrites=true&w=majority")
        console.log("mongodb connected successfully")
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDb