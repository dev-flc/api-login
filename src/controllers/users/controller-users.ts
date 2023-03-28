import { User } from './../../models/users/model-users'
import {
  SEND_CODE_STATUS,
  JWT_VALID_TIME
} from '../../utils/constants/constants'
import { Usuario } from './../../interfaces/users/interface-users'
import { validationMongoErrors, encode64 } from './../../utils/utils'
import { generateAccessToken } from './../../utils/jwt'

export const controllerUserList = async () => {
  return await User.find()
    .select(['-password', '-tokenConfirm', '-createdAt', '-updatedAt'])
    .then(dataList => {
      const data = dataList.reduce(
        (obj, usaurio: Usuario) => ({ ...obj, [usaurio._id]: usaurio }),
        {}
      )
      const { code, name } = SEND_CODE_STATUS[200]
      return { code, data, message: name }
    })
    .catch(error => {
      return validationMongoErrors(error)
    })
}

export const controllerUserRegister = async (body: {
  email: string
  userName: string
}) => {
  const { email, userName } = body
  const token = await generateAccessToken(
    { email, userName },
    JWT_VALID_TIME.EXPIRE_JWT_CONFIRM_ACCOUNT
  )
  return await new User({ ...body, tokenConfirm: encode64(token) })
    .save()
    .then((infUser: Usuario) => {
      //sendMail(email, userName)
      const { code, name } = SEND_CODE_STATUS[200]
      const { _id, confirmAccount, email, personalInformation, userName } =
        infUser
      const data = { _id, confirmAccount, email, personalInformation, userName }
      return { code, data, message: name }
    })
    .catch((error: any) => {
      return validationMongoErrors(error)
    })
}
