import express from 'express'
import { getUserList } from '../services/users/service-users'

const router = express.Router()

router
  // User
  .get('/api/user/list', getUserList)

export { router }
