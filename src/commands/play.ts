import { Message } from 'discord.js'
import * as mongoose from 'mongoose'

export class PlayAction {

  public onMessage(message: Message) {

    const userModel = mongoose.model('User')
    userModel
      .where('id', message.author.id)
      .findOne((err, user) => {
        if (err) {
          console.log(err)
        } else if (user) {
          message.author.send('You\'re already playing')
        } else {
          userModel.create({
            name: message.author.tag,
            id: message.author.id,
            created: new Date()
          }).then(() => {
            message.author.send('You\'re now playing!')
          })
        }
      })

  }

}
