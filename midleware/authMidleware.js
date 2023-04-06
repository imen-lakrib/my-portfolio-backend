const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const protect = async(req, res, next) =>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get Token From Header:
            token = req.headers.authorization.split(' ')[1]
            // Verify The Token :
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get User From The Token :
            req.user = await Admin.findById(decoded.id).select('-password')

            next()

        }
        catch(err){
            console.log(err)
            res.status(401).json({message: 'not authorized'})

        }
    }
    if (!token){
        res.status(401).json({message: 'not authorized, no token'})

    }

}

module.exports  = {protect}