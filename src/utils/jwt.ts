import jwt from 'jsonwebtoken'
import { UsuarioJWT } from './../interfaces/users/interface-users'
import { DataAuthUser } from './../interfaces/auth/interface-ahut'

export const verifyAccessToken = async (token: string) => {
  jwt.verify(token, process.env.JWT_SECRET || '')
}

export const generateAccessTokenAuth = async (data: UsuarioJWT) => {
  return jwt.sign(data, process.env.JWT_SECRET || '', {
    expiresIn: process.env.EXPIRE_JWT_SESSION
  })
}

export const generateAccessTokenRegister = async (data: DataAuthUser) => {
  const { email, userName } = data
  return jwt.sign({ email, userName }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.EXPIRE_JWT_CONFIRM_ACCOUNT
  })
}
