import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import errorHandler from '@/controllers/error'
import AppError from '@/entities/appError'
import routes from '@/routes'

import docs from './docs/route'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '10kb' }))

docs(app)

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Hello World!' })
})
app.use('/api', routes)
app.all(/(.*)/, (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

export default app
