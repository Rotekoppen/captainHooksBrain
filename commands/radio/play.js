const { Command } = require("discord.js-commando");

module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "radio",
      guildOnly: true,
      aliases: ["p"],
      memberName: "play",
      description: "Play a youtube video in a voice channel.",
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
    this.client.distube.play(message, query)
  }
}
