const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class queueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "radio",
      guildOnly: true,
      aliases: ["q"],
      memberName: "queue",
      description: "Get what is currently in the queue.",
    });
  }

  async run(message, { query }) {
    const embed = new MessageEmbed()
    .setColor("#8899dd")
    .setTitle("Current queue")

    if (this.client.radio[message.guild.id] == undefined) {
      embed.setTitle("Nothing is currently playing.")
      return message.channel.send(embed)
    }
    const radio = this.client.radio[message.guild.id]

    if (!radio.playing) {
      embed.setTitle("Nothing is currently playing.")
      return message.channel.send(embed)
    }

    if (radio.queue.length == 0) {
      embed.setTitle("Nothing is currently in the queue.")
      return message.channel.send(embed)
    }

    let desc = ""

    var i = 0
    for (i = 0; i < Math.min(radio.queue.length, 10); i++) {
      desc += "**" + (i + 1) + "** [" + radio.queue[i].name + "](" + radio.queue[i].url + ")\n"
    }
    if (radio.queue.length != i) desc += "+" + (radio.queue.length - i) + " more"

    embed.setDescription(desc)

    return message.channel.send(embed)
  }
}
