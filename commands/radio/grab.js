const { Command } = require("discord.js-commando");

module.exports = class grabCommand extends Command {
  constructor(client) {
    super(client, {
      name: "grab",
      group: "radio",
      guildOnly: true,
      aliases: ["g", "yoink"],
      memberName: "grab",
      description: "Sends a copy of the currently playing song to your DM."
    });
  }

  async run(message) {
    let queue = this.client.distube.getQueue(message)
    if (queue == undefined) {
      this.client.messager.error.NotPlaying(message)
    }else {
      this.client.messager.grab(message, queue.songs[0])
    }
  }
}
