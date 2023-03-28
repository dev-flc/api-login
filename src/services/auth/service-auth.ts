import { Request, Response } from 'express'
import {
  controllerAuthSignIn,
  controllerConfirmAccount
} from './../../controllers/auth/controller-auth'
import { CONTENT_TYPE } from './../../utils/constants/constants'

// List users
export const postSignIn = async (request: Request, response: Response) => {
  const resp = await controllerAuthSignIn(request.body)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}

// Confirm account
export const getConfirmAccount = async (
  request: Request,
  response: Response
) => {
  const { token } = request.params
  const resp = await controllerConfirmAccount(token)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}
