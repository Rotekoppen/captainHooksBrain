// Modified version of https://github.com/AdenForshaw/theCatAPI-discord-commando-bot/blob/master/commands/fun/dog.js to fit my needs better

const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const dogcatapi = require("@util/dogcatapi.js");
const { DOG_API_KEY } = require("@root/../tokens.json");;

module.exports = class DogCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      aliases: ['woof', 'doggy', 'pupper'],
      group: "images",
      memberName: "dog",
      description: "Get a random image of a dog.",
    });
  }

  async run(message, args) {
    try {
      message.channel.startTyping();
      var images = await dogcatapi.getRandom("dog", DOG_API_KEY, message.author.username);

      var image = images[0];
      var breed = image.breeds[0];

      const embed = new MessageEmbed()
      	.setColor("#99FF00")
      	.setTitle(breed.name)
        .setDescription(breed.temperament)
      	.setImage(image.url)

      message.channel.stopTyping();
      return message.embed(embed)

    } catch (error) {
      message.channel.stopTyping();
      console.log(error)
    }
  }
}
