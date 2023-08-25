import { DataAuthUser } from '../interfaces/auth/interface-auth'
import jwt from 'jsonwebtoken'
import { UsuarioJWT } from './../interfaces/users/interface-users'

export const verifyAccessToken = async (token: string) => {
  return await jwt.verify(token, process.env.JWT_SECRET || '')
}

export const generateAccessTokenAuth = (data: UsuarioJWT) => {
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET || '', {
    expiresIn: process.env.EXPIRE_JWT_SESSION
  })
  const token = jwt.sign(data, process.env.JWT_SECRET || '')

  return { refreshToken, token }
}

export const generateAccessTokenRegister = (data: DataAuthUser) => {
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET || '', {
    expiresIn: process.env.EXPIRE_JWT_CONFIRM_ACCOUNT
  })
  const token = jwt.sign(data, process.env.JWT_SECRET || '')

  return { refreshToken, token }
}
