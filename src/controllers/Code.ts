import { Request, Response } from 'express'
import { codeSchema, firstParamAllowed, noteCodeSchema } from '../schemas/code'
import { z } from 'zod'
import Code from '../models/Code'
import User from '../models/User'
import { MongooseError } from 'mongoose'

class CodeController {
  async GetNoteCode (req: Request, res: Response): Promise<void> {
    try {
      const firstParam = Object.keys(req.query)[0]
      const firstValidatedParam = firstParamAllowed.parse(firstParam)
      const value = req.query[firstValidatedParam]
      const codeFound = await Code.findOne({ [firstValidatedParam]: value })
      if (codeFound === null) {
        res.status(404).json({ message: 'NoteCode not found' })
        return
      }
      res.json(codeFound)
    } catch (error) {
      const statusError = (error instanceof MongooseError || error instanceof z.ZodError) ? 400 : 500
      console.log(error)
      res.status(statusError).json({ error })
    }
  }

  async Create (req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = codeSchema.parse(req.body)
      const { owner } = validatedBody
      const userFound = await User.findOne({ _id: owner })
      const codeFound = await Code.findOne({ owner })
      if (userFound === null) {
        res.status(404).json({ message: 'Owner not found' })
        return
      }

      if (codeFound !== null) {
        res.status(400).json({ message: `The owner with id: ${owner} already has a NoteCode created` })
        return
      }

      const code = new Code(validatedBody)
      await code.save()
      res.status(201).json(code)
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else res.status(500).json({ error })
    }
  }

  async Update (req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = noteCodeSchema.parse(req.body)
      const noteCodeId = req.params.id
      const codeUpdated = await Code.findByIdAndUpdate(
        { _id: noteCodeId },
        { content: validatedBody },
        { new: true }
      )
      if (codeUpdated === null) {
        res.status(404).json({ message: 'NoteCode not found' })
        return
      }
      res.json(codeUpdated)
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else res.status(500).json({ error })
    }
  }
}

export default new CodeController()
