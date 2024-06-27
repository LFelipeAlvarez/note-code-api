/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import Auth from '../controllers/Auth'

const authRouter = Router()

authRouter.post('/login', Auth.Login)

export default authRouter
