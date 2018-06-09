import * as discord from 'discord.js'

export class Bot {

  constructor(public client: discord.Client) {}

  public start() {

    this.client.on('ready', () => {
      console.log('started...')
    })

    this.client.on('message', (message) => {
      if (message.content === '!pull') {
        if (message.channel instanceof discord.DMChannel) {
          message.author.send('Not available yet!')
        }
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
