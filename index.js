const express = require ('express')
const path = require('path');
const dotenv = require('dotenv').config()
const Port = process.env.PORT || 5000 
const nodemailer = require('nodemailer');
const cors = require('cors');


const connectDb= require('./config/db')


connectDb()
const app = express()


// read the body 
app.use(express.json())
app.use(express.urlencoded({extended:false}))




app.use(cors());
// file name 

app.use(express.static(path.join(__dirname,'public'), {dotfiles: "allow"}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// routes 
app.use('/secretpannel', require('./routes/admin'))
app.use('/blog', require('./routes/blog'))
app.use('/contact', require('./routes/contact'))
app.use('/education', require('./routes/education'))
app.use('/experiance', require('./routes/experiance'))
app.use('/project', require('./routes/project'))
app.use('/skill', require('./routes/skill'))



app.listen(Port, ()=> console.log(`connect in port ${Port}`))
