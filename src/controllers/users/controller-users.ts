import { User } from './../../models/users/model-users'
import {
  HTTP_STATUS_CODES,
  JWT_VALID_TIME
} from '../../utils/constants/constants'
import { Usuario } from './../../interfaces/users/interface-users'
import { validationMongoErrors } from './../../utils/utils'
import { generateAccessToken } from './../../utils/jwt'
import { sendMail } from './../../utils/send-mail'
import { v4 as uuidv4 } from 'uuid'
import * as CryptoJS from 'crypto-js'

export const controllerUserList = async () => {
  try {
    const userList = await User.find().select([
      '-password',
      '-tokenConfirm',
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
    const jwt = await generateAccessToken(
      { email, userName },
      JWT_VALID_TIME.EXPIRE_JWT_CONFIRM_ACCOUNT
    )
    const cript_email = `${uuidv4()}-${CryptoJS.HmacSHA1(email, 'example')}`
    body._id = cript_email
    const infUser = await new User({
      ...body,
      tokenConfirm: jwt
    }).save()

    const { code, name } = HTTP_STATUS_CODES.OK
    const { _id, confirmAccount, personalInformation } = infUser
    const { firstName, lastName, name: personalName } = personalInformation
    sendMail(email, `${personalName} ${lastName} ${firstName}`, cript_email)
    const data = {
      _id,
      confirmAccount,
      email,
      personalInformation,
      userName,
      tokenConfirm: jwt
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

    const user = await User.findByIdAndUpdate(id, body, {
      new: true
    }).select(['-tokenConfirm', '-createdAt', '-updatedAt']) // '-password'

    if (!user) {
      throw new Error('Entrada inválida: usuario no valido')
    }

    const { code, name } = HTTP_STATUS_CODES.OK
    return { code, message: name, data: user }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
