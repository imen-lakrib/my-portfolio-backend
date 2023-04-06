const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateJwt= (obj) => {
    return jwt.sign({ ...obj }, process.env.JWT_SECRET, { expiresIn: "30d" })
}


var controller={
    registerAdmin:async(req, res)=>{
        try {
            const {email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ message: 'please add all fields' })
            }
             // check if user exists : 
             const userExists = await Admin.findOne({ email })
             if (userExists) {
                return res.status(400).json({ message: 'user already exists' })
            }
            // Hash password : 
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // create user : 
            const user = await Admin.create({
                email,
                password: hashedPassword,
            })
            res.status(201).json({ message: `you are created a new user: ${email}` })
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
            
        }

    },
    loginAdmin: async (req, res) => {
        try {
            const { email, password } = req.body
            // check for user email : 
            const user = await Admin.findOne({ email })
            // check the password : 
            if (user && await (bcrypt.compare(password, user.password))) {
                res.status(200).json({
                    email: user.email,
                    token: generateJwt(user._id)
                })
            } else res.status(400).json({ message: "invalid credentials" })


        }
        catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    },
    getAdmin: async (req, res) => {
        try {
            const {_id, email}= await Admin.findById(req.user.id)
            res.status(200).json({ message: `welcome Mr: ${email}` })
        }
        catch (err) {
            console.log(err)
            res.sendStatus(400)
        }

    },


}


module.exports = controller