const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers')

router.post('/admin/register', authController.registerAdmin)
router.post('/admin/login', authController.loginAdmin)

module.exports = router