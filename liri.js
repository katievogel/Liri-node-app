require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');

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
var movieName = process.argv[3];

if (process.argv[2] === "movie-this") {
axios
  .get("http://www.omdbapi.com/?t=" + movieName + "&apikey=3eb0741a")
  .then(function(response) {
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
    console.log("Production Country: " + response.data.Country);
    console.log("Language(s): " + response.data.Language);
    console.log("Plot Summary: " + response.data.Plot);
    console.log("Leading Cast: " + response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  })
};

var artist= process.argv[3];
if (process.argv[2] === "concert-this")
  axios
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
    console.log(response.data.length)
    for (var i = 0; i < response.data.length; ++i) {
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
        var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
        console.log(concertDate);
    }
    
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
