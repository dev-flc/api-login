export const CONTENT_TYPE = {
  APP_JS: 'application/x-javascript',
  JSON: 'application/json',
  TEXT_JS: 'text/javascript',
  TEXT_X_JS: 'text/x-javascript',
  TEXT_X_JSON: 'text/x-json'
}

export const APPLY_AUTH = {
  OFF: 'OFF',
  ON: 'ON'
}

export const JWT_VALID_TIME = {
  EXPIRE_JWT_CONFIRM_ACCOUNT: '24h',
  EXPIRE_JWT_SESSION: '24h'
}

export const SEND_CODE_STATUS = {
  200: {
    code: 200,
    name: 'Ok'
  },
  400: {
    code: 400,
    name: 'Bad Request'
  },
  401: {
    code: 401,
    name: 'Unauthorized'
  },
  403: {
    code: 403,
    name: 'Forbidden'
  },
  404: {
    code: 404,
    name: 'Not Found'
  },
  422: {
    code: 422,
    name: 'Unprocessable Entity'
  },
  500: {
    code: 500,
    name: 'Internal Server Error'
  }
}
