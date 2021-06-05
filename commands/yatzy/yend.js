const { Command } = require("discord.js-commando");

module.exports = class yendCommand extends Command {
  constructor(client) {
    super(client, {
      name: "yend",
      group: "yatzy",
      guildOnly: true,
      memberName: "yend",
      description: "Ends a game of yatzy.",
    });
  }

  async run(message) {
    if (!this.client.yatzy[message.channel.id]) {
      return message.reply("There is no ongoing game.")
    }

    if (this.client.yatzy[message.channel.id].hostid != message.author.id) {
      return message.reply("You are not the host of that game.")
    }

    this.client.yatzy[message.channel.id] = undefined
    return message.reply("Ended ongoing game.")
  }
}
