import { HTTP_STATUS_CODES } from './constants/constants'

export const validationMongoErrors = (error: any) => {
  const result = {
    code: HTTP_STATUS_CODES.BAD_REQUEST.code,
    message: HTTP_STATUS_CODES.BAD_REQUEST.name,
    nameError: HTTP_STATUS_CODES.BAD_REQUEST.name
  }

  switch (error.name) {
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
