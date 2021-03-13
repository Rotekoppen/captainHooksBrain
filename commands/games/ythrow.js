const { Command } = require("discord.js-commando");
const yatzy = require("@util/yatzy.js");

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
    if (this.client.yatzy[message.guild.id]) {
      if (this.client.yatzy[message.guild.id].started) {
        if (this.client.yatzy[message.guild.id].players[this.client.yatzy[message.guild.id].currentPlayer].user.id == message.author.id) {
          this.client.yatzy[message.guild.id].throwDie(this.client.yatzy[message.guild.id].currentPlayer)
        }else {
          return message.reply("It is not your turn.")
        }
      }else {
        return message.reply("The game has not started.")
      }
    }else {
      return message.reply("There is no ongoing game.")
    }
  }
}
