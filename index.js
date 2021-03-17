require('module-alias/register')

const Commando = require("discord.js-commando");
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

  //console.log(msg.content);
});

client.login(tokens.utilToken);

client.yatzy = {}
client.radio = {}
