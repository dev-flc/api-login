import { User } from './../../models/users/model-users'
import { SEND_CODE_STATUS } from '../../utils/constants/constants'
import { Usuario } from './../../interfaces/users/interface-users'

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
      return error //pendiente
    })
}
