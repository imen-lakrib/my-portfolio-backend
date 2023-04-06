const express = require ('express')

const connectDb= require('./config/db')

connectDb()
const app = express()

app.listen(3000, ()=> console.log(`connect in port 3000`))
