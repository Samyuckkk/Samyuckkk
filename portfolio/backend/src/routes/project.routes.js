const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project.controllers')

router.get('/', projectController.getAllProjects)
router.delete('/delete', projectController.deleteProject)
router.post('/create', projectController.createProject)
router.put('/update', projectController.updateProject)