const { Command } = require("discord.js-commando")
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require("discord.js")
const colors = ["#ff000040", "#ffa50040", "#ffff0040", "#00800040", "#0000ff40", "#4b008240", "#ee82ee40"]

module.exports = class chartCommand extends Command {
	constructor(client) {
		super(client, {
			name: "rainbow",
			group: "pfpfun",
			memberName: "rainbow",
			description: "Adds a rainbow to the profile picture of @'ted person'.",
			args: [
				{
					key: "target",
					prompt: "@User who should be rainbowed.",
					type: "user",
				},
			],
		})
	}

	run = async function(message, { target }) {
    const avatarURL = target.displayAvatarURL({ format: "png" })
    if (avatarURL == null) return message.reply("the avatar could not be fetched")
    try {
      const canvas = createCanvas(128, 128)
      const image = await loadImage(avatarURL)
    	const ctx = canvas.getContext('2d')

      ctx.drawImage(image, 0, 0, 128, 128)
			for (var i = 0; i < colors.length; i++) {
				ctx.fillStyle = colors[i]
				ctx.fillRect(0, canvas.height / colors.length * i, canvas.width, canvas.height / colors.length * (i + 1))
			}

      const buf = canvas.toBuffer()
      const attachment = new MessageAttachment(buf, target.username + "-rainbow.png")
			return message.channel.send(attachment)
    } catch (e) {
      return message.reply("an error occured: " + e)
    }
	}
}
