import { Request, Response } from 'express'

import User from '@/models/user'
import catchAsync from '@/utils/catchAsync'

const register = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  res.status(201).json({ success: true, data: newUser })
})

export default { register }
