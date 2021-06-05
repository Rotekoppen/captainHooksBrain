const { Command } = require("discord.js-commando");

function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
   return arr;
}

module.exports = class moveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "move",
      group: "radio",
      guildOnly: true,
      aliases: ["m"],
      memberName: "move",
      description: "Moves song from entry number to entry number.",
      args: [
      	{
      		key: "from",
      		prompt: "What entry number to move.",
      		type: "integer"
      	},
      	{
      		key: "to",
      		prompt: "Where to move that entry number.",
      		type: "integer"
      	},
      ]
    });
  }

  async run(message, { from, to }) {
    let queue = this.client.distube.getQueue(message)
    queue.songs = move(queue.songs, from, to)
    this.client.messager.move(message, from, to);
  }
}
