const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class nowplayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      group: "radio",
      guildOnly: true,
      aliases: ["np"],
      memberName: "nowplaying",
      description: "Get what is currently playing.",
    });
  }

  async run(message, { query }) {
    const embed = new MessageEmbed()
    .setColor("#8899dd")

    if (this.client.radio[message.guild.id] == undefined) {
      embed.setTitle("Nothing is currently playing.")
      return message.channel.send(embed)
    }
    const radio = this.client.radio[message.guild.id]


    if (!radio.playing) {
      embed.setTitle("Nothing is currently playing.")
      return message.channel.send(embed)
    }

    if (radio.current.thumbnail) {
      embed.setThumbnail(radio.current.thumbnail)
    }

    embed.setTitle("Currently playing")
      .setDescription("[" + radio.current.name + "](" + radio.current.url + ")")

    return message.channel.send(embed)
  }
}
