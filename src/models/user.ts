import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  passwordConfirm?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (this: IUser, val: string) {
        return val === this.password
      },
      message: 'Passwords are not the same!',
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const User = model<IUser>('User', userSchema)

export default User
