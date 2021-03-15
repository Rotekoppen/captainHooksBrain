const { Command } = require("discord.js-commando");
module.exports = class yfendCommand extends Command {
  constructor(client) {
    super(client, {
      name: "yfend",
      group: "games",
      guildOnly: true,
      memberName: "yfend",
      description: "Forcibly ends a game of yatzy.",
      userPermissions: ["ADMINISTRATOR"],
    });
  }

  async run(message) {
    if (!this.client.yatzy[message.guild.id]) {
      return message.reply("There is no ongoing game.")
    }

    this.client.yatzy[message.guild.id] = undefined
    return message.reply("Ended ongoing game.")
  }
}
