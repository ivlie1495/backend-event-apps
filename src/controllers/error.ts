import { ErrorRequestHandler, Response } from 'express'
import { Error } from 'mongoose'

import AppError from '@/utils/appError'

const jwtError = new AppError('Invalid token. Please log in again', 401)
const jwtExpiredError = new AppError('Token expired. Please log in again', 401)

const handleCastError = (error: Error.CastError) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400)
}

const handleDuplicateFields = (keyValue: object) => {
  const keys = Object.keys(keyValue)
  return new AppError(`Duplicate value: ${keys.join(',')}`, 400)
}

const handleValidationError = (error: Error.ValidationError) => {
  const errors = Object.values(error.errors)
    .map((e) => e.message)
    .join(' ')

  return new AppError(`Invalid input data: ${errors}`, 400)
}

const sendErrorDev = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  })
}

const sendErrorProduction = (res: Response, error: AppError) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  })
}

const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  error.statusCode = error.statusCode || 500

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(res, error)
  }

  let errorObj = error
  console.log('ERROR 💥', errorObj)
  if (error.name === 'CastError') errorObj = handleCastError(error)
  if (error.code === 11000) errorObj = handleDuplicateFields(error.keyValue)
  if (error.name === 'ValidationError') errorObj = handleValidationError(error)
  if (error.name === 'JsonWebTokenError') errorObj = jwtError
  if (error.name === 'TokenExpiredError') errorObj = jwtExpiredError

  console.error('ERROR 💥', error)
  sendErrorProduction(res, errorObj)
}

export default errorHandler
