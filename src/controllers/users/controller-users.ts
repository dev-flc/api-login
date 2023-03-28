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
    const data = { _id, confirmAccount, email, personalInformation, userName }
    return { code, data, message: name }
  } catch (error) {
    return validationMongoErrors(error)
  }
}
