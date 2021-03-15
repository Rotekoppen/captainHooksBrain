const nodeHtmlToImage = require('node-html-to-image')

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
    if (category == "sum" || category == "total") {
      html += "<tr><td class=\"sum side\">" + board.catalogue[category].display + "</td>"
      board.players.forEach((player, p) => {
        html += "<td class=\"sum\">" + player.scores[c] + "</td>"
      });

    }else if (category == "bonus" || category == "yatzy"){
      html += "<tr><td class=\"side bonus\">" + board.catalogue[category].display + "</td>"
      board.players.forEach((player, p) => {
        html += "<td class=\"bonus\">" + player.scores[c] + "</td>"
      });

    }else {
      if (board.currentCategory == c) {
        html += "<tr><td class=\"red side\">" + board.catalogue[category].display + "</td>"
        board.players.forEach((player, p) => {
          html += "<td class=\"red\">" + player.scores[c] + "</td>"
        });
      }else {
        html += "<tr><td class=\"side\">" + board.catalogue[category].display + "</td>"
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
