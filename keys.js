console.log('Please find your requested info below!');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
var keys = require("./keys.js");