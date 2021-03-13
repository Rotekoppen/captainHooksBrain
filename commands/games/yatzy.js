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
          validate: text => /^[A-Za-zøæåØÆÅ]{1,2}$/.test(text)
      	},
      	{
      		key: "gameType",
      		prompt: "What kind of yatzy game to play. (mini/normal/maxi)",
      		type: "string",
          default: "mini",
          oneOf: ["mini"/*, "normal", "maxi"*/],
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
    if (this.client.yatzy[message.guild.id]) {
      return message.reply("There is already a game of yatzy started on this server.")
    }else {
      this.client.yatzy[message.guild.id] = new yatzy(message.guild, message.channel, gameType, forced == "forced")
      this.client.yatzy[message.guild.id].addPlayer(displayName, message.author, true)
      return message.reply("Started a game of yatzy, with you as the host. Other players use `yjoin` to join. When all players has joined use `ystart` to start the game.")
    }
  }
}
