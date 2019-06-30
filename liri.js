require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

if (process.argv[2] === "spotify-this-song") {
spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } 
    var firstItem = data.tracks.items[0];
    console.log("Artist: " + firstItem.artists[0].name);
    console.log("Song Name: " + firstItem.name); 
    console.log("Listen to the song: " + firstItem.external_urls.spotify);
    console.log("Album Title: " + firstItem.album.name);
    
  })
};

// axios
//   .get("http://www.omdbapi.com/?i=tt3896198&apikey=3eb0741a")
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

//   axios
//   .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });
