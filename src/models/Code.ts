import { Schema, model } from 'mongoose'

const codeSchema = new Schema({
  content: Object,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

export default model('Code', codeSchema)
