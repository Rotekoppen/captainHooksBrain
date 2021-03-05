const { Command } = require("discord.js-commando");
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require("discord.js");


module.exports = class chartCommand extends Command {
	constructor(client) {
		super(client, {
			name: "communism",
			group: "pfpfun",
			memberName: "communism",
			description: "Adds a communism symbol to profile picture of @'ted person'.",
			args: [
				{
					key: "target",
					prompt: "@User who should be communismd.",
					type: "user",
				},
			],
		});
	}

	run = async function(message, { target }) {
    const avatarURL = target.displayAvatarURL({ format: "png" })
    if (avatarURL == null) return message.reply("the avatar could not be fetched")
		const sickle = await loadImage("resources/communism.png")
    try {
      const canvas = createCanvas(128, 128)
      const image = await loadImage(avatarURL)
      const ctx = canvas.getContext('2d')

      ctx.drawImage(image, 0, 0, 128, 128)
      ctx.globalAlpha = 0.25;
      ctx.drawImage(sickle, 0, 0, 128, 128)

      const buf = canvas.toBuffer()
      const attachment = new MessageAttachment(buf)
			return message.channel.send(attachment)
    } catch (e) {
      return message.reply("an error occured: " + e)
    }
	}
};
