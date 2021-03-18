const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class skipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      group: "radio",
      guildOnly: true,
      aliases: ["s"],
      memberName: "skip",
      description: "Skip what is currently playing.",
    });
  }

  async run(message, { query }) {
    const embed = new MessageEmbed()
      .setColor("#8899dd")
      .setTitle("Nothing is currently playing.")

    if (this.client.radio[message.guild.id] == undefined) {
      return message.channel.send(embed)
    }
    const radio = this.client.radio[message.guild.id]
    if (!radio.playing) {
      return message.channel.send(embed)
    }
    await radio.playnext()
    embed.setTitle("Skipped.")
    return message.channel.send(embed)
  }
}
