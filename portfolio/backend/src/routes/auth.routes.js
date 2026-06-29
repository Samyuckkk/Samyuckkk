const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')

// router.post('/admin/register', authController.registerAdmin)
router.post('/admin/login', authController.loginAdmin)

// profile routes
router.get('/admin', authController.getAdminProfile)
router.post(
  "/admin",
  authMiddleware.authAdminMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  authController.updateAdminProfile,
);

module.exports = router