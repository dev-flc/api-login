import { model, Schema } from 'mongoose'
import { Usuario } from './../../interfaces/users/interface-users'
import bcrypt from 'bcrypt'

const schemeUser = new Schema<Usuario>(
  {
    _id: {
      type: String
    },
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

schemeUser.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(this.password, salt)
  this.password = passwordHash
  next()
})

schemeUser.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate() as { password: string }
  if (user.password) {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(user.password, salt)
    user.password = passwordHash
    this.setUpdate({
      $set: { ...user, confirmpw: undefined }
    })
  }
  next()
})

schemeUser.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = model<Usuario>('users', schemeUser)

export { User }
