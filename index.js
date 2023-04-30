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


// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'dist/')));

// // Catch all routes and return the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/', 'index.html'));
// });

app.use(cors());
// file name 

app.use(express.static(path.join(__dirname,'public'), {dotfiles: "allow"}))
// routes 
app.use('/secretpannel', require('./routes/admin'))
app.use('/blog', require('./routes/blog'))
app.use('/contact', require('./routes/contact'))
app.use('/education', require('./routes/education'))
app.use('/experiance', require('./routes/experiance'))
app.use('/project', require('./routes/project'))
app.use('/skill', require('./routes/skill'))


// email sending contactform:
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email-address@gmail.com',
        pass: 'your-email-password'
      }
    });
    const mailOptions = {
      from: email,
      to: 'your-email-address@gmail.com',
      subject: `New message from ${name}`,
      html: `<p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('error');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('success');
      }
    });
  });

  //

app.listen(Port, ()=> console.log(`connect in port ${Port}`))
