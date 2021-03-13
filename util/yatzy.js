const yatzyboard = require("@util/yatzyboard.js");
const { MessageAttachment } = require("discord.js")

function countInArray(array, countable) {
  var count = 0;
  for(var i = 0; i < array.length; ++i){
    if(array[i] == countable) count++;
  }
  return count
}
function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = function (guild, channel, gameType, forced) {
  this.catalogue = {
    ones: {
      display: "Ones",
      scoring: (die, game) => {
        return countInArray(die, 1) * 1
      }
    },
    twoos: {
      scoring: (die, game) => {
        return countInArray(die, 2) * 2
      }
    },
    threes: {
      display: "Threes",
      scoring: (die, game) => {
        return countInArray(die, 3) * 3
      }
    },
    fours: {
      display: "Fours",
      scoring: (die, game) => {
        return countInArray(die, 4) * 4
      }
    },
    fives: {
      display: "Fives",
      scoring: (die, game) => {
        return countInArray(die, 5) * 5
      }
    },
    sixes: {
      display: "Sixes",
      scoring: (die, game) => {
        return countInArray(die, 6) * 6
      }
    },
    total: {
      sum: true,
      display: "total"
    }
  }

  this.addPlayer = (displayName, user, host = false) => {
    let player = {
      user: user,
      host: host,
      displayName: displayName,
      die: [],
      throws: 0,
      scores: []
    }
    for (var i = 0; i < this.categories.length; i++) {
      player.scores.push(" ")
    }
    this.players.push(player)
    if (host) {
      this.host = user
      this.hostid = user.id
    }
  }

  this.startGame = async () => {
    this.started = true
    this.players = shuffleArray(this.players)
    this.nextPlayer()
  }

  this.nextPlayer = async () => {
    this.currentPlayer += 1
    if (this.forced) {
      this.currentCategory += 1
    }

    this.channel.send("<@" + this.players[this.currentPlayer].user + ">, It is " + this.players[this.currentPlayer].displayName + "'s turn.")

    this.displayBoard()
  }

  this.displayBoard = async () => {
    const attachment = new MessageAttachment(await yatzyboard.generate(this),"yatzy.png")
    this.channel.send(attachment)
  }

  let categories = []

  if (gameType == "mini") {
    categories = [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes"
    ]
  }

  categories.push("total")

  this.channel = channel
  this.guild = guild
  this.started = false
  this.type = gameType
  this.forced = forced
  this.categories = categories
  this.currentCategory = -1
  this.currentPlayer = -1
  this.players = []
};
