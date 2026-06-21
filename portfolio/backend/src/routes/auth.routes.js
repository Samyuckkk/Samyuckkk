const express = require('express')
const router = express.router()
const authController = require('../controllers/auth.controllers')

router.post('/admin/register', authController.registerAdmin)
router.post('/admin/login', authController.loginAdmin)