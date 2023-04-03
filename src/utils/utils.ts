import { HTTP_STATUS_CODES } from './constants/constants'

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
    code: HTTP_STATUS_CODES.BAD_REQUEST.code,
    message: HTTP_STATUS_CODES.BAD_REQUEST.name,
    nameError: HTTP_STATUS_CODES.BAD_REQUEST.name
  }

  switch (error.name) {
    case 'ValidationError': {
      const message = getKeyErrors(error)
      result.message = message[message.key]
      result.code = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.code
      result.nameError = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.name
      break
    }
    case 'MongoServerError': {
      if (error.code === 11000) {
        const entries = Object.entries(error.keyValue)
        const valores = entries
          .map(([clave, valor]) => `${clave}:${valor}`)
          .join(', ')
        result.message = `El dato ${valores}, ya existe`
        result.code = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.code
        result.nameError = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.name
      }
      break
    }
    case 'CastError':
    case 'Error': {
      result.message = error.message
      result.code = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.code
      result.nameError = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY.name
      break
    }
    case 'TokenExpiredError': {
      result.message = 'Datos de confirmación expirados'
      result.code = HTTP_STATUS_CODES.UNAUTHORIZED.code
      result.nameError = error.name
      break
    }
    case 'Custom': {
      result.message = error.message
      result.code = error.code
      result.nameError = error.nameError
      break
    }
    default:
      result.message = HTTP_STATUS_CODES.CONFLICT.name
      result.code = HTTP_STATUS_CODES.CONFLICT.code
      result.nameError = HTTP_STATUS_CODES.CONFLICT.name
  }

  return result
}
