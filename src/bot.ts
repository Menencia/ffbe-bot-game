import * as discord from 'discord.js'

export class Bot {

  constructor(public client: discord.Client) {}

  public start() {

    this.client.on('ready', () => {
      console.log('started...')
    })

    this.client.on('message', (message) => {
      if (message.content === 'ping') {
        console.log('ping detected')
        console.log(message.channel)
        if (message.channel instanceof discord.DMChannel) {
          message.author.send('pong')
        }
      }
    })

    this.client.login(process.env.BOT_TOKEN)
  }
}
