import { Message } from 'discord.js'
import * as mongoose from 'mongoose'

export class StopAction {

  public onMessage(message: Message) {

    const userModel = mongoose.model('User')
    userModel
      .where('id', message.author.id)
      .findOneAndRemove((error, doc, result) => {
        if (error) {
          console.log(error)
        } else {
          message.author.send('You don\'t play anymore')
        }
      })

  }

}
