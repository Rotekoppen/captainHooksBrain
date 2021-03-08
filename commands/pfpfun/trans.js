const { Command } = require("discord.js-commando")
const flag = require("@util/flag.js");
const colors = ["#55CDFC40", "#ffffff40", "#f7a8b840"]

module.exports = class transCommand extends Command {
	constructor(client) {
		super(client, {
			name: "trans",
			group: "pfpfun",
			memberName: "trans",
			description: "Adds a trans flag to the profile picture of @'ted person'.",
			args: [
				{
					key: "target",
					prompt: "@User who should be added a trans flag to.",
					type: "user",
				},
			],
		})
	}

	run = async function(message, { target }) {
		return flag.make(message, target, colors)
	}
}
