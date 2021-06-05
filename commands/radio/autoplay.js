const { Command } = require("discord.js-commando");

module.exports = class autoplayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "autoplay",
      group: "radio",
      guildOnly: true,
      aliases: ["ap"],
      memberName: "autoplay",
      description: "Enables autoplay, plays the next video youtube reccomends, might be total crap, might not."
    });
  }

  async run(message) {
    if (this.client.distube.toggleAutoplay(message)) {
      message.channel.send('Enabled autoplay')
    }else {
      message.channel.send('Disabled autoplay')
    }
  }
}
