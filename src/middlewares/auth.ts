import { NextFunction, Response } from 'express'

import AppError from '@/entities/appError'
import IRequest from '@/entities/request'
import User from '@/models/user'
import catchAsync from '@/utils/catchAsync'
import { verifyToken } from '@/utils/jwt'

export const protectedRoute = catchAsync(
  async (req: IRequest, _: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || ''

    if (!token) {
      return next(new AppError('You are not logged in! Please log in', 401))
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded?.id)

    if (!user) {
      return next(
        new AppError('The user belonging to this token no longer exists', 401),
      )
    }

    req.user = user
    next()
  },
)
