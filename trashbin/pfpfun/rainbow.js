const { Command } = require("discord.js-commando")
const flag = require("@util/flag.js");
const colors = ["#ff000040", "#ffa50040", "#ffff0040", "#00800040", "#0000ff40", "#4b008240", "#ee82ee40"]

module.exports = class rainbowCommand extends Command {
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
		return flag.make(message, target, colors)
	}
}
