const { Command } = require("discord.js-commando");

module.exports = class nowplayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      group: "radio",
      guildOnly: true,
      aliases: ["np"],
      memberName: "nowplaying",
      description: "Displays what is currently playing."
    });
  }

  async run(message) {
    this.client.messager.nowplaying(message, this.client.distube)
  }
}
