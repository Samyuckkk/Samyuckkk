const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', projectController.getAllProjects)
router.delete('/delete/:id', authMiddleware.authAdminMiddleware, projectController.deleteProject)
router.post('/create', authMiddleware.authAdminMiddleware, projectController.createProject)
router.put('/update/:id', authMiddleware.authAdminMiddleware, projectController.updateProject)

module.exports = router