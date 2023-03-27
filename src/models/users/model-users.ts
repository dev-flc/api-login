import { model, Schema } from 'mongoose'
import { Usuario } from 'src/interfaces/users/interface-users'

const schemeUser = new Schema<Usuario>(
  {
    confirmAccount: {
      default: false,
      type: Boolean
    },
    email: {
      index: { unique: true },
      lowercase: true,
      trim: true,
      type: String,
      unique: true
    },
    password: {
      trim: true,
      type: String
    },
    personalInformation: {
      firstName: {
        lowercase: true,
        trim: true,
        type: String
      },
      lastName: {
        lowercase: true,
        trim: true,
        type: String
      },
      name: {
        lowercase: true,
        trim: true,
        type: String
      }
    },
    tokenConfirm: {
      default: null,
      trim: true,
      type: String
    },
    userName: {
      index: { unique: true },
      lowercase: true,
      trim: true,
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const User = model<Usuario>('users', schemeUser)
export { User }
