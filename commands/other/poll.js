const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { blockWidth } = require("@root/config.json");

module.exports = class pollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      aliases: ["vote", "survey"],
      group: "other",
      memberName: "poll",
      description: "Start a poll.",
      args: [
				{
					key: "choices",
					prompt: "The choices in a semicolon (;) separated list where the first character is the emoji.",
					type: "string",
				},
			],
    });
  }

  buildMessage(poll) {
    let total = 0
    let most = 0

    poll.forEach((choice, i) => {
      total += choice.count
      if (choice.count > most) {
        most = choice.count
      }
    });

    let out = ""
    for (var i = 0; i < poll.length; i++) {
      if (poll[i].custom) {
        out += poll[i].custom + " " + poll[i].text + "\n"
      }else {
        out += poll[i].emoji + " " + poll[i].text + "\n"
      }

      let percentage = poll[i].count / most

      if (total == 0) {
        percentage = 1
      }

      out += this.multiplySymbol("█", Math.round(percentage * blockWidth)) + " "


      percentage = poll[i].count / total

      if (total == 0) {
        percentage = 1 / poll.length
      }

      out += Math.round(percentage * 100) + "%\n\n"

    }
    return out
  }

  multiplySymbol(symbol, times) {
    let out = ""
    for (var i = 0; i < times; i++) {
      out += symbol
    }
    return out
  }

  async run(message, args) {
    let choices_raw = args.choices.split(";")
    let choices = []
    choices_raw.forEach((choice, i) => {
      choice = choice.replace(/^ */g, "")
      choice = choice += " "
      let emoji = ""
      let text = ""
      let custom = false
      if (choice.startsWith("<")) {
        emoji = choice.replace(/^(<(.*):)/g, "").replace(/>.*$/g, "")
        text = choice.replace(/^(.*(?=> ))>\s*/gmu, "")
        custom = choice.replace(/>.*/gmu, "") + ">"
      }else {
        emoji = choice.replace(/(?!^..).*/gu, "")
        text = choice.replace(/^.\s*/gmu, "")
      }
      choices.push({
        emoji: emoji,
        text: text,
        custom: custom,
        count: 0
      })
    });

    let poll = await message.channel.send("Setting up poll, please wait.")

    for (var i = 0; i < choices.length; i++) {
      let emoji = undefined
      try {
        emoji = await poll.react(choices[i].emoji);
      } catch (e) {
          return poll.edit("Could not assign emojis, check your syntax.")
      }
      choices[i].emojiName = emoji.emoji.name
    }

    const filter = (reaction, user) => {return !user.bot};

    var collector = await poll.createReactionCollector(filter, { dispose: true, time: 4 * 60 * 60 * 1000 });

    collector.on('collect', (reaction, user) => {
      let choice = choices.find(x => x.emojiName === reaction.emoji.name);
      if (choice != undefined) {
        choice.count += 1
        poll.edit(this.buildMessage(choices) + "*React with your vote:*")
      }
    });

    collector.on('remove', (reaction, user) => {
      let choice = choices.find(x => x.emojiName === reaction.emoji.name);
      if (choice != undefined) {
        choice.count -= 1
        poll.edit(this.buildMessage(choices) + "*React with your vote:*")
      }
    });

    collector.on('end', collected => {
      poll.edit(this.buildMessage(choices) + "*- poll ended -*")
    });

    await poll.edit(this.buildMessage(choices) + "*React with your vote:*")

    return poll
  }
}
