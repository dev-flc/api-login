import { CONTENT_TYPE } from './../../utils/constants/constants'
import {
  controllerUserDelete,
  controllerUserList,
  controllerUserRegister,
  controllerUserUpdate
} from '../../controllers/users/controller-users'
import { Request, Response } from 'express'

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

// Delete user
export const deleteUserDelete = async (
  request: Request,
  response: Response
) => {
  const resp = await controllerUserDelete(request.params.id)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}

// Update user
export const putUserUpdate = async (request: Request, response: Response) => {
  const { params, body } = request
  const resp = await controllerUserUpdate(params.id, body)
  response.set({ 'Content-Type': CONTENT_TYPE.JSON })
  response.status(resp.code).send(resp)
}
