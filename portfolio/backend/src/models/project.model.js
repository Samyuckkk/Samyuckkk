const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    date: {
        type: Date
    },
    githubLink:{
        type: String
    },
    deploymentLink:{
        type: String
    },
    screenshots:[{
        type: String
    }],
    technologies: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true} )

const projectModel = mongoose.model('project', projectSchema)

module.exports = projectModel