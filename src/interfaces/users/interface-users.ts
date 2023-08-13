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

export interface interfaceUsers {
  email: string
  personalInformation: PersonalInformation
  userName: string
  _id: string
  tokenConfirm?: string | null
  confirmAccount?: boolean
  password?: string
}
interface PersonalInformation {
  firstName: string
  lastName: string
  name: string
}

export interface UsuarioJWT {
  email: string
  personalInformation: PersonalInformation
  userName: string
  _id: string
}
