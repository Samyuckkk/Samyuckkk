const adminModel = require('../models/admin.model')
const jwt = require('jsonwebtoken')

async function authAdminMiddleware(req, res, next){
    try{
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Please authenticate first"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const admin = await adminModel.findById(decoded.id)

        if(!admin){
            return res.status(401).json({
                success: false,
                message: "Admin not found"
            })
        }

        req.admin = admin
        next()
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}

module.exports = {
    authAdminMiddleware
}