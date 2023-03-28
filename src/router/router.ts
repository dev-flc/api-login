import express from 'express'
import { AUTH } from './../middleware/middleware-auth'
import {
  getUserList,
  postUserRegister,
  deleteUserDelete
} from './../services/users/service-users'
import { postSignIn, getConfirmAccount } from './../services/auth/service-auth'

const router = express.Router()

router

  // Auth
  .post('/api/auth/sign-in', postSignIn)
  .get('/api/auth/confirm-account/:token', getConfirmAccount)

  // User
  .get('/api/user/list', AUTH, getUserList)
  .post('/api/user/register', postUserRegister)
  .delete('/api/user/delete/:id', AUTH, deleteUserDelete)

export { router }
