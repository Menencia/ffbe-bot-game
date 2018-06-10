import { Message } from 'discord.js'
import * as mongoose from 'mongoose'
import fetch from 'node-fetch'

export class PullAction {

  public async onMessage(message: Message) {

    // @todo check lapis

    const rawUnits: any = await this.fetchUnits()
    const units = this.getUnits(rawUnits)
    message.author.send(`${units.length} units in the pool`)

    let rank
    const rng = Math.random()
    if (rng < 3) {
      rank = 5
    } else if (rng < 22) {
      rank = 4
    } else {
      rank = 3
    }

    message.author.send(`You pulled a ${rank}* unit`)

    // @todo add the unit to user and remove 250 lapis

    // @todo show to public channel if rank=5

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
        units.push(rawUnits[id]) // @todo sort in 3 tables : 3* / 4* / 5*
      }
    }
    return units
  }

}
