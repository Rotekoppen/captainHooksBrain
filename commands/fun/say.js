const { Command } = require("discord.js-commando");

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
