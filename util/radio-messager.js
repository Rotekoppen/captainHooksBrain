const { MessageEmbed } = require('discord.js');

module.exports = function(color) {
  this.createdistube = function(distube) {
    this.distube = distube

    distube.on('playSong', (message, queue, song) => {
      message.channel.send(new MessageEmbed()
      .setTitle(song.name)
      .setDescription(`Started playing\n[link](${song.url}) | Duration: ${song.formattedDuration}`)
      .setImage(song.thumbnail)
      .setColor(color)
      .setFooter('Requested by ' + song.user.username, song.user.displayAvatarURL({size: 64}))
    )})

    distube.on('addSong', (message, queue, song) => {
      message.channel.send(new MessageEmbed()
      .setTitle(song.name)
      .setDescription(`Added to the queue\n[link](${song.url}) | Duration: ${song.formattedDuration}`)
      .setImage(song.thumbnail)
      .setColor(color)
      .setFooter('Requested by ' + song.user.username, song.user.displayAvatarURL({size: 64}))
    )})

    distube.on('playList', (message, queue, playlist, song) => {
      message.channel.send(new MessageEmbed()
      .setTitle(`Added playlist ${playlist.name} to queue (${playlist.songs.length} songs)`)
      .setDescription(`Started playing ${song.name}\n[link](${song.url}) | Duration: ${song.formattedDuration}`)
      .setImage(song.thumbnail)
      .setColor(color)
      .setFooter('Requested by ' + song.user.username, song.user.displayAvatarURL({size: 64}))
    )})

    distube.on('addList', (message, queue, playlist) => {
      message.channel.send(new MessageEmbed()
      .setTitle(`Added playlist ${playlist.name} to queue (${playlist.songs.length} songs)`)
      .setColor(color)
      .setFooter('Requested by ' + playlist.user.username, song.user.displayAvatarURL({size: 64}))
    )})

    return distube
  }

  this.queue = function(message) {
    let queue = this.distube.getQueue(message);
    if (queue != undefined) {
      let desc = ""
      var i = 1
      for (; i < Math.min(queue.songs.length, 11); i++) {
        desc += `**${i}** | [${queue.songs[i].name}](${queue.songs[i].url}) - ${queue.songs[i].formattedDuration}\n`
      }
      if (i < queue.songs.length) {
        desc += `**+ ${queue.songs.length - i}** more`
      }
      if (desc == "") {
        desc = "The queue is empty"
      }
      message.channel.send(new MessageEmbed()
      .setTitle('Current queue')
      .setDescription(desc)
      .setColor(color))
    }else {
      this.error.NotPlaying(message)
    }
  }

  this.nowplaying = function(message) {
    let queue = this.distube.getQueue(message);
    if (queue != undefined) {
      let song = queue.songs[0]
      message.channel.send(new MessageEmbed()
      .setTitle(song.name)
      .setDescription(`Currently Playing\n[link](${song.url}) | ${queue.formattedCurrentTime}/${song.formattedDuration}${(song.paused) ? ' (Paused)' : ''} `)
      .setImage(song.thumbnail)
      .setColor(color)
      .addFields(
    		{ name: 'Volume', value: `${queue.volume}%`, inline: true },
    		{ name: 'Filter', value: `${queue.filter || 'Off'}`, inline: true },
    		{ name: 'Loop', value: `${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}`, inline: true },
        { name: 'Autoplay', value: `${queue.autoplay ? 'On' : 'Off'}`, inline: true }
    	)
      .setFooter('Requested by ' + song.user.username, song.user.displayAvatarURL({size: 64})))
    }else {
      this.error.NotPlaying(message)
    }
  }

  this.shuffle = function(message) {
    message.channel.send(new MessageEmbed()
    .setTitle('Shuffled the queue')
    .setColor(color))
  }

  this.move = function(message, from, to) {
    message.channel.send(new MessageEmbed()
    .setTitle(`Moved song from ${from} to ${to}`)
    .setColor(color))
  }

  this.lyrics = function(message, lyrics, title,thumbnail) {
    message.channel.send(new MessageEmbed()
    .setTitle(title)
    .setDescription(lyrics)
    .setThumbnail(thumbnail)
    .setColor(color))
  }

  this.grab = function(message, song) {
    message.author.send(`You grabbed this song: ${song.url}`)
  }

  this.error = {
    NotPlaying: function(message) {
      message.channel.send(new MessageEmbed()
      .setTitle('Nothing is currently playing')
      .setColor(color))
    },
    EmptyQueue: function(message) {
      message.channel.send(new MessageEmbed()
      .setTitle('The queue is empty')
      .setColor(color))
    },
  }
}
