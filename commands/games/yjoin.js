const { Command } = require("discord.js-commando");

module.exports = class yjoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: "yjoin",
      group: "games",
      guildOnly: true,
      memberName: "yjoin",
      description: "Joins a game of yatzy.",
      args: [
      	{
      		key: "displayName",
      		prompt: "What character will represent you on the board. (max 2 characters)",
      		type: "string",
          validate: text => /^[a-zøæå\d]{1,2}$/.test(text)
      	},
      ]
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
    if (game.started) {
      return message.reply("The game has started.")
    }
    if (game.players.length >= 8) {
      return message.reply("The game is full.")
    }
    game.addPlayer(displayName, message.author)
    return message.reply("Joined the game.")
  }
}
