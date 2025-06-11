const express = require('express')
const router = express.Router()
const { register, login, profile, updateProfile } = require('../controllers/authController')
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', register)
router.post('/login', login)
router.get('/profile', verifyToken, profile)
router.put('/profile', verifyToken, updateProfile)

module.exports = router