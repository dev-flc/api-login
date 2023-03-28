import express from 'express'
import { getUserList, postUserRegister } from '../services/users/service-users'

const router = express.Router()

router
  // User
  .get('/api/user/list', getUserList)
  .post('/api/user/register', postUserRegister)

export { router }
