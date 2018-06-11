import { Message } from 'discord.js'
import { commandChannel } from '../../../settings'
import { Game } from '../../game/game'

export class StopCommand {

  public command = ['!stop']
  public channelOnlyId = commandChannel
  public operatorOnly = false

  public onMessage(game: Game, message: Message) {
    game.database.deletePlayer(message.author.id).then(() => {
      message.author.send(`You don't play anymore! :'(`)
    })
  }

}
