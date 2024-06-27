/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import User from '../controllers/User'
import { checkAuthGoogle } from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/', checkAuthGoogle, User.Create)

export default userRouter
