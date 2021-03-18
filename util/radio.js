const yts = require( 'yt-search' )
const ytdl = require('ytdl-core-discord');
const { MessageEmbed } = require("discord.js");

function Song(type, url, name, thumbnail, requester, radio = false) {
  this.url = url, //https://www.youtube.com/watch?v=dQw4w9WgXcQ
  this.name = name, //Rick Astley - Never Gonna Give You Up (Video)
  this.type = type, //(yt/http)
  this.thumbnail = thumbnail, //https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg
  this.requester = requester, //User who requested (string?)
  this.radio = radio //false
}

module.exports = function(guild, text, voice) {
  this.addSong = async function (query, requester) {
    let song = undefined
    let playlist = 0
    if (/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be)\/playlist\?list=.*/g.test(query)){
      const results = await yts({ listId: query.replace(/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be)\/playlist\?list=/g, "") })
      results.videos.forEach((video, i) => {
        song = new Song("yt", "https://www.youtube.com/watch?v=" + video.videoId, video.title, video.thumbnail, requester)
        this.queue.push(song)
      });
      playlist = results.videos.length

    } else if (/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be).*/g.test(query)) {
      const metadata = await ytdl.getBasicInfo(query)
      song = new Song("yt", query, metadata.videoDetails.title, metadata.videoDetails.thumbnails.pop().url, requester)
      this.queue.push(song)

    } else if (/^(http(s{0,1}):\/\/).*/g.test(query)) {
      song = new Song("http", query, "Audio on the web", undefined, requester)
      this.queue.push(song)

    } else {
      const results = await yts(query)
      const video = results.videos[0]
      song = new Song("yt", video.url, video.title, video.thumbnail, requester)
      this.queue.push(song)

    }

    const embed = new MessageEmbed()
    	.setColor("#8899dd")
      .setTitle("Added to queue")
      .setDescription("[" + song.name + "](" + song.url + ")")

    if (playlist != 0) {
      embed.setDescription(playlist + " song(s)")
    }else {
      if (song.thumbnail) {
        embed.setThumbnail(song.thumbnail)
      }
    }


    if (!this.playing) {
      this.playnext()
      embed.setTitle("Started playing")
    }
    return this.text.send(embed)
  }

  this.join = async function (text, voice) {
    this.text = text
    this.voice = voice
    this.connection = await voice.join()
  }

  this.playnext = async function () {
    if (this.queue.length == 0) {
      this.playing = false
      return
    }
    let song = this.queue.shift()
    this.history.push(song)
    await this.play(song)
  }

  this.play = async function(song) {
    this.current = song
    this.playing = true
    if (this.current.type == "yt") {
      this.dispatcher = this.connection.play(await ytdl(this.current.url), { type: 'opus' })
    }else{
      this.dispatcher = this.connection.play(this.current.url)
    }

    this.dispatcher.on('start', () => {
    });

    this.dispatcher.on('finish', () => {
      this.playnext()
    });

    this.dispatcher.on('error', console.error);
  }

  this.connection = undefined
  this.dispatcher = undefined
  this.guild = guild
  this.text = text
  this.voice = voice
  this.playing = false
  this.queue = []
  this.history = []
}
