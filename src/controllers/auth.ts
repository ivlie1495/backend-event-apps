import { NextFunction, Request, Response } from 'express'

import AppError from '@/entities/appError'
import IRequest from '@/entities/request'
import User from '@/models/user'
import catchAsync from '@/utils/catchAsync'
import encryption from '@/utils/encryption'
import { generateToken } from '@/utils/jwt'

const register = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  res
    .status(201)
    .json({ success: true, message: 'User created', data: newUser })
})

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || user.password !== encryption(password)) {
      return next(new AppError('Incorrect email or password', 401))
    }

    const token = generateToken(user.id)

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: { token },
    })
  },
)

const me = catchAsync(async (req: IRequest, res: Response) => {
  res.status(200).json({ success: true, message: 'User found', data: req.user })
})

export default { register, login, me }
