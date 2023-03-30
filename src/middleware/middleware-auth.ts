import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS_CODES, APPLY_AUTH } from './../utils/constants/constants'
import { verifyAccessToken } from './../utils/jwt'
import { CONTENT_TYPE } from './../utils/constants/constants'

export const AUTH = (req: Request, response: Response, next: NextFunction) => {
  if (process.env.APPLY_AUTH === APPLY_AUTH.ON) {
    const tokenHeader: string | undefined =
      req.body.token || req.query.token || req.headers.authorization
    const token: string | undefined = tokenHeader && tokenHeader.split(' ')[1]

    if (!token) {
      const { code, name } = HTTP_STATUS_CODES.FORBIDDEN
      response.set({ 'Content-Type': CONTENT_TYPE.JSON })
      return response.status(code).send({
        code,
        message: 'Entrada inválida: token debe ser una cadena no vacía',
        nameError: name
      })
    }

    try {
      verifyAccessToken(token)
    } catch (err) {
      const { code, name } = HTTP_STATUS_CODES.UNAUTHORIZED
      response.set({ 'Content-Type': CONTENT_TYPE.JSON })
      return response.status(code).send({
        code,
        message: 'Entrada inválida: token no autorizado',
        nameError: name
      })
    }
  }
  return next()
}
