const projectModel = require('../models/project.model')
const storageService = require('../services/storage.service')
const {v4 : uuid} = require('uuid')

async function createProject(req, res){
    try{
        const {
            title,
            description,
            date,
            githubLink,
            deploymentLink,
            technologies,
            featured
        } = req.body

        let screenshots = []

        if(req.files && req.files.length > 0){
            for(const file of req.files){
                const result = await storageService.uploadFile(
                    file.buffer,
                    uuid(),
                    "Portfolio/Projects"    
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
    
        const project = await projectModel.create({
            title,
            description,
            date,
            githubLink,
            deploymentLink,
            screenshots,
            technologies,
            featured
        })

        res.status(201).json({
            success: true,
            message: "Project created successfully!",
            project
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function updateProject(req, res){
    try{
        const {id} = req.params

        const project = await projectModel.findById(id)

        if(!project){
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }

        let screenshots = project.screenshots

        if(req.files && req.files.length > 0){
            screenshots = []
            
            for(const file of req.files){
                const result = await storageService.uploadFile(
                    file.buffer,
                    uuid(),
                    "Portfolio/Projects"
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

        const updatedProject = await projectModel.findByIdAndUpdate(
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

        if(!updatedProject){
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function deleteProject(req, res){
    try {
        const {id} = req.params

        const deletedProject = await projectModel.findByIdAndDelete(id)

        if(!deletedProject){
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

async function getAllProjects(req, res){
    try {
        const projects = await projectModel.find()

        res.status(200).json({
            success: true,
            projects
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getAllProjects
}