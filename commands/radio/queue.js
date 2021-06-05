const { Command } = require("discord.js-commando");

module.exports = class queueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "radio",
      guildOnly: true,
      aliases: ["q"],
      memberName: "queue",
      description: "Displays the current queue."
    });
  }

  async run(message) {
    this.client.messager.queue(message, this.client.distube)
  }
}
