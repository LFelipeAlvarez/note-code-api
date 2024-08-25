import mongoose from 'mongoose'
import { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } from './config/envs'

export async function connectDB (): Promise<void> {
  try {
    const mongoDbUri = NODE_ENV?.trim() === 'development' ? MONGODB_URI_TEST : MONGODB_URI
    await mongoose.connect(mongoDbUri as string)
    console.log({ mongoDbUri })
    console.log('db conntected')
  } catch (error) {
    console.log(error)
  }
}
