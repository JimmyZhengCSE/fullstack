const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authControllers')

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'https://fullstack-dxuf.onrender.com'
];

router.use(
    cors({
        credentials: true,
        origin: allowedOrigins
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)


module.exports = router
