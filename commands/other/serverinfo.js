const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class serverinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      group: "other",
      aliases: ["server"],
      memberName: "serverinfo",
      description: "Get info about the current server.",
      guildOnly: true,
    });
  }

  async run(message, args) {
    const guild = await message.guild.fetch()

    const embed = new MessageEmbed()
    	.setColor("#6633FF")
    	.setTitle(guild.name)
    	.setThumbnail(guild.iconURL())
    	.addFields(
    		{ name: 'Members:', value: guild.approximateMemberCount, inline: true },
    		{ name: 'Emojis:', value: guild.emojis.cache.array().length, inline: true },
    		{ name: 'Filter:', value: guild.explicitContentFilter, inline: true },
    		{ name: 'Roles:', value: guild.roles.cache.array().length, inline: true },
    		{ name: 'Channels:', value: guild.channels.cache.array().length, inline: true },
    		{ name: 'Created:', value: guild.createdAt.toGMTString()},
        { name: 'Owner:', value: guild.owner.displayName},
    		{ name: 'Bot joined:', value: guild.joinedAt.toGMTString()},
    	)

    return message.channel.send(embed)
  }
}
