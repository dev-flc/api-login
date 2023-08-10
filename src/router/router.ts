import express from 'express'
import { AUTH } from './../middleware/middleware-auth'
import {
  getUserList,
  postUserRegister,
  deleteUserDelete,
  putUserUpdate
} from './../services/users/service-users'
import {
  postSignIn,
  getConfirmAccount,
  getVerifyAccount
  //getVerifyAccountExample
} from './../services/auth/service-auth'
const router = express.Router()

router
  // Auth
  .post('/api/auth/sign-in', postSignIn)
  .get('/api/auth/confirm-account/:token', getConfirmAccount)
  .get('/api/auth/verify-account/:token', getVerifyAccount)

  // User
  .get('/api/user/list', AUTH, getUserList)
  .post('/api/user/register', postUserRegister)
  .delete('/api/user/delete/:id', AUTH, deleteUserDelete)
  .put('/api/user/update/:id', AUTH, putUserUpdate)

export { router }
