const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    timePeriod: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    currentlyWorking: {
        type: Boolean,
        default: false
    },
    technologies: [{
        type: String
    }],
    companyLogo: {
        type: String
    }
}, { timestamps: true })

const experienceModel = mongoose.model('experience', experienceSchema)

module.exports = experienceModel