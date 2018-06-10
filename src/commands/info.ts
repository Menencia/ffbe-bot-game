import { Message, User } from 'discord.js'
import * as mongoose from 'mongoose'

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
          const msg = this.buildMsg(user)
          message.author.send(msg)
        }
      })
  }

  /**
   * Build user infos from datastore
   * @param user
   */
  private buildMsg(user: User) {
    const html = `\`\`\`
      Username: ${user.username}
      \`\`\`
    `
    return html
  }

}
