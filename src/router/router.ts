import express from 'express'
import {
  getUserList,
  postUserRegister
} from './../services/users/service-users'
import { postSignIn } from './../services/auth/service-auth'

const router = express.Router()

router

  // Auth
  .post('/api/auth/sign-in', postSignIn)

  // User
  .get('/api/user/list', getUserList)
  .post('/api/user/register', postUserRegister)

export { router }
