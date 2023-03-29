import { User } from './../../models/users/model-users'
import { DataAuth } from './../../interfaces/auth/interface-ahut'
import { validationMongoErrors, decode64 } from './../../utils/utils'
import { generateAccessToken, verifyAccessToken } from './../../utils/jwt'
import {
  JWT_VALID_TIME,
  HTTP_STATUS_CODES
} from './../../utils/constants/constants'

import { omit } from 'lodash'

export const controllerAuthSignIn = async (body: DataAuth) => {
  try {
    const { email, password } = body
    const user = await User.findOne({ email }).select([
      '-tokenConfirm',
      '-createdAt',
      '-updatedAt'
    ])
    if (!user) {
      throw new Error('Usuario no registrado')
    }
    if (!user.confirmAccount) {
      throw new Error('La cuenta no esta confirmada')
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      throw new Error('Contraseña incorrecta')
    }
    const token = await generateAccessToken(
      { ...user },
      JWT_VALID_TIME.EXPIRE_JWT_SESSION
    )
    user.password = ''
    const { code, name } = HTTP_STATUS_CODES.OK
    const data = { token, user }
    return { code, data, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerConfirmAccount = async (tokenConfirm: string) => {
  try {
    if (!tokenConfirm || typeof tokenConfirm !== 'string') {
      throw new Error(
        'Entrada inválida: tokenConfirm debe ser una cadena no vacía'
      )
    }
    const user = await User.findOne({ tokenConfirm }).select([
      '-password',
      '-tokenConfirm',
      '-createdAt',
      '-updatedAt'
    ])
    if (!user) {
      throw new Error('Token inválido')
    }
    verifyAccessToken(decode64(tokenConfirm))
    user.confirmAccount = true
    await user.save()

    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, message: name, user }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
