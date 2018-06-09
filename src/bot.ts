import * as discord from 'discord.js'
import { MongoError } from 'mongodb'
import * as mongoose from 'mongoose'

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
      if (message.content === '/play') {
        if (message.channel instanceof discord.DMChannel) {
          console.log(message.author.id)
          mongoose
            .model('User')
            .where('id', message.author.id)
            .findOne((err, user) => {
              console.log(err)
              console.log(user)
            })
          message.author.send('Not available yet!')
        }
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
