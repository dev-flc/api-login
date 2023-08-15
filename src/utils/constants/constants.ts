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

export const HTTP_STATUS_CODES = {
  BAD_REQUEST: { code: 400, name: 'Bad Request' },
  CONFLICT: { code: 409, name: 'Conflict' },
  FORBIDDEN: { code: 403, name: 'Forbidden' },
  INTERNAL_SERVER_ERROR: { code: 500, name: 'Internal Server Error' },
  NOT_FOUNT: { code: 404, name: 'Not Found' },
  OK: { code: 200, name: 'Ok' },
  UNAUTHORIZED: { code: 401, name: 'Unauthorized' },
  UNPROCESSABLE_ENTITY: { code: 422, name: 'Unprocessable Entity' }
}
