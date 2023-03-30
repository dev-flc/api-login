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
  EXPIRE_JWT_CONFIRM_ACCOUNT: '2m',
  EXPIRE_JWT_SESSION: '24h'
}

export const HTTP_STATUS_CODES = {
  OK: { code: 200, name: 'ok' },
  BAD_REQUEST: { code: 400, name: 'Bad Request' },
  UNAUTHORIZED: { code: 401, name: 'Unauthorized' },
  FORBIDDEN: { code: 403, name: 'Forbidden' },
  NOT_FOUNT: { code: 404, name: 'Not Found' },
  UNPROCESSABLE_ENTITY: { code: 422, name: 'Unprocessable Entity' },
  INTERNAL_SERVER_ERROR: { code: 500, name: 'Internal Server Error' },
  CONFLICT: { code: 409, name: 'Conflict' }
}
