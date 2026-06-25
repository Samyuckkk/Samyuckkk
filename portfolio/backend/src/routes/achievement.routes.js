const express = require('express')
const router = express.Router()

const achievementController = require('../controllers/achievement.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create', authMiddleware.authAdminMiddleware, achievementController.createAchievement)
router.patch('/update/:id', authMiddleware.authAdminMiddleware, achievementController.updateAchievement)
router.delete('/delete/:id', authMiddleware.authAdminMiddleware, achievementController.deleteAchievement)
router.get('/', achievementController.getAllAchievements)

module.exports = router