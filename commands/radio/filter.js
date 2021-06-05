const { Command } = require("discord.js-commando");

module.exports = class filterCommand extends Command {
  constructor(client) {
    super(client, {
      name: "filter",
      group: "radio",
      guildOnly: true,
      aliases: ["f"],
      memberName: "filter",
      description: "Applies an audio filter.",
      args: [
      	{
      		key: "query",
      		prompt: "What filter.",
          oneOf: [ "3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"],
      		type: "string"
      	},
      ]
    });
  }

  async run(message, { query }) {
    let filter = this.client.distube.setFilter(message, query);
    message.channel.send("Current queue filter: " + (filter || "Off"));
  }
}
