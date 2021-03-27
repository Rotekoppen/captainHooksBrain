const { Command } = require("discord.js-commando")
const flag = require("@util/flag.js");
const colors = ["#ff000040", "#ff000040", "#ff000040", "#ffffff40", "#0000ff40", "#0000ff40", "#ffffff40", "#ff000040", "#ff000040", "#ff000040"]

module.exports = class norwayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "norway",
			group: "pfpfun",
			memberName: "norway",
			aliases: ["norge", "norweigan", "nor"],
			description: "Adds a \"norweigan flag\" to the profile picture of @'ted person'.",
			args: [
				{
					key: "target",
					prompt: "@User who should be norweiganed.",
					type: "user",
				},
			],
		})
	}

	run = async function(message, { target }) {
		return flag.make(message, target, colors)
	}
}
