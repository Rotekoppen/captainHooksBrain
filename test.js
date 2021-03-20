const yts = require( 'yt-search' )
const yatzy = require("@util/yatzy.js");

a = (async () => {
  const r = await yts({ listId: 'PLPnCLQ4dNECop2t1SKbO-h7Gr2wr-yFVV' })

  console.log(r)
})
a()
