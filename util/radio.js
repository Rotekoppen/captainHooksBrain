const yts = require( 'yt-search' )
var ytdl = require('ytdl-core')

function song(type, url, name, thumbnail, requester, radio = false) {
  this.url = url //https://www.youtube.com/watch?v=dQw4w9WgXcQ
  this.name = name //Rick Astley - Never Gonna Give You Up (Video)
  this.type = type //(yt/http)
  this.thumbnail = thumbnail //https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg
  this.requester = requester //User who requested (string?)
  this.radio = radio //false
}

// regex test for youtube links /^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be).*/
// regex test for links in general /^(http(s{0,1}):\/\/).*/

module.exports = function(guild, text, voice) {
  this.playsong = function (song) {

  }
  this.addSong = async function (query, requester) {
    if (/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be)\/playlist\?list=.*/g.test(query)){
      const results = await yts({ listId: query.replace(/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be)\/playlist\?list=/g, "") })
      results.videos.forEach((video, i) => {
        const song = new song("yt", "https://www.youtube.com/watch?v=" + video.videoId, video.title, video.thumbnail, requester)
        this.queue.push(song)
      });

    } else if (/^(http(s{0,1}):\/\/){0,1}(www\.){0,1}youtu(be\.com|\.be).*/g.test(query)) {
      const metadata = await ytdl.getBasicInfo(query)
      const song = new song("yt", query, metadata.videoDetails.title, metadata.videoDetails.thumbnails.pop(), requester)
      this.queue.push(song)

    } else if (/^(http(s{0,1}):\/\/).*/g.test(query)) {
      const song = new song("http", query, "Audio on the web", undefined, requester)
      this.queue.push(song)

    } else {
      const results = await yts(query)
      const video = results.videos[0]
      const song = new song("yt", video.url, video.title, video.thumbnail, requester)
      this.queue.push(song)

    }

    if (this.queue.length == 1) {

    }
  }

  this.ytSearch = async function (query) {
    return await ytSearch(query, opts)
  }

  this.join = async function (text, voice) {
    this.text = text
    this.voice = voice
    this.connection = await voice.join()
  }

  this.queue = []
  this.history = []
}
