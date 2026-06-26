const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

router.get('/', projectController.getAllProjects)
router.delete('/delete/:id', authMiddleware.authAdminMiddleware, projectController.deleteProject)
router.post('/create', authMiddleware.authAdminMiddleware, upload.array("images", 5),projectController.createProject)
router.put('/update/:id', authMiddleware.authAdminMiddleware, upload.array("images", 5), projectController.updateProject)

module.exports = router