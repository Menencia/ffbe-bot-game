
export class Helper {

  /**
   * Send a message towards a discord webhook
   * @param discordHook
   * @param msg
   */
  public sendMessage(discordHook, msg) {
    return new Promise((resolve) => {
      return discordHook.actionHook.send(msg)
        .then(resolve())
        .catch((err) => console.log(err))
    })
  }

  /**
   * Write the player name with a mention or not
   * @param player
   */
  public generatePlayerName(player) {
    if (player.isMentionInDiscord === 'off') {
      return `\`${player.name}\``
    }

    return `<@!${player.discordId}>`
  }

}
