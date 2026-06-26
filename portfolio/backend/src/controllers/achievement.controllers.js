const achievementModel = require('../models/achievement.model')
const storageService = require('../services/storage.service')
const {v4: uuid} = require('uuid')

async function createAchievement(req, res){
    try{
        const {
            title,
            description,
            linkedinLink,
            featured,
        } = req.body

        let screenshots = []

        if(req.files && req.files.length > 0){
            for(const file of req.files){
                const result = await storageService.uploadFile(
                    file.buffer,
                    uuid(),
                    "Portfolio/Achievements"
                )

                if(!result?.url){
                    return res.status(500).json({
                        success: false,
                        message: "Upload failed",
                    })
                }

                screenshots.push(result.url)
            }
        }
    
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

        const achievement = await achievementModel.findById(id)

        let screenshots = achievement.screenshots

        if(req.files && req.files.length > 0){
            screenshots = []

            for(const file of req.files){
                const result = await storageService.uploadFile(
                    file.buffer,
                    uuid(),
                    "Portfolio/Achievements"
                )

                if(!result?.url){
                    return res.status(500).json({
                        success: false,
                        message: "Upload failed"
                    })
                }

                screenshots.push(result.url)
            }
        }

        const updatedAchievement = await achievementModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
                screenshots
            },
            {
                returnDocument: "after",
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