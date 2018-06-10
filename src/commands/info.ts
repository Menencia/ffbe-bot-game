import { Message } from 'discord.js'
import * as mongoose from 'mongoose'
import { UserModel } from '../models/user'

export class InfoAction {

  /**
   * Handle command
   * @param message
   */
  public onMessage(message: Message) {
    const userModel = mongoose.model('User')
    userModel
      .where('id', message.author.id)
      .findOne((err, user) => {
        if (err) {
          console.log(err)
        } else if (user) {
          const msg = this.buildMsg(user as UserModel)
          message.author.send(msg)
        }
      })
  }

  /**
   * Build user infos from datastore
   * @param user
   */
  private buildMsg(user: UserModel) {
    const html = `\`\`\`
      Username: ${user.username}
      Lapis: ${user.lapis}\`\`\``
    return html
  }

}
