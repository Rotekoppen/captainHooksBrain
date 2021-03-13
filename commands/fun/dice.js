const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const timer = ms => new Promise( res => setTimeout(res, ms));

module.exports = class diceCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dice",
      group: "fun",
      aliases: ["roll", "die"],
      memberName: "dice",
      description: "Roll die.",
      args: [
				{
					key: "dice",
					prompt: "The dice to roll, example 1d6, 2d12.",
					type: "string",
          default: '1d6',
          validate: dice => /^\d*[dD]{0,1}\d*$/.test(dice) && /\d*/.test(dice)
				},
			],
    });
  }

  async run(message, { dice }) {
    dice = dice.toLowerCase()
    let number = 6 // talle på terningen
    let count = 1  // antall terninger
    let args = dice.split("d")

    if (dice.startsWith("d")) {
      number = ("1" + dice).split("d")[1]
    }else {
      if (args.length == 2) {
        count = args[0]
        number = args[1]
      }else {
        count = args[0]
      }
    }

    if (number > 200) {
      return message.reply("The dice type is too high, max 200.")
    }
    if (count > 200) {
      return message.reply("The number of die high, max 200.")
    }

    const embed = new MessageEmbed()
    	.setColor("#10D140")
    	.setTitle(`Rolling ${count}d${number}`)

    const roll = await message.channel.send(embed)

    await timer(1500)

    let total = 0
    let dies = []

    for (var i = 0; i < count; i++) {
      let result = Math.floor(number * Math.random()) + 1
      total += result
      dies.push(result)
    }

    embed.setTitle(total)
    if (dies.length > 1) {
      embed.setDescription(dies.join(" + "))
    }

    return roll.edit(embed)
  }
}
