const { Command } = require("discord.js-commando");

module.exports = class jumpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "jump",
      group: "radio",
      guildOnly: true,
      aliases: ["j"],
      memberName: "jump",
      description: "Jump to the song number in the queue.",
      args: [
      	{
      		key: "query",
      		prompt: "What number to jump to.",
      		type: "integer"
      	},
      ]
    });
  }

  async run(message, { query }) {
    this.client.distube.jump(message, query)
  }
}
