import { Request, Response } from 'express'
import {
  controllerAuthSignIn,
  controllerConfirmAccount,
  controllerVerifyAccount
} from './../../controllers/auth/controller-auth'
import { CONTENT_TYPE } from './../../utils/constants/constants'
import { ERROR_VERIFY } from '../../utils/view/error-verify'
import { SUCCESSFUL_VERIFY } from '../../utils/view/successful-verify'
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

// Confirm account
export const getVerifyAccount = async (
  request: Request,
  response: Response
) => {
  const { token } = request.params
  const data = await controllerVerifyAccount(token)
  const { code, message, nameError } = data
  let result

  switch (nameError) {
    case 'DataUnprocessable': {
      result = response.status(code).send(ERROR_VERIFY(message))
      break
    }

    case 'TokenExpiredError': {
      result = response.status(code).send(ERROR_VERIFY(message))
      break
    }

    case 'AccountVerify':
    case 'Ok': {
      result = response.status(code).send(SUCCESSFUL_VERIFY(message))
      break
    }
    default:
  }

  return result
}
