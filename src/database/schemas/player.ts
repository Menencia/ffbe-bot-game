import * as mongoose from 'mongoose'

const newPlayerObj = (discordId, name) => {
  return {
    name,
    discordId,
    lapis: 300,
    isMentionInDiscord: 'on',
    createdAt: new Date().getTime()
  }
}

const playerSchema = new mongoose.Schema({
  name: String,
  discordId: String,
  lapis: {
    type: Number,
    default: 0
  },
  isMentionInDiscord: {
    type: String,
    default: 'on'
  },
  createdAt: Date
})

export { playerSchema, newPlayerObj }
