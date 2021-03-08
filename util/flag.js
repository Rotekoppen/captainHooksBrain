const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require("discord.js")

exports.make = async function (message, target, colors) {
  const avatarURL = target.displayAvatarURL({ format: "png" })
  if (avatarURL == null) return message.reply("the avatar could not be fetched")
  try {
    const canvas = createCanvas(128, 128)
    const image = await loadImage(avatarURL)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0, 0, 128, 128)
    for (var i = 0; i < colors.length; i++) {
      ctx.fillStyle = colors[i]
      ctx.fillRect(
        0, canvas.height / colors.length * i,
        canvas.width, canvas.height / colors.length
      )
    }

    const buf = canvas.toBuffer()
    const attachment = new MessageAttachment(buf, target.username + "-rainbow.png")
    return message.channel.send(attachment)
  } catch (e) {
    return message.reply("an error occured: " + e)
  }
};
