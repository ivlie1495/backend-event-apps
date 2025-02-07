import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

import { IUser } from '@/models/user'

export const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.SECRET || '', { expiresIn: '1d' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET || '') as IUser
  } catch (error) {
    return null
  }
}
