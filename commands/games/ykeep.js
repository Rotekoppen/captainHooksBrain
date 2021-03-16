const { Command } = require("discord.js-commando");
module.exports = class ykeepCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ykeep",
      group: "games",
      guildOnly: true,
      aliases: ["yk"],
      memberName: "ykeep",
      description: "Choose die to keep in a game of yatzy.",
      args: [
      	{
      		key: "keeping",
      		prompt: "What die to keep. Enter the number of the dice, not the number on the dice. Example (1 (to keep the first dice), 135  (to keep first, third and fifth die), 0 (to keep none))",
      		type: "string",
          validate: text => /^([\d ]{1,}|all|none)$/gi.test(text)
      	},
      ]
    });
  }

  async run(message, { keeping }) {
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

    keeping = keeping.split(" ").join("")
    keeping = keeping.split("")
    for (var i = 0; i < keeping.length; i++) {
      keeping[i] = parseInt(keeping[i])
    }
    game.keepDie(game.currentPlayer, keeping)
  }
}
