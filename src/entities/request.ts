import { Request } from 'express'

import { IUser } from '@/models/user'

interface IRequest extends Request {
  user?: IUser
}

export default IRequest
