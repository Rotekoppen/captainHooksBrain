const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class joinCommand extends Command {
  constructor(client) {
    super(client, {
      name: "join",
      group: "radio",
      guildOnly: true,
      aliases: ["j"],
      memberName: "join",
      description: "Join the voice channel.",
    });
  }

  async run(message, { query }) {
    const radio = this.client.radio[message.guild.id]
    await radio.join(message.channel, message.member.voice.channel)
  }
}
