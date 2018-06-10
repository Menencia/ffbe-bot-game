import { Message } from 'discord.js'
import * as mongoose from 'mongoose'
import fetch from 'node-fetch'

export class PullAction {

  public async onMessage(message: Message) {

    const units = await this.getUnits()
    console.log(units)

    /*const userModel = mongoose.model('User')
    userModel
      .where('id', message.author.id)
      .findOneAndRemove((error, doc, result) => {
        if (error) {
          console.log(error)
        } else {
          message.author.send('You don\'t play anymore')
        }
      })*/

  }

  private getUnits() {
    fetch('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json')
      .then((res) => res.json())
      .then((body) => console.log(body))
      .catch((reason) => console.log(reason))
  }

}
