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

async function getAdminProfile(req, res){
    try {
        const id = req.admin._id

        const admin = await adminModel.findById(id).select("-password")

        if(!admin){
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }

        res.status(200).json({
            success: true,
            admin
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function updateAdminProfile(req, res){
    try {
        const id = req.admin._id

        const updatedAdmin = await adminModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select("-password")

        if(!updatedAdmin){
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            admin: updatedAdmin
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdminProfile,
    getAdminProfile
}