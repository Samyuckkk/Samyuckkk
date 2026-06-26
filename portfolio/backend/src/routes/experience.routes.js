const express = require('express')
const router = express.Router()

const experienceController = require('../controllers/experience.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create', authMiddleware.authAdminMiddleware, experienceController.createExperience)
router.get('/', experienceController.getAllExperience)
router.patch('/update/:id', authMiddleware.authAdminMiddleware, experienceController.updateExperience)
router.delete('/delete/:id', authMiddleware.authAdminMiddleware, experienceController.deleteExperience)

module.exports = router