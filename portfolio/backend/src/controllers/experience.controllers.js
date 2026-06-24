const experienceModel = require('../models/experience.model')

async function createExperience(req, res){
    const {
        title,
        company,
        location,
        description,
        timePeriod,
        startDate,
        endDate,
        currentlyWorking,
        technologies,
        companyLogo
    } = req.body

    
}