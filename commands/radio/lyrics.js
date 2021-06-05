const { Command } = require("discord.js-commando");
const Genius = require("genius-lyrics");
const tokens = require('../../../tokens.json')
const Client = new Genius.Client(tokens.genius);

module.exports = class lyricsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "lyrics",
      group: "radio",
      guildOnly: true,
      aliases: ["l"],
      memberName: "lyrics",
      description: "Finds the lyrics to whats currently playing or supplied searchword.",
      args: [
      	{
      		key: "query",
      		prompt: "Title of the music.",
          default: "",
      		type: "string"
      	},
      ]
    });
  }

  async run(message, { query }) {
    if (query == "") {
      let queue = this.client.distube.getQueue(message)
      if (queue == undefined) {
        this.messager.error.NotPlaying(message)
        return
      }else {
        query = queue.songs[0].name
      }
    }
    const searches = await Client.songs.search(query)
    this.client.messager.lyrics(message, await searches[0].lyrics(), searches[0].fullTitle, searches[0].thumbnail)
  }
}
