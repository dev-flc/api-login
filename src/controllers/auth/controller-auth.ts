import { User } from './../../models/users/model-users'
import { DataAuth } from './../../interfaces/auth/interface-ahut'
import { validationMongoErrors } from './../../utils/utils'
import { generateAccessTokenAuth, verifyAccessToken } from './../../utils/jwt'
import { HTTP_STATUS_CODES } from './../../utils/constants/constants'

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
      throw new Error('La cuenta no esta verificada')
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    const { personalInformation, userName, _id } = user

    const token = await generateAccessTokenAuth({
      email,
      userName,
      _id,
      personalInformation
    })

    const { code } = HTTP_STATUS_CODES.OK
    const data = { token }
    return { code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerConfirmAccount = async (idUser: string) => {
  try {
    const user = await User.findById(idUser).select([
      '-password',
      '-createdAt',
      '-updatedAt'
    ])
    if (!user) {
      throw {
        message: 'Datos de confirmación no validos',
        name: 'Custom',
        nameError: 'DataUnprocessable',
        code: HTTP_STATUS_CODES.CONFLICT.code
      }
    }

    if (user.confirmAccount) {
      throw {
        message: 'Cuenta ya confirmada',
        name: 'Custom',
        nameError: 'AccountVerify',
        code: HTTP_STATUS_CODES.OK.code
      }
    }

    await verifyAccessToken(user.tokenConfirm || '')

    user.confirmAccount = true
    user.tokenConfirm = null

    await user.save()

    const { code } = HTTP_STATUS_CODES.OK
    return { code }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerVerifyAccount = async (idUser: string) => {
  try {
    const user = await User.findById(idUser)

    if (!user) {
      throw {
        message: 'Datos de confirmación no validos',
        name: 'Custom',
        nameError: 'DataUnprocessable',
        code: HTTP_STATUS_CODES.CONFLICT.code
      }
    }

    if (user.confirmAccount) {
      throw {
        message: 'Cuenta ya confirmada',
        name: 'Custom',
        nameError: 'AccountVerify',
        code: HTTP_STATUS_CODES.OK.code
      }
    }

    await verifyAccessToken(user.tokenConfirm || '')

    user.confirmAccount = true
    user.tokenConfirm = null

    await user.save()
    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, message: 'Cuenta verificada correctamente', nameError: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
