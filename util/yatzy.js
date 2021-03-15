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
    "ones": {
      sum: false,
      calcAfter: false,
      display: "Ones",
      scoring: (die) => {
        return countInArray(die, 1) * 1
      }
    },
    "twos": {
      sum: false,
      calcAfter: false,
      display: "Twos",
      scoring: (die) => {
        return countInArray(die, 2) * 2
      }
    },
    "threes": {
      sum: false,
      calcAfter: false,
      display: "Threes",
      scoring: (die) => {
        return countInArray(die, 3) * 3
      }
    },
    "fours": {
      sum: false,
      calcAfter: false,
      display: "Fours",
      scoring: (die) => {
        return countInArray(die, 4) * 4
      }
    },
    "fives": {
      sum: false,
      calcAfter: false,
      display: "Fives",
      scoring: (die) => {
        return countInArray(die, 5) * 5
      }
    },
    "sixes": {
      sum: false,
      calcAfter: false,
      display: "Sixes",
      scoring: (die) => {
        return countInArray(die, 6) * 6
      }
    },
    "1pair": {
      sum: false,
      calcAfter: false,
      display: "1 pair",
      scoring: (die) => {
        for (var i = 6; i > 1; i--) {
          if (countInArray(die, i) >= 2) {
            return i * 2
          }
        }
        return 0
      }
    },
    "2pairs": {
      sum: false,
      calcAfter: false,
      display: "2 pairs",
      scoring: (die) => {
        let pairs = []
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 2) {
            pairs.push(i * 2)
          }
        }
        if (pairs.length >= 2) {
          return pairs[0] + pairs[1]
        }
        return 0
      }
    },
    "3pairs": {
      sum: false,
      calcAfter: false,
      display: "3 pairs",
      scoring: (die) => {
        let pairs = []
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 2) {
            pairs.push(i * 2)
          }
        }
        if (pairs.length >= 3) {
          return pairs[0] + pairs[1] + pairs[2]
        }
        return 0
      }
    },
    "3alike": {
      sum: false,
      calcAfter: false,
      display: "3 Alike",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 3) {
            return i * 3
          }
        }
        return 0
      }
    },
    "house": {
      sum: false,
      calcAfter: false,
      display: "House",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 3) {
            for (var ii = 6; ii >= 1; ii--) {
              if (ii != i) {
                if (countInArray(die, ii) >= 2) {
                  return i * 3 + ii * 2
                }
              }
            }
          }
        }
        return 0
      }
    },
    "mhouse": {
      sum: false,
      calcAfter: false,
      display: "House",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 3) {
            for (var ii = 6; ii >= 1; ii--) {
              if (ii != i) {
                if (countInArray(die, ii) >= 3) {
                  return i * 3 + ii * 3
                }
              }
            }
          }
        }
        return 0
      }
    },
    "tower": {
      sum: false,
      calcAfter: false,
      display: "Tower",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 4) {
            for (var ii = 6; ii >= 1; ii--) {
              if (ii != i) {
                if (countInArray(die, ii) >= 2) {
                  return i * 4 + ii * 2
                }
              }
            }
          }
        }
        return 0
      }
    },
    "hut": {
      sum: false,
      calcAfter: false,
      display: "Hut",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 3) {
            for (var ii = 6; ii >= 1; ii--) {
              if (ii != i) {
                if (countInArray(die, ii) >= 2) {
                  return i * 3 + ii * 2
                }
              }
            }
          }
        }
        return 0
      }
    },
    "4alike": {
      sum: false,
      calcAfter: false,
      display: "4 Alike",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 4) {
            return i * 4
          }
        }
        return 0
      }
    },
    "5alike": {
      sum: false,
      calcAfter: false,
      display: "5 Alike",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 5) {
            return i * 5
          }
        }
        return 0
      }
    },
    "sstraight": {
      sum: false,
      calcAfter: false,
      display: "S.str.",
      scoring: (die) => {
        let found = []
        for (var i = 1; i <= 5; i++) {
          if (countInArray(die, i) >= 1) {
            found.push(i)
          }
        }
        if (found.length == 5) {
          return 15
        }
        return 0
      }
    },
    "lstraight": {
      sum: false,
      calcAfter: false,
      display: "L.str.",
      scoring: (die) => {
        let found = []
        for (var i = 2; i <= 6; i++) {
          if (countInArray(die, i) >= 1) {
            found.push(i)
          }
        }
        if (found.length == 5) {
          return 20
        }
        return 0
      }
    },
    "fstraight": {
      sum: false,
      calcAfter: false,
      display: "F.str.",
      scoring: (die) => {
        let found = []
        for (var i = 1; i <= 6; i++) {
          if (countInArray(die, i) >= 1) {
            found.push(i)
          }
        }
        if (found.length == 6) {
          return 21
        }
        return 0
      }
    },
    "yatzy": {
      sum: false,
      calcAfter: false,
      display: "Yatzy",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 5) {
            return 50
          }
        }
        return 0
      }
    },
    "myatzy": {
      sum: false,
      calcAfter: false,
      display: "Yatzy",
      scoring: (die) => {
        for (var i = 6; i >= 1; i--) {
          if (countInArray(die, i) >= 6) {
            return 100
          }
        }
        return 0
      }
    },
    "chance": {
      sum: false,
      calcAfter: false,
      display: "Chance",
      scoring: (die) => {
        let sum = 0
        for (var i = 0; i < die.length; i++) {
          sum += die[i]
        }
        return sum
      }
    },
    "total": {
      sum: true,
      calcAfter: true,
      display: "Total",
      scoring: (pid, cid) => {
        let sum = 0
        for (var i = 0; i < this.players[pid].scores.length; i++) {
          if (!this.catalogue[this.categories[i]].sum) {
            sum += this.players[pid].scores[i]
          }
        }
        return sum
      }
    },
    "sum": {
      sum: true,
      calcAfter: true,
      display: "Sum",
      scoring: (pid, cid) => {
        let sum = 0
        for (var i = 0; i < cid; i++) {
          if (!this.catalogue[this.categories[i]].sum) {
            sum += this.players[pid].scores[i]
          }
        }
        return sum
      }
    },
    "bonus": {
      sum: false,
      calcAfter: true,
      display: "Bonus",
      scoring: (pid, cid) => {
        let sum = 0
        for (var i = 0; i < cid; i++) {
          if (!this.catalogue[this.categories[i]].sum) {
            sum += this.players[pid].scores[i]
          }
        }
        if (sum >= 63) {
          return 50
        }
        return 0
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
      this.channel.send("<@" + this.players[this.currentPlayer].user + ">, " + this.players[this.currentPlayer].displayName + " threw `" + this.players[pid].die.join(" ") + "` Select die to keep with `ykeep`, you have **" + this.players[pid].throws + "** throw(s) left.")
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
        while (this.catalogue[this.categories[this.currentCategory]].calcAfter) {
          this.currentCategory += 1
          if (this.currentCategory >= this.categories.length) {
            break
          }
        }
        if (this.currentCategory >= this.categories.length) {
          for (var p = 0; p < this.players.length; p++) {
            for (var i = 0; i < this.categories.length; i++) {
              if (this.catalogue[this.categories[i]].calcAfter) {
                this.players[p].scores[i] = this.catalogue[this.categories[i]].scoring(p, i)
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
          this.ended = true
          return
        }
      }
    }

    for (var i = 0; i < this.players[this.currentPlayer].die.length; i++) {
      this.players[this.currentPlayer].die[i] = 0
    }
    this.players[this.currentPlayer].throws = 3
    if (this.forced) {
      if (this.categories[this.currentCategory] == "yatzy") {
        this.players[this.currentPlayer].throws = 5
      }
      if (this.categories[this.currentCategory] == "myatzy") {
        this.players[this.currentPlayer].throws = 5
      }
    }

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
    this.dieCount = 5
  }

  if (gameType == "normal") {
    categories = [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
      "sum",
      "bonus",
      "1pair",
      "2pairs",
      "3alike",
      "4alike",
      "sstraight",
      "lstraight",
      "house",
      "chance",
      "yatzy",
    ]
    this.dieCount = 5
  }

  if (gameType == "maxi") {
    categories = [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
      "sum",
      "bonus",
      "1pair",
      "2pairs",
      "3pairs",
      "3alike",
      "4alike",
      "5alike",
      "sstraight",
      "lstraight",
      "fstraight",
      "hut",
      "mhouse",
      "tower",
      "chance",
      "myatzy",
    ]
    this.dieCount = 6
  }

  if (gameType == "random") {
    const selection = [
      "ones", "twos", "threes",
      "fours", "fives", "sixes",

      "1pair", "2pairs",
      "3alike", "4alike",

      "sstraight", "lstraight",

      "house",

      "chance", "yatzy",
    ]

    for (var i = 0; i < 6; i++) {
      categories.push(selection[Math.floor(Math.random() * selection.length)])
    }
    categories.push("sum")
    categories.push("bonus")
    for (var i = 0; i < 9; i++) {
      categories.push(selection[Math.floor(Math.random() * selection.length)])
    }
    this.dieCount = 5
  }

  if (gameType == "maxirandom") {
    const selection = [
      "ones", "twos", "threes",
      "fours", "fives", "sixes",

      "1pair", "2pairs", "3pairs",
      "3alike", "4alike", "5alike",

      "sstraight", "lstraight", "fstraight",

      "hut", "mhouse", "tower",

      "chance", "myatzy",
    ]

    for (var i = 0; i < 6; i++) {
      categories.push(selection[Math.floor(Math.random() * selection.length)])
    }
    categories.push("sum")
    categories.push("bonus")
    for (var i = 0; i < 14; i++) {
      categories.push(selection[Math.floor(Math.random() * selection.length)])
    }
    this.dieCount = 6
  }

  if (gameType == "chance") {
    categories = ["chance", "chance", "chance", "chance", "chance", "chance"]
    this.dieCount = 5
  }
  if (gameType == "yatzy") {
    categories = ["yatzy", "yatzy", "yatzy", "yatzy", "yatzy", "yatzy"]
    this.dieCount = 5
  }

  categories.push("total")

  this.channel = channel
  this.guild = guild
  this.ended = false
  this.started = false
  this.type = gameType
  this.forced = forced
  this.categories = categories
  this.currentCategory = 0
  this.currentPlayer = -1
  this.players = []
};
