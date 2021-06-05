const { Command } = require("discord.js-commando");

module.exports = class playskipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "playskip",
      group: "radio",
      guildOnly: true,
      aliases: ["ps"],
      memberName: "playskip",
      description: "Play a youtube video in a voice channel before the rest of the queue.",
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
    this.client.distube.playSkip(message, query)
  }
}
