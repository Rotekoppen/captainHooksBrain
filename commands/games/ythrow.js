const { Command } = require("discord.js-commando");
module.exports = class ythrowCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ythrow",
      group: "games",
      guildOnly: true,
      aliases: ["yt"],
      memberName: "ythrow",
      description: "Throw your dice in a game of yatzy.",
    });
  }

  async run(message, { displayName }) {
    if (!this.client.yatzy[message.guild.id]) {
      return message.reply("There is no ongoing game.")
    }
    if (this.client.yatzy[message.guild.id].ended) {
      return message.reply("There is no ongoing game.")
    }
    if (!this.client.yatzy[message.guild.id].started) {
      return message.reply("The game has not started.")
    }
    if (!this.client.yatzy[message.guild.id].async) {
      if (this.client.yatzy[message.guild.id].players[this.client.yatzy[message.guild.id].currentPlayer].user.id != message.author.id) {
        return message.reply("It is not your turn.")
      }
    }

    this.client.yatzy[message.guild.id].throwDie(this.client.yatzy[message.guild.id].currentPlayer)
  }
}
