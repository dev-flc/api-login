import { User } from './../../models/users/model-users'
import { HTTP_STATUS_CODES } from '../../utils/constants/constants'
import { Usuario } from './../../interfaces/users/interface-users'
import { validationMongoErrors } from './../../utils/utils'
import { generateAccessTokenRegister } from './../../utils/jwt'
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

    const { code } = HTTP_STATUS_CODES.OK
    return { code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}

export const controllerUserRegister = async (body: Usuario) => {
  try {
    const { email, userName } = body

    const jwt = await generateAccessTokenRegister({ email, userName })

    const cript_email = `${uuidv4()}-${CryptoJS.HmacSHA1(
      email,
      process.env.CRYPT_JS_SECRET || ''
    )}`

    body._id = cript_email

    const infUser = await new User({
      ...body,
      tokenConfirm: jwt
    }).save()

    const { code } = HTTP_STATUS_CODES.OK
    const { _id, personalInformation } = infUser
    const { firstName, lastName, name: personalName } = personalInformation

    sendMail(email, `${personalName} ${lastName} ${firstName}`, cript_email)

    const data = {
      _id,
      email,
      personalInformation,
      userName
    }

    return { code, data }
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
    const { code } = HTTP_STATUS_CODES.OK
    return { code }
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

    const { code } = HTTP_STATUS_CODES.OK
    const { _id, personalInformation, email, userName } = user
    const data = {
      _id,
      email,
      personalInformation,
      userName
    }

    return { code, data }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
