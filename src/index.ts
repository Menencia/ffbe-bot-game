import * as dotenv from 'dotenv'
dotenv.config()

import { Game } from './game/game'

import * as discord from 'discord.js'
import { CommandParser } from './bot/utils/commandParser'

import {
  actionWebhookId,
  actionWebhookToken,
  botLoginToken
} from '../settings'
import { Helper } from './utils/helper'

const discordBot = new discord.Client()
const actionHook = new discord.WebhookClient(actionWebhookId, actionWebhookToken)

const hook = {
  actionHook,
  discordBot
}

const helper = new Helper()
const commandParser = new CommandParser(helper)

const game = new Game(hook, helper)

discordBot.on('ready', () => {
  console.log('started...')
  discordBot.user.setStatus('idle')
})

discordBot.on('message', (message) => {
  return commandParser.parseUserCommand(game, message)
})

discordBot.login(botLoginToken)
