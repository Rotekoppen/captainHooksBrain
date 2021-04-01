const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class muteallCommand extends Command {
  constructor(client) {
    super(client, {
      name: "muteall",
      group: "other",
      aliases: ["ma"],
      memberName: "muteall",
      description: "Servermute all non bots in voice channel.",
      guildOnly: true,
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
    });
  }

  async run(message, args) {
    var mutedUsers = []
    var usersInVoice = Array.from(message.member.voice.channel.members.values())

    for (var i = 0; i < usersInVoice.length; i++) {
      console.log(usersInVoice[i]);
      if (usersInVoice[i].user.bot) {
        continue
      }
      if (usersInVoice[i].voice.serverMute) {
        continue
      }
      usersInVoice[i].voice.setMute(true)
      mutedUsers.push(usersInVoice[i])
    }

    let muted = await message.channel.send("Muted everyone, react to unmute again.")

    muted.react("🔈");

    const filter = (reaction, user) => {return !user.bot && user.id === message.author.id && reaction.emoji.name === "🔈"};

    var collector = await muted.createReactionCollector(filter, { dispose: true, time: 60 * 60 * 1000 });

    collector.on('collect', (reaction, user) => {
      for (var i = 0; i < mutedUsers.length; i++) {
        mutedUsers[i].voice.setMute(false)
      }
      muted.edit("Unmuted users muted by the bot.")
    });

    return muted
  }
}
