const { Command } = require("discord.js-commando");
const yatzy = require("@util/yatzy.js");

module.exports = class ystartCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ystart",
      group: "games",
      guildOnly: true,
      memberName: "ystart",
      description: "Starts the game of yatzy.",
    });
  }

  async run(message) {
    if (this.client.yatzy[message.guild.id]) {
      if (this.client.yatzy[message.guild.id].host.id == message.author.id) {
        let reply = message.reply("Starting game.")
        this.client.yatzy[message.guild.id].startGame()
        return reply
      }else {
        return message.reply("You are not the host of that game.")
      }
    }else {
      return message.reply("There is no ongoing game.")
    }
  }
}
