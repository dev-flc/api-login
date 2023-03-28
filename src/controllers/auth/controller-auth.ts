import { User } from './../../models/users/model-users'
import { DataAuth } from './../../interfaces/auth/interface-ahut'
import { validationMongoErrors } from './../../utils/utils'
import { generateAccessToken } from './../../utils/jwt'
import {
  JWT_VALID_TIME,
  HTTP_STATUS_CODES
} from './../../utils/constants/constants'

export const controllerAuthSignIn = async (body: DataAuth) => {
  try {
    const { email, password } = body
    const user = await User.findOne({ email }).select(['-tokenConfirm'])
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
    user.password = '' // PENDIENTE REVISAR

    const token = await generateAccessToken(
      { ...user },
      JWT_VALID_TIME.EXPIRE_JWT_SESSION
    )
    const { code, name } = HTTP_STATUS_CODES.OK
    const data = { token, user }
    return { code, data, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
