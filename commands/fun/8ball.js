const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const replies = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes – definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",

  "Don’t count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",

  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again."
]

const timer = ms => new Promise( res => setTimeout(res, ms));

module.exports = class magicballCommand extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "fun",
      memberName: "8ball",
      description: "Let the magic 8-ball answer your question.",
      args: [
				{
					key: "question",
					prompt: "Your question.",
					type: "string",
				},
			],
    });
  }

  async run(message, { question }) {

    const embed = new MessageEmbed()
    	.setColor("#101040")
    	.setTitle("Shaking the magic 8-ball")

    const ball = await message.channel.send(embed)

    await timer(1500)

    embed.setTitle(replies[Math.floor(replies.length * Math.random())])

    return ball.edit(embed)
  }
}
