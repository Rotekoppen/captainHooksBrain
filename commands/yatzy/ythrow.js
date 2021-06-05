const { Command } = require("discord.js-commando");
module.exports = class ythrowCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ythrow",
      group: "yatzy",
      guildOnly: true,
      aliases: ["yt"],
      memberName: "ythrow",
      description: "Throw your dice in a game of yatzy.",
    });
  }

  async run(message, { displayName }) {
    if (!this.client.yatzy[message.channel.id]) {
      return message.reply("There is no ongoing game.")
    }

    let game = this.client.yatzy[message.channel.id]
    if (game.ended) {
      return message.reply("There is no ongoing game.")
    }
    if (!game.started) {
      return message.reply("The game has not started.")
    }
    if (game.players[game.currentPlayer].user.id != message.author.id) {
      return message.reply("It is not your turn.")
    }

    game.throwDie(game.currentPlayer)
  }
}
