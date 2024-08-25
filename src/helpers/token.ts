import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../types'
import { SECRET_JWT_KEY } from '../config/envs'

export const signToken = async (user: User): Promise<string> => {
  return jwt.sign(
    {
      email: user.email,
      name: user.name
    },
    SECRET_JWT_KEY as string,
    {
      expiresIn: '15s'
    }
  )
}

export const verifyToken = async (token: string): Promise<JwtPayload | null | string> => {
  try {
    return jwt.verify(token, SECRET_JWT_KEY as string)
  } catch (error) {
    return null
  }
}
