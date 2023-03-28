import { SEND_CODE_STATUS } from './constants/constants'

export const encode64 = (str: string) => Buffer.from(str).toString('base64')

export const decode64 = (str: string) =>
  Buffer.from(str, 'base64').toString('ascii')

const getKeyErrors = (error: any) => {
  const message: { [key: string]: string } = {}
  Object.keys(error.errors).forEach(key => {
    message[key] = error.errors[key].message
    message.key = key
  })
  return message
}

export const validationMongoErrors = async (error: any) => {
  const result = {
    code: SEND_CODE_STATUS[400].code,
    message: SEND_CODE_STATUS[400].name,
    nameError: SEND_CODE_STATUS[400].name
  }

  if (error.name === 'ValidationError') {
    const message = getKeyErrors(error)
    result.message = message[message.key]
    result.code = SEND_CODE_STATUS[422].code
    result.nameError = SEND_CODE_STATUS[422].name
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    const entries = Object.entries(error.keyValue)
    const valores = entries
      .map(([clave, valor]) => `${clave}: ${valor}`)
      .join(', ')

    result.message = `El dato ${valores}, ya existe`
    result.code = SEND_CODE_STATUS[422].code
    result.nameError = SEND_CODE_STATUS[422].name
  } else if (error.name === 'CastError') {
    result.message = error.message
    result.code = SEND_CODE_STATUS[422].code
    result.nameError = SEND_CODE_STATUS[422].name
  } else if (error.name === 'Error') {
    result.message = error.message
    result.code = SEND_CODE_STATUS[422].code
    result.nameError = SEND_CODE_STATUS[422].name
  } else if (error.name === 'TokenExpiredError') {
    result.message = error.message
    result.code = SEND_CODE_STATUS[401].code
    result.nameError = SEND_CODE_STATUS[401].name
  }

  return result
}
