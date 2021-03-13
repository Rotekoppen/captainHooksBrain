const { Command } = require("discord.js-commando");
const yatzy = require("@util/yatzy.js");

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
      		prompt: "What die to keep. Enter the number of the dice, not the number on the dice. Example (1 (to keep the first dice), 135(to keep first, third and fifth die), all, none)",
      		type: "string",
          validate: text => /^(\d{1,6}|all|none)$/gi.test(text)
      	},
      ]
    });
  }

  async run(message, { keeping }) {
    if (this.client.yatzy[message.guild.id]) {
      if (this.client.yatzy[message.guild.id].started) {
        if (this.client.yatzy[message.guild.id].players[this.client.yatzy[message.guild.id].currentPlayer].user.id == message.author.id) {
          if (keeping == "all") {

            this.client.yatzy[message.guild.id].keepDie(this.client.yatzy[message.guild.id].currentPlayer)
          }else if (keeping == "none"){
            for (var i = 0; i < this.client.yatzy[message.guild.id].players[this.client.yatzy[message.guild.id].currentPlayer].die.length; i++) {
              this.client.yatzy[message.guild.id].players[this.client.yatzy[message.guild.id].currentPlayer].die[i] = 0
            }
            this.client.yatzy[message.guild.id].throwDie(this.client.yatzy[message.guild.id].currentPlayer)
          }else {
            keeping = keeping.split("")
            for (var i = 0; i < keeping.length; i++) {
              keeping[i] = parseInt(keeping[i])
            }
            this.client.yatzy[message.guild.id].keepDie(this.client.yatzy[message.guild.id].currentPlayer, keeping)
          }
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
