import express from 'express'
import {
  getUserList,
  postUserRegister
} from './../services/users/service-users'
import { postSignIn, getConfirmAccount } from './../services/auth/service-auth'
import { AUTH } from './../middleware/middleware-auth'

const router = express.Router()

router

  // Auth
  .post('/api/auth/sign-in', postSignIn)
  .get('/api/auth/confirm-account/:token', getConfirmAccount)

  // User
  .get('/api/user/list', AUTH, getUserList)
  .post('/api/user/register', postUserRegister)

export { router }
