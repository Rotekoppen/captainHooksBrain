const { Command } = require("discord.js-commando");
const ascii_text_generator = require('ascii-text-generator');
module.exports = class asciiCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ascii",
      group: "fun",
      memberName: "ascii",
      description: "Say",
      args: [
				{
					key: "ascii",
					prompt: "Reapeats the message.",
					type: "string",
				},
			],
    });
  }

  async run(message, { ascii }) {
    return message.channel.send("```" + ascii_text_generator(ascii, "2") + "```")
  }
}
