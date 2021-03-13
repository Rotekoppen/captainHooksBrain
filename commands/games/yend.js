const { Command } = require("discord.js-commando");
const yatzy = require("@util/yatzy.js");

module.exports = class yendCommand extends Command {
  constructor(client) {
    super(client, {
      name: "yend",
      group: "games",
      guildOnly: true,
      memberName: "yend",
      description: "Ends a game of yatzy.",
    });
  }

  async run(message) {
    if (this.client.yatzy[message.guild.id]) {
      if (this.client.yatzy[message.guild.id].hostid == message.author.id) {
        this.client.yatzy[message.guild.id] = undefined
        return message.reply("Ended ongoing game.")
      }else {
        return message.reply("You are not the host of that game.")
      }
    }else {
      return message.reply("There is no ongoing game.")
    }
  }
}
