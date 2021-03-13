const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const timer = ms => new Promise( res => setTimeout(res, ms));

module.exports = class coinflipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "coinflip",
      group: "fun",
      aliases: ["coin", "flip"],
      memberName: "coinflip",
      description: "Flip a coin.",
    });
  }

  async run(message) {

    const embed = new MessageEmbed()
    	.setColor("#FCD12A")
    	.setTitle("Flipping a coin")

    const coin = await message.channel.send(embed)

    await timer(1500)

    let coinflip = Math.random()
    if (coinflip > 0.5) {
      embed.setTitle("Heads!")
    }else if (coinflip > 0.0001) {
      embed.setTitle("Tails!")
    }else {
      embed.setTitle("What..? It landed on the edge?")
    }

    return coin.edit(embed)
  }
}
