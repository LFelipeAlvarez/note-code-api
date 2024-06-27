import { z } from 'zod'
import { codeSchema } from './schemas/code'
import { userSchema } from './schemas/user'

export type CodeSchema = z.infer<typeof codeSchema>
export type User = z.infer<typeof userSchema>
