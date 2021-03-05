const querystring = require("query-string");
const r2 = require("r2");

exports.getRandom = async function (api, key, sub_id) {
  var headers = {
    "X-API-KEY": key,
  }
  var query_params = {
    "has_breeds": true,
    "sub_id": sub_id,
    "limit": 1
  }

  let queryString = querystring.stringify(query_params);

  try {
    let _url = `https://api.the${api}api.com/` + `v1/images/search?${queryString}`;
    var response = await r2.get(_url, {
      headers
    }).json
  } catch (e) {
    console.log(e)
  }
  return response;
};
