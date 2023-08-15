import { AUTH } from './../middleware/middleware-auth'
import express from 'express'
import {
  deleteUserDelete,
  getUserList,
  postUserRegister,
  putUserUpdate
} from './../services/users/service-users'
import { getConfirmAccount, postSignIn } from './../services/auth/service-auth'
const router = express.Router()

router
  // Auth
  .post('/api/auth/sign-in', postSignIn)
  .get('/api/auth/confirm-account/:token', getConfirmAccount)

  // User
  .get('/api/user/list', AUTH, getUserList)
  .post('/api/user/register', postUserRegister)
  .delete('/api/user/delete/:id', AUTH, deleteUserDelete)
  .put('/api/user/update/:id', AUTH, putUserUpdate)

export { router }
