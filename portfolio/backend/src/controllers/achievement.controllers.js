const achievementModel = require('../models/achievement.model')

async function createAchievement(req, res){
    try{
        const {
            title,
            description,
            linkedinLink,
            featured,
            screenshots
        } = req.body
    
        const achievement = await achievementModel.create({
            title,
            description,
            linkedinLink,
            featured,
            screenshots
        })

        res.status(201).json({
            success: true,
            message: "Achievement added successfully!",
            achievement
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function updateAchievement(req, res){
    try{
        const {id} = req.params

        const updatedAchievement = await achievementModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updatedAchievement){
            return res.status(404).json({
                success: false,
                message: "Achievement not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Achievement updated successfully",
            achievement: updatedAchievement
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function deleteAchievement(req, res){
    try{
        const {id} = req.params

        const deletedAchievement = await achievementModel.findByIdAndDelete(id)

        if(!deletedAchievement){
            return res.status(404).json({
                success: false,
                message: "Achievement not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Achievement deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function getAllAchievements(req, res){
    try {
        const achievements = await achievementModel.find().sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            achievements
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createAchievement,
    updateAchievement,
    deleteAchievement,
    getAllAchievements
}