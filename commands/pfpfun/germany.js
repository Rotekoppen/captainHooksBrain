const { Command } = require("discord.js-commando")
const flag = require("@util/flag.js");
const colors = ["#00000040", "#dd000040", "#ffce0040"]

module.exports = class germanyCommand extends Command {
	constructor(client) {
		super(client, {
			name: "germany",
			group: "pfpfun",
			memberName: "germany",
			aliases: ["tyskland", "deutchland"],
			description: "Adds a german flag to the profile picture of @'ted person'.",
			args: [
				{
					key: "target",
					prompt: "@User who should be germanened.",
					type: "user",
				},
			],
		})
	}

	run = async function(message, { target }) {
		return flag.make(message, target, colors)
	}
}
