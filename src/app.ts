import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import codeRouter from './routes/code'
import authRouter from './routes/auth'
import { corsOptions } from './config/cors'

const app = express()

// app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/code', codeRouter)

app.use((_req, res) => {
  res.status(404).send('Sorry cant find that!')
})

export default app
