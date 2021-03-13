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
function throwDie(die) {
  for (var i = 0; i < die.length; i++) {
    if (die[i] == 0) {
      die[i] = Math.floor(6 * Math.random()) + 1
    }
  }
  return die
}

module.exports = function (guild, channel, gameType, forced) {
  this.catalogue = {
    ones: {
      sum: false,
      calcAfter: false,
      display: "Ones",
      scoring: (die) => {
        return countInArray(die, 1) * 1
      }
    },
    twos: {
      sum: false,
      calcAfter: false,
      display: "Twoos",
      scoring: (die) => {
        return countInArray(die, 2) * 2
      }
    },
    threes: {
      sum: false,
      calcAfter: false,
      display: "Threes",
      scoring: (die) => {
        return countInArray(die, 3) * 3
      }
    },
    fours: {
      sum: false,
      calcAfter: false,
      display: "Fours",
      scoring: (die) => {
        return countInArray(die, 4) * 4
      }
    },
    fives: {
      sum: false,
      calcAfter: false,
      display: "Fives",
      scoring: (die) => {
        return countInArray(die, 5) * 5
      }
    },
    sixes: {
      sum: false,
      calcAfter: false,
      display: "Sixes",
      scoring: (die) => {
        return countInArray(die, 6) * 6
      }
    },
    total: {
      sum: true,
      calcAfter: true,
      display: "Total",
      scoring: (pid) => {
        let sum = 0
        for (var i = 0; i < this.players[pid].scores.length; i++) {
          if (!this.catalogue[this.categories[i]].sum) {
            sum += this.players[pid].scores[i]
          }
        }
        return sum
      }
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
    for (var i = 0; i < this.dieCount; i++) {
      player.die.push(0)
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

  this.throwDie = (pid) => {
    this.players[pid].die = throwDie(this.players[pid].die)
    this.players[pid].throws -= 1
    if (this.players[pid].throws == 0) {
      this.channel.send("<@" + this.players[this.currentPlayer].user + ">, " + this.players[this.currentPlayer].displayName + " threw `" + this.players[pid].die.join(" ") + "`")
      this.players[pid].scores[this.currentCategory] = this.catalogue[this.categories[this.currentCategory]].scoring(this.players[pid].die)
      this.nextPlayer()
    }else {
      this.channel.send("<@" + this.players[this.currentPlayer].user + ">, " + this.players[this.currentPlayer].displayName + " threw `" + this.players[pid].die.join(" ") + "` Select die to keep with `ykeep`")
    }
  }

  this.keepDie = (pid, keep) => {
    for (var i = 0; i < this.players[pid].die.length; i++) {
      if (!keep.includes(i + 1)) {
        this.players[pid].die[i] = 0
      }
    }
    this.throwDie(pid)
  }

  this.nextPlayer = async () => {
    this.currentPlayer += 1
    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0
      if (this.forced) {
        this.currentCategory += 1
        if (this.catalogue[this.categories[this.currentCategory]].calcAfter) {
          this.currentCategory += 1
        }
        if (this.currentCategory >= this.categories.length) {
          for (var p = 0; p < this.players.length; p++) {
            for (var i = 0; i < this.categories.length; i++) {
              if (this.catalogue[this.categories[i]].calcAfter) {
                this.players[p].scores[i] = this.catalogue[this.categories[i]].scoring(p)
              }
            }
          }
          this.currentPlayer = -1
          this.currentCategory = -1
          this.channel.send(
`\`\`\`
 ██████      ██     ██    ██  ████████
██    ██    ████    ███  ███  ██
██         ██  ██   ████████  ██
██  ████  ██    ██  ██ ██ ██  ██████
██    ██  ████████  ██    ██  ██
██    ██  ██    ██  ██    ██  ██
 ██████   ██    ██  ██    ██  ████████

 ██████   ██    ██  ████████  ███████
██    ██  ██    ██  ██        ██    ██
██    ██  ██    ██  ██        ██    ██
██    ██  ██    ██  ██████    ███████
██    ██   ██  ██   ██        ██  ██
██    ██    ████    ██        ██   ██
 ██████      ██     ████████  ██    ██
\`\`\``)
          this.displayBoard()
          this = undefined
          return
        }
      }
    }

    for (var i = 0; i < this.players[this.currentPlayer].die.length; i++) {
      this.players[this.currentPlayer].die[i] = 0
    }
    this.players[this.currentPlayer].throws = 3

    this.channel.send("<@" + this.players[this.currentPlayer].user + ">, It is " + this.players[this.currentPlayer].displayName + "'s turn. Use `ythrow` to throw your die.")

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

  this.dieCount = 5
  this.channel = channel
  this.guild = guild
  this.started = false
  this.type = gameType
  this.forced = forced
  this.categories = categories
  this.currentCategory = 0
  this.currentPlayer = -1
  this.players = []
};
