const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

exports.fetch = async function (subreddit, message) {
  message.channel.startTyping();

  const body = await fetch("https://www.reddit.com/r/" + subreddit + ".json?sort=top&t=week")
    .then(res => res.json())


  const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

  if (!allowed.length) return message.channel.send("It seems we are out of fresh memes!, Try again later.");

  const randomnumber = Math.floor(Math.random() * allowed.length)

  message.channel.stopTyping();
  return new MessageEmbed()
    .setColor("#FF4500")
    .setTitle(allowed[randomnumber].data.title)
    .setURL("https://www.reddit.com" + allowed[randomnumber].data.permalink)
    .setDescription("u/" + allowed[randomnumber].data.author + " <:updoot:738097812863975445> " + allowed[randomnumber].data.ups + " <:comment:809354301989847071> " + allowed[randomnumber].data.num_comments)
    .setImage(allowed[randomnumber].data.url)
    .setFooter("r/" + subreddit)
};
