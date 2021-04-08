const { Command } = require("discord.js-commando");
const uwuifier = require('uwuify');
const uwuify = new uwuifier();

module.exports = class uwuCommand extends Command {
  constructor(client) {
    super(client, {
      name: "uwu",
      group: "fun",
      memberName: "uwu",
      aliases: ["owo", "uwuify", "owoify"],
      description: "Say but UwU",
      args: [
				{
					key: "uwu",
					prompt: "Translates the message to UwU.",
					type: "string",
				},
			],
    });
  }

  async run(message, { uwu }) {
    return message.channel.send("```" + uwuify.uwuify(uwu) + "```")
  }
}
