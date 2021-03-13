const nodeHtmlToImage = require('node-html-to-image')

const board = {
  categories: [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
//    "Sum",
//    "Bonus",
//    "1 pair",
//    "2 pairs",
//    "3 pairs",
//    "3 Alike",
//    "4 Alike",
//    "5 Alike",
//    "Small Str.",
//    "Large Str.",
//    "Full Str.",
//    "Hut",
//    "House",
//    "Tower",
//    "Chance",
//    "Yatzy",
    "Total",
  ],
  currentCategory: 3,
  currentPlayer: 3,
  players: [
    {
      displayName: "A",
      scores: [" ", " ", " ", " ", " ", " ", " "]
    },
    {
      displayName: "B",
      scores: [" ", " ", " ", " ", " ", " ", " "]
    },
    {
      displayName: "C",
      scores: [" ", " ", " ", " ", " ", " ", " "]
    },
    {
      displayName: "D",
      scores: [" ", " ", " ", " ", " ", " ", " "]
    },
//    {
//      displayName: "E",
//      scores: [0, 0, 0, 0, 0, 0, 0]
//    },
//    {
//      displayName: "F",
//      scores: [0, 0, 0, 0, 0, 0, 0]
//    },
//    {
//      displayName: "G",
//      scores: [0, 0, 0, 0, 0, 0, 0]
//    },
//    {
//      displayName: "H",
//      scores: [0, 0, 0, 0, 0, 0, 0]
//    }
  ]
}

exports.generate = async function (board) {

  let html = `<!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          width: 380px;

        }
        table {
          border-collapse: collapse;
          border: 2px solid black;
        }
        td {
          border: 1px solid black;
          min-width: 28px;
          text-align: center;
        }
        .side {
          text-align: left;
          background-color: #b0fcb7;
        }
        .bonus {
          background-color: #b0fcb7;
          border-bottom: 2px solid black;
          border-top: 2px solid black;
        }
        .top {
          border-bottom: 2px solid black;
          background-color: #fcb7b0;
        }
        .red {
          background-color: #fcb7b0 !important;
        }
        .blue {
          background-color: #b0f6fc !important;
        }
        .sum {
          border-bottom: 2px solid black;
          border-top: 2px solid black;
          background-color: #b0f6fc;
        }
      </style>
    </head>
    <body>
      <table style="width:100%">
        <tr><td class="top side"></td>`

  board.players.forEach((player, p) => {
    if (p == board.currentPlayer) {
      html += "<td class=\"blue top\">" + player.displayName + "</td>"
    }else {
      html += "<td class=\"top\">" + player.displayName + "</td>"
    }

  });

  board.categories.forEach((category, c) => {
    if (category == "Sum" || category == "Total") {
      html += "<tr><td class=\"sum side\">" + category + "</td>"
      board.players.forEach((player, p) => {
        html += "<td class=\"sum\">" + player.scores[c] + "</td>"
      });

    }else if (category == "Bonus" || category == "Yatzy"){
      html += "<tr><td class=\"side bonus\">" + category + "</td>"
      board.players.forEach((player, p) => {
        html += "<td class=\"bonus\">" + player.scores[c] + "</td>"
      });

    }else {
      if (board.currentCategory == c) {
        html += "<tr><td class=\"red side\">" + category + "</td>"
        board.players.forEach((player, p) => {
          html += "<td class=\"red\">" + player.scores[c] + "</td>"
        });
      }else {
        html += "<tr><td class=\"side\">" + category + "</td>"
        board.players.forEach((player, p) => {
          html += "<td>" + player.scores[c] + "</td>"
        });
      }
    }

    html += "</tr>"
  });

  html += "</table></body></html>"

  return await nodeHtmlToImage({
    html: html
  })
};
