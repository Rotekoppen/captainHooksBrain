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
    if (!this.client.yatzy[message.guild.id]) {
      return message.reply("There is no ongoing game.")
    }
    if (this.client.yatzy[message.guild.id].ended) {
      return message.reply("There is no ongoing game.")
    }
    if (this.client.yatzy[message.guild.id].started) {
      return message.reply("The game has started.")
    }
    if (this.client.yatzy[message.guild.id].players.length >= 8) {
      return message.reply("The game is full.")
    }
    this.client.yatzy[message.guild.id].addPlayer(displayName, message.author)
    return message.reply("Joined the game.")
  }
}
