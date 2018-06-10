import { Message } from 'discord.js'
import * as mongoose from 'mongoose'

export class InfoAction {

  public onMessage(message: Message) {

    const userModel = mongoose.model('User')
    userModel
      .where('id', message.author.id)
      .findOne((err, user) => {
        if (err) {
          console.log(err)
        } else if (user) {
          message.author.send(user)
        }
      })

  }

}
