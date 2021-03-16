const { Command } = require("discord.js-commando");
const yatzy = require("@util/yatzy.js");

module.exports = class yatzyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "yatzy",
      group: "games",
      memberName: "yatzy",
      guildOnly: true,
      description: "Starts a game of yatzy.",
      args: [
      	{
      		key: "displayName",
      		prompt: "What character will represent you on the board. (max 2 characters)",
      		type: "string",
          validate: text => /^[a-zøæå\d]{1,2}$/gi.test(text)
      	},
      	{
      		key: "gameType",
      		prompt: "What kind of yatzy game to play. (mini/normal/maxi/minirandom/random/maxirandom/chance/yatzy)",
      		type: "string",
          oneOf: ["mini", "normal", "maxi", "minirandom", "random", "maxirandom", "chance", "yatzy"],
      	},
      	{
      		key: "forced",
      		prompt: "If the game is forced order, or free order. (forced/free)",
      		type: "string",
          default: "forced",
          oneOf: ["forced"/*, "free"*/],
      	},
      ]
    });
  }

  async run(message, { displayName, gameType, forced }) {
    if (this.client.yatzy[message.channel.id]) {
      if (!this.client.yatzy[message.channel.id].ended) {
        return message.reply("There is already a game of yatzy started in this channel.")
      }
    }

    this.client.yatzy[message.channel.id] = new yatzy(message.guild, message.channel, gameType.toLowerCase(), forced.toLowerCase() == "forced")
    this.client.yatzy[message.channel.id].addPlayer(displayName, message.author, true)
    return message.reply("Started a game of yatzy, with you as the host. Other players use `yjoin` to join. When all players has joined use `ystart` to start the game.")
  }
}
