import { z } from 'zod'

export const userSchema = z.object({
  googleId: z.string().min(1),
  email: z.string().min(1),
  name: z.string().min(1),
  picture: z.string().min(1)
})
