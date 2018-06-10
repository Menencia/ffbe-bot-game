import { Message } from 'discord.js'
import * as mongoose from 'mongoose'
import fetch from 'node-fetch'

export class PullAction {

  public async onMessage(message: Message) {

    const rawUnits: any = await this.fetchUnits()
    const units = this.getUnits(rawUnits)
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

  private fetchUnits(): Promise<any> {
    return fetch('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json')
      .then((res) => res.json())
      .catch((reason) => console.log(reason))
  }

  private getUnits(rawUnits: any) {
    const units = []
    for (const id in rawUnits) {
      if (rawUnits.hasOwnProperty(id)) {
        units.push(rawUnits[id])
      }
    }
    return units
  }

}
