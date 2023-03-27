import { controllerUserList } from '../../controllers/users/controller-users'
import { Request, Response } from 'express'

// List users
export const getUserList = async (request: Request, response: Response) => {
  const resp = await controllerUserList()
  response.set({ 'Content-Type': 'application/json' })
  response.status(resp.code).send(resp)
}
