const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    fullName: String,

    tagline: String,

    about: String,

    profileImage: String,

    resume: String,

    phone: String,

    location: String,

    github: String,

    linkedin: String,

    whatsapp: String,

    leetcode: String,

    codeforces: String,

    gfg: String,

}, {
    timestamps: true
});

const adminModel = mongoose.model('admin', adminSchema)

module.exports = adminModel