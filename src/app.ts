import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import 'tsconfig-paths/register'

import errorHandler from '@/controllers/error'
import routes from '@/routes/api'
import AppError from '@/entities/appError'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json({ limit: '10kb' }))
app.use('/api', routes)

app.all(/(.*)/, (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

export default app
