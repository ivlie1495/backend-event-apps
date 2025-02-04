import { Document, model, Schema } from 'mongoose'

import { encryption } from '@/utils/encrypt'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  passwordConfirm?: string
  active: boolean
}

export const userSchema = new Schema<IUser>(
  {
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
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (this: IUser, val: string) {
          return val === this.password
        },
        message: 'Passwords do not match!',
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = encryption(this.password!)
  }
  this.passwordConfirm = undefined

  next()
})

const User = model<IUser>('User', userSchema)

export default User
