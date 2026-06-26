const express = require('express')
const router = express.Router()

const achievementController = require('../controllers/achievement.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

router.post('/create', authMiddleware.authAdminMiddleware, upload.array("images", 5), achievementController.createAchievement)
router.patch('/update/:id', authMiddleware.authAdminMiddleware, upload.array("images", 5), achievementController.updateAchievement)
router.delete('/delete/:id', authMiddleware.authAdminMiddleware, achievementController.deleteAchievement)
router.get('/', achievementController.getAllAchievements)

module.exports = router