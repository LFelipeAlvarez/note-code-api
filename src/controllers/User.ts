import { Request, Response } from 'express'
import { userSchema } from '../schemas/user'
import { z } from 'zod'
import User from '../models/User'

class UserController {
  async Create (req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = userSchema.parse(req.body)
      const { googleId } = validatedBody
      const userFound = await User.findOne({ googleId })
      if (userFound !== null) {
        res.status(200).json(userFound)
        return
      }

      const user = new User(validatedBody)
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else res.status(400).json(error)
    }
  }
}

export default new UserController()
