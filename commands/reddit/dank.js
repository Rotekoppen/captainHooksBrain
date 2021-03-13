const { Command } = require("discord.js-commando");
const reddit = require("@util/reddit.js");

module.exports = class dankCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dank",
      group: "reddit",
      memberName: "dank",
      description: "Get a random image from r/DankMemes.",
    });
  }

  async run(message, args) {
  	try {
          return message.channel.send(await reddit.fetch("dankmemes", message))
      } catch (err) {
          return console.log(err);
      }
  }
}
