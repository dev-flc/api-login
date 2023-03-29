import { User } from './../../models/users/model-users'
import {
  HTTP_STATUS_CODES,
  JWT_VALID_TIME
} from '../../utils/constants/constants'
import { Usuario } from './../../interfaces/users/interface-users'
import { validationMongoErrors, encode64 } from './../../utils/utils'
import { generateAccessToken } from './../../utils/jwt'

export const controllerUserList = async () => {
  try {
    const userList = await User.find().select([
      '-password',
      //'-tokenConfirm',
      '-createdAt',
      '-updatedAt'
    ])
    const data = userList.reduce(
      (obj, usuario: Usuario) => ({ ...obj, [usuario._id]: usuario }),
      {}
    )
    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, data, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserRegister = async (body: Usuario) => {
  try {
    const { email, userName } = body
    const token = await generateAccessToken(
      { email, userName },
      JWT_VALID_TIME.EXPIRE_JWT_CONFIRM_ACCOUNT
    )
    const encodedToken = encode64(token)
    const infUser = await new User({
      ...body,
      tokenConfirm: encodedToken
    }).save()
    //sendMail(email, userName)// pendiente enviar correo
    const { code, name } = HTTP_STATUS_CODES.OK
    const { _id, confirmAccount, personalInformation } = infUser
    const data = {
      _id,
      confirmAccount,
      email,
      personalInformation,
      userName,
      tokenConfirm: encodedToken
    }
    return { code, data, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserDelete = async (id: string) => {
  try {
    if (!id) {
      throw new Error('Entrada inválida: id debe ser una cadena no vacía')
    }
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      throw new Error('Entrada inválida: usuario no valido')
    }
    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserUpdate = async (id: string, body: Usuario) => {
  try {
    if (!id) {
      throw new Error('Entrada inválida: id debe ser una cadena no vacía')
    }
    const dataUpdateUser = await User.findByIdAndUpdate(id, body, {
      new: true
    }).select(['-password', '-tokenConfirm', '-createdAt', '-updatedAt'])
    if (!dataUpdateUser) {
      throw new Error('Entrada inválida: usuario no valido')
    }
    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, message: name, data: dataUpdateUser }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
