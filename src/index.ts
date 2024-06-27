import app from './app'
import { PORT } from './config/envs'
import { connectDB } from './database'

async function main (): Promise<void> {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT ?? ''}`)
    })
  } catch (error) {
    console.error(error)
  }
}

void main()
