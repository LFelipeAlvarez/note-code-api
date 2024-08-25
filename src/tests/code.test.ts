import supertest from 'supertest'
import app from '../app'
import { connectDB } from '../database'
import mongoose from 'mongoose'
import Code from '../models/Code'
import User from '../models/User'
import { CodeSchema } from '../types'
import { signToken } from '../helpers/token'

const api = supertest(app)

beforeAll(async () => {
  await connectDB()
  await Code.deleteMany({})
  await User.deleteMany({})
})

// beforeEach(async () => {
//   await Code.deleteMany({})
//   await User.deleteMany({})
// })

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Create a NoteCode', () => {
  let sessionToken = ''
  let newUserId = ''

  test('should create an user', async () => {
    const newUser = new User({
      googleId: 'testGoogleId',
      email: 'test@example.com',
      name: 'test user',
      picture: 'test'
    })

    newUserId = newUser._id.toString()
    sessionToken = await signToken(newUser)

    await newUser.save()
  })

  test('should create a NoteCode', async () => {
    const newCode: CodeSchema = {
      owner: newUserId,
      content: {
        html: 'test',
        css: 'test',
        javascript: 'test'
      }
    }
    await api
      .post('/api/code')
      .set('authorization', `Bearer ${sessionToken}`)
      .send(newCode)
      .expect(201)
      .expect('Content-type', /application\/json/)
  })
})
