const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const timer = ms => new Promise( res => setTimeout(res, ms));

module.exports = class sayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      group: "fun",
      memberName: "say",
      description: "Say",
      args: [
				{
					key: "say",
					prompt: "Reapeats the message.",
					type: "string",
				},
			],
    });
  }

  async run(message, { say }) {
    return message.channel.send(say)
  }
}
