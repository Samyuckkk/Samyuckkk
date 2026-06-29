const mailService = require('../services/mail.service')

async function contactMe(req, res){
    try {
        const {
            name,
            email,
            phone,
            message
        } = req.body

        if(!name || !message){
            return res.status(400).json({
                success: false,
                message: "Name and Message is required!"
            })
        }

        if(!email && !phone){
            return res.status(400).json({
                success: false,
                message: "Email or Phone No. is required."
            })
        }

        await mailService.sendContactMail({
            name,
            email,
            phone,
            message
        })

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    contactMe
}