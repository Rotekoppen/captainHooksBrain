const { Command } = require("discord.js-commando");

module.exports = class sourceCommand extends Command {
  constructor(client) {
    super(client, {
      name: "source",
      group: "other",
      memberName: "source",
      description: "Get the source code of the bot.",
    });
  }

  async run(message, args) {
    message.author.send(
      `The source code is aviable at https://www.github.com/Rotekoppen/captainHooksBrain`
    );
  }
}
