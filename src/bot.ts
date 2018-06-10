import * as discord from 'discord.js'
import { MongoError } from 'mongodb'
import * as mongoose from 'mongoose'
import { InfoAction } from './commands/info'
import { PlayAction } from './commands/play'
import { StopAction } from './commands/stop'

export class Bot {

  constructor(
    public client: discord.Client
  ) {
  }

  public start() {

    const url = process.env.MONGODB_URI || ''

    mongoose.connect(url).then(() => {

      const Schema = mongoose.Schema
      const userSchema = new Schema({
        name: String,
        id: String,
        created: Date
      })

      mongoose.model('User', userSchema)

      this.setupDiscord()
    }, (err: MongoError) => console.log(err))

  }

  public setupDiscord() {
    this.client.on('ready', () => {
      console.log('started...')
    })

    this.client.on('message', (message) => {
      if (!(message.channel instanceof discord.DMChannel)) {
        return
      }
      if (message.content === 'play') {
        (new PlayAction()).onMessage(message)
      }
      if (message.content === 'stop') {
        (new StopAction()).onMessage(message)
      }
      if (message.content === 'info') {
        (new InfoAction()).onMessage(message)
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
