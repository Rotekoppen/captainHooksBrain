// Modified version of https://github.com/AdenForshaw/theCatAPI-discord-commando-bot/blob/master/commands/fun/cat.js to fit my needs better

const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const dogcatapi = require("@util/dogcatapi.js");
const { CAT_API_KEY } = require("@root/../tokens.json");;

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: "cat",
      aliases: ["meow", "nyan", "kitty"],
      group: "images",
      memberName: "cat",
      description: "Get facts about a cat.",
    });
  }

  async run(message, args) {
    message.channel.startTyping();
    try {
      var images = await dogcatapi.getRandom("cat", CAT_API_KEY, message.author.username);

      var image = images[0];
      var breed = image.breeds[0];

      const embed = new MessageEmbed()
      	.setColor("#0099FF")
      	.setTitle(breed.name)
      	.setURL(breed.wikipedia_url)
        .setDescription(breed.description)
      	.setImage(image.url)

      message.channel.stopTyping();
      return message.embed(embed)

    } catch (error) {
      message.channel.stopTyping();
      console.log(error)
    }
  }
}
