import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const noteCodeSchema = z.object({
  html: z.string(),
  css: z.string(),
  javascript: z.string()
})

export const codeSchema = z.object({
  content: noteCodeSchema,
  owner: z.string().refine(isValidObjectId, {
    message: 'String must be a valid objectId'
  })

})

export const firstParamAllowed = z.enum(['_id', 'owner'])
