import {
  controllerUserList,
  controllerUserRegister
} from '../../controllers/users/controller-users'
import { Request, Response } from 'express'
import { CONTENT_TYPE } from './../../utils/constants/constants'

// List users
export const getUserList = async (request: Request, response: Response) => {
  const resp = await controllerUserList()
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}

// Register user
export const postUserRegister = async (
  request: Request,
  response: Response
) => {
  const resp = await controllerUserRegister(request.body)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}
