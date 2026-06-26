const experienceModel = require('../models/experience.model')

async function createExperience(req, res){
    try{
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
    
        const experience = await experienceModel.create({
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
        })

        res.status(201).json({
            success: true,
            message: "Experience added successfully",
            experience
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function updateExperience(req, res){
    try {
        const {id} = req.params

        const updatedExperience = await experienceModel.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        )

        if(!updatedExperience){
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            experience: updatedExperience
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function deleteExperience(req, res){
    try{
        const {id} = req.params

        const deletedExperience =  await experienceModel.findByIdAndDelete(id)

        if(!deletedExperience){
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function getAllExperience(req, res){
    try {
        const allExperiences = await experienceModel.find().sort({createdAt : -1})

        res.status(200).json({
            success: true,
            message: "All experiences fetched",
            allExperiences
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createExperience,
    updateExperience,
    deleteExperience,
    getAllExperience
}