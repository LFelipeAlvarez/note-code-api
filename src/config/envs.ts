import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const CLIENT_URL = process.env.CLIENT_URL
export const NODE_ENV = process.env.NODE_ENV
