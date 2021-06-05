const { Command } = require("discord.js-commando");

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "playtop",
      group: "radio",
      guildOnly: true,
      aliases: ["pt"],
      memberName: "playtop",
      description: "Adds a song to the start of the queue.",
      args: [
      	{
      		key: "query",
      		prompt: "What Youtube video.",
      		type: "string"
      	},
      ]
    });
  }

  async run(message, { query }) {
    this.client.distube.play(message, query, true)
  }
}
