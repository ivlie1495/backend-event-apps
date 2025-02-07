import { connect } from 'mongoose'

import 'tsconfig-paths/register'

import app from './app'

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || ''

async function startServer() {
  try {
    await connect(DATABASE_URL)
    console.log('DB connection successful!')

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`)
    })

    process.on('unhandledRejection', (error: Error) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...')
      console.error(error.name, error.message)
      server.close(() => {
        process.exit(1)
      })
    })

    process.on('uncaughtException', (error: Error) => {
      console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
      console.error(error.name, error.message)
      server.close(() => {
        process.exit(1)
      })
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

startServer()
