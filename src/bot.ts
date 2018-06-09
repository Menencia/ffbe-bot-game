import * as discord from 'discord.js'

export class Bot {

  constructor(public client: discord.Client) {}

  public start() {

    this.client.on('ready', () => {
      console.log('started...')
    })

    this.client.on('message', (message) => {
      if (message.content === 'ping') {
        message.author.send('pong')
        message.channel.send('poong')
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
