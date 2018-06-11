import { Message } from 'discord.js'
import { commandChannel } from '../../../settings'
import { Game } from '../../game/game'

export class PlayCommand {

  public command = ['!play']
  public channelOnlyId = commandChannel
  public operatorOnly = false

  public onMessage(game: Game, message: Message) {

    game.database.loadPlayer(message.author.id)
      .then((player) => {
        if (player) {
          message.author.send(`You're already playing ._.`)
        } else {
          game.database.createNewPLayer(message.author.id, message.author.username)
            .then((newPlayer) => {
              game.helper.sendMessage(game.hook, `${game.helper.generatePlayerName(newPlayer)} has joined the game!`)
              message.author.send(`You're now playing \\o/`)
            })
        }
      })
  }

}
