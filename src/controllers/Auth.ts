import { Request, Response } from 'express'
import { userSchema } from '../schemas/user'
import { z } from 'zod'
import User from '../models/User'
import { signToken } from '../helpers/token'

class AuthController {
  async Login (req: Request, res: Response): Promise<void> {
    try {
      const { email } = userSchema.pick({ email: true }).parse(req.body)
      const userFound = await User.findOne({ email })
      if (userFound === null) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      const sessionToken = await signToken(userFound)
      res.json({ user: userFound, sessionToken })
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else res.status(400).json({ error })
    }
  }
}

export default new AuthController()
