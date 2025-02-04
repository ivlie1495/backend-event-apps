import express from 'express'

import authRoutes from '@/routes/auth'

const router = express.Router()

router.use('/v1/auth', authRoutes)

export default router
