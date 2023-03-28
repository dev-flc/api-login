import { Request, Response } from 'express'
import { controllerAuthSignIn } from './../../controllers/auth/controller-auth'
import { CONTENT_TYPE } from './../../utils/constants/constants'

// List users
export const postSignIn = async (request: Request, response: Response) => {
  const resp = await controllerAuthSignIn(request.body)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}
