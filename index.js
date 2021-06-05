require('module-alias/register')

const Commando = require("discord.js-commando");
const Messager = require('@util/radio-messager');
const DisTube = require("distube");
const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const tokens = require("@root/../tokens.json");
const config = require("@root/config.json");

const client = new Commando.Client({
  owner: config.owner,
  commandPrefix: config.prefix,
  invite: config.invite,
  disableEveryone: config.disableEveryone
});


client.registry
  .registerGroups(config.groups)
  .registerDefaults()
//.registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));


client.setProvider(
  sqlite.open({ filename: "./storage/guildsettings.db", driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on("ready", () => {
  console.log(
    `Logged in as ${client.user.tag}!\nAdd the bot to your server using\n'https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot'`
  );
});

client.on("message", async msg => {
  if (msg.channel.id == "819183218107875388") {
    if (msg.content != "hei") {
      msg.delete()
    }
  }

  console.log(msg.content);
});


client.messager = new Messager("#843da4")
client.distube = client.messager.createdistube(new DisTube(client, config.distube))

//DisTube overwrites (improvements uwu)
//Features added: playtop
const ytpl = require("@distube/ytpl")

client.distube._handleSong = async function(message, song, skip=false, top=false) {
  if (!song) return;
  if (Array.isArray(song)) this._handlePlaylist(message, song, skip);
  else if (this.getQueue(message)) {
    let queue = this._addToQueue(message, song, skip, top);
    if (skip) this.skip(message);
    else this.emit("addSong", message, queue, song);
  } else {
    let queue = await this._newQueue(message, song);
    this.emit("playSong", message, queue, song);
  }
}

client.distube.play = async function(message, song, top=false) {
  if (!song) return;
  try {
    if (ytpl.validateID(song)) await this._handlePlaylist(message, song);
    else await this._handleSong(message, await this._resolveSong(message, song), false, top);
  } catch (e) {
    e.message = `play(${song}) encountered:\n${e.message}`;
    this._emitError(message, e);
  }
}

client.distube._addToQueue = async function(message, song, unshift=false, top=false) {
  let queue = this.getQueue(message);
  if (!queue) throw new Error("NotPlaying");
  if (!song) throw new Error("NoSong");
  if (top) {
    queue.songs.splice(1, 0, song);
  }else {
    if (unshift) {
      let playing = queue.songs.shift();
      queue.songs.unshift(playing, song);
    } else { queue.songs.push(song); }
  }
  return queue;
}

client.login(tokens.utilToken);

client.yatzy = {}
