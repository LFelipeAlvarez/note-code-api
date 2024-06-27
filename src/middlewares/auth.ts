import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../helpers/token'
import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_CLIENT_ID } from '../config/envs'

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ').pop()
    if (token === undefined) {
      res.status(400).json({ message: 'Authorization header not provided' })
      return
    }
    const tokenData = await verifyToken(token)
    if (tokenData !== null && typeof tokenData === 'object' && 'email' in tokenData) {
      next()
    } else {
      res.status(401).json({ message: 'Not authorized' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkAuthGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)
    const { token } = req.body
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload()
    req.body = { ...payload, googleId: payload?.sub }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
