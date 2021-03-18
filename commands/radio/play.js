const { Command } = require("discord.js-commando");
const Radio = require("@util/radio.js");
module.exports = class playCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "radio",
      guildOnly: true,
      aliases: ["p"],
      memberName: "play",
      description: "Play a audio file or a youtube video in a voice channel.",
      args: [
      	{
      		key: "query",
      		prompt: "What Youtube video or audio file or stream.",
      		type: "string"
      	},
      ]
    });
  }

  async run(message, { query }) {
    if (this.client.radio[message.guild.id] == undefined) {
      this.client.radio[message.guild.id] = new Radio(message.guild, message.channel, message.member.voice.channel)
    }
    const radio = this.client.radio[message.guild.id]

    await radio.join(message.channel, message.member.voice.channel)
    return await radio.addSong(query, message.author)
  }
}
