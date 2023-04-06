const express = require ('express')
const path = require('path');




const connectDb= require('./config/db')


connectDb()
const app = express()


// read the body 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// file name 
app.use(express.static(path.join(__dirname,'public'), {dotfiles: "allow"}))
// routes 
app.use('/admin', require('./routes/admin'))
app.use('/blog', require('./routes/blog'))
app.use('/contact', require('./routes/contact'))
app.use('/education', require('./routes/education'))
app.use('/experiance', require('./routes/experiance'))
app.use('/project', require('./routes/project'))
app.use('/skill', require('./routes/skill'))

app.listen(3000, ()=> console.log(`connect in port 3000`))
