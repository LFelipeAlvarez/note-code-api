/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import Code from '../controllers/Code'
import { checkAuth } from '../middlewares/auth'

const codeRouter = Router()

codeRouter
  .use(checkAuth)
  .get('/', Code.GetNoteCode)
  .post('/', Code.Create)
  .put('/:id', Code.Update)

export default codeRouter
