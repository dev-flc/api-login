import { Document } from 'mongoose'

export interface Usuario extends Document {
  confirmAccount: boolean
  email: string
  personalInformation: PersonalInformation
  tokenConfirm: string | null
  userName: string
  _id: string
  comparePassword(candidatePassword: string): boolean
  password: string
}

interface PersonalInformation {
  firstName: string
  lastName: string
  name: string
}
