const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminModel = require('../models/admin.model')

async function registerAdmin(req, res){
    const {email, password} = req.body

    const isAdminAlreadyExists = await adminModel.findOne({email})

    if(isAdminAlreadyExists){
        return res.status(400).json({
            message: "Admin already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await adminModel.create({
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: admin._id
    }, process.env.JWT_SECRET,{
        expiresIn: '24h'
    })

    res.cookie('token', token)
    res.status(201).json({
        message: "Admin registered!",
        admin: {
            id: admin._id,
            email: admin.email
        }
    })
}

async function loginAdmin(req, res){
    const {email, password} = req.body

    const admin = await adminModel.findOne({email})

    if(!admin){
        return res.status(400).json({
            message: "Inavlid email or password"
        })
    }

    const isPassValid = await bcrypt.compare(password, admin.password)

    if(!isPassValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id:admin._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    res.cookie('token', token)
    res.status(201).json({
        message: "Admin logged in succesfully",
        admin: {
            id : admin._id,
            email : admin.email
        }
    })
}

module.exports = {
    registerAdmin,
    loginAdmin
}