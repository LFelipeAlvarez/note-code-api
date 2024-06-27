import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
