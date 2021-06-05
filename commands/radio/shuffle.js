const { Command } = require("discord.js-commando");

module.exports = class shuffleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      group: "radio",
      guildOnly: true,
      aliases: ["randomize"],
      memberName: "shuffle",
      description: "Shuffles the queue."
    });
  }

  async run(message) {
    this.client.distube.shuffle(message);
    this.client.messager.shuffle(message);
  }
}
