import mongoose from 'mongoose'
import { MONGODB_URI } from './config/envs'

export async function connectDB (): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI as string)
    console.log('db conntected')
  } catch (error) {
    console.log(error)
  }
}
