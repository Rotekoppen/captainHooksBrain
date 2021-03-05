const { Command } = require("discord.js-commando");
const reddit = require("@util/reddit.js");

module.exports = class DankCommand extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      group: "reddit",
      memberName: "meme",
      description: "Get a random image from r/Memes.",
    });
  }

  async run(message, args) {
  	try {
          return message.channel.send(await reddit.fetch("memes", message))
      } catch (err) {
          return console.log(err);
      }
  }
}
