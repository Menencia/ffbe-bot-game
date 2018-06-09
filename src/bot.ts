import * as discord from 'discord.js'
import { MongoError } from 'mongodb'
import * as mongoose from 'mongoose'

export class Bot {

  constructor(
    public client: discord.Client
  ) {}

  public start() {

    const url = process.env.MONGODB_URI || ''

    mongoose.connect(url).then((db) => {
      console.log(db)
    }, (err: MongoError) => console.log(err))

    this.client.on('ready', () => {
      console.log('started...')
    })

    this.client.on('message', (message) => {
      if (message.content === '!pull') {
        if (message.channel instanceof discord.DMChannel) {
          message.author.send('Not available yet!')
        }
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
