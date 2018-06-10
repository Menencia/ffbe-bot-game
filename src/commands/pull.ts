import { Message } from 'discord.js'
import * as mongoose from 'mongoose'
import fetch from 'node-fetch'

export class PullAction {

  public async onMessage(message: Message) {

    const units: any[] = await this.getUnits()
    console.log(units.length)
    message.author.send(`${units.length} units in the pool`)

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

  private getUnits(): Promise<any[]> {
    return fetch('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json')
      .then((res) => res.json())
      .catch((reason) => console.log(reason))
  }

}
