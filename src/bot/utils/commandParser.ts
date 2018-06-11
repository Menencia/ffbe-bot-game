import { Message } from 'discord.js'
import { Game } from '../../game/game'

import { botOperator } from '../../../settings'
import { commands } from '../data/commands'
const commandList = commands.map((c) => c.command).join('|').replace(/(,)/g, '|')
const commandRegex = new RegExp(commandList)

export class CommandParser {

  constructor(public helper: object) {}

  public parseUserCommand(game: Game, messageObj: Message) {
    const messageContent = messageObj.content
    const command = messageContent.includes(' ')
      ? messageContent.split(' ')[0].toLowerCase()
      : messageContent.toLowerCase()
    const authorId = messageObj.author.id
    const channelId = messageObj.channel.id

    if (commandRegex.test(command)) {
      const commandObj = commands.filter((c) => c.command instanceof Array ? c.command.includes(command) : c.command === command)[0]
      if (!commandObj) {
        return
      }

      if (commandObj.channelOnlyId && channelId !== commandObj.channelOnlyId && messageObj.channel.type !== 'dm') {
        return messageObj.delete(1500)
          .then(() => messageObj.author.send(`Please send this to <#${commandObj.channelOnlyId}> or PM me.`))
      }

      if (commandObj.operatorOnly && authorId !== botOperator) {
        return messageObj.delete(1500)
          .then(() => messageObj.author.send('This is a bot operator only command.'))
      }

      return commandObj.onMessage(game, messageObj)
    }

    if (messageContent.startsWith('!')) {
      return messageObj.author.send(`Please check !help for more info. ${messageContent} was an invalid command.`)
    }
  }

}
