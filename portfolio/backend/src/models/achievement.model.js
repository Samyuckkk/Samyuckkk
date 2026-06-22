const mongoose = require('mongoose')

const achievementSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    linkedinLink:{
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    screenshots:[{
        type: String
    }]
}, {timestamps: true} )

const achievementModel = mongoose.model('achievement', achievementSchema)

module.exports = achievementModel