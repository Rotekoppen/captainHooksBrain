const { Command } = require("discord.js-commando");

module.exports = class inviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      group: "other",
      memberName: "invite",
      description: "Add the bot to your own server",
    });
  }

  async run(message, args) {
    message.author.dmChannel.send(
      `Add the bot to your server using 'https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot'`
    );
  }
}
