const { Command } = require("discord.js-commando");
module.exports = class ystartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ystart",
      group: "yatzy",
      guildOnly: true,
      memberName: "ystart",
      description: "Starts the game of yatzy.",
    });
  }

  async run(message) {
    if (!this.client.yatzy[message.channel.id]) {
      return message.reply("There is no ongoing game.")
    }
    if (this.client.yatzy[message.channel.id].ended) {
      return message.reply("There is no ongoing game.")
    }
    if (this.client.yatzy[message.channel.id].host.id != message.author.id) {
      return message.reply("You are not the host of that game.")
    }
    if (this.client.yatzy[message.channel.id].started) {
      return message.reply("The game has already been started.")
    }

    let reply = message.reply("Starting game.")
    this.client.yatzy[message.channel.id].startGame()
    return reply
  }
}
