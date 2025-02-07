import express from 'express'

import authController from '@/controllers/auth'
import { protectedRoute } from '@/middlewares/auth'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', protectedRoute, authController.me)

export default router
