const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class userinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "userinfo",
      group: "other",
      aliases: ["user"],
      memberName: "userinfo",
      description: "Get info about the @'ed user.",
      args: [
				{
					key: "target",
					prompt: "User to show info about.",
					type: "user",
				},
			],
    });
  }

  async run(message, { target }) {

    const embed = new MessageEmbed()
    	.setColor("#6633FF")
    	.setTitle(target.username)
    	.setThumbnail(target.displayAvatarURL())
    	.addFields(
    		{ name: 'Created:', value: target.createdAt.toGMTString()},
    	)
    if (target.id == "770288490205675560") {
      embed.setTitle(target.username + " <3")
    }
    return message.channel.send(embed)
  }
}
