const { Command } = require("discord.js-commando");
const reddit = require("@util/reddit.js");

module.exports = class DankCommand extends Command {
  constructor(client) {
    super(client, {
      name: "coolguide",
      group: "reddit",
      memberName: "coolguide",
      description: "Get a random image from r/CoolGuides.",
    });
  }

  async run(message, args) {
  	try {
          return message.channel.send(await reddit.fetch("coolguides", message))
      } catch (err) {
          return console.log(err);
      }
  }
}
