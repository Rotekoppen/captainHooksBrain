const { Command } = require("discord.js-commando");

module.exports = class skipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      group: "radio",
      guildOnly: true,
      aliases: ["s", "next"],
      memberName: "skip",
      description: "Play the next song in the queue."
    });
  }

  async run(message) {
    this.client.distube.skip(message);
  }
}
