require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var spotSong = process.argv[3];
function spotifyThis(spotSong) {
    if (spotSong === undefined) {
        console.log("--------------");
        console.log("Remember to enter a song, or you will only get to listen to Ace of Base... FOREVER!")
        spotify.search({ type: "track", query: "The Sign Ace Of Base" }, function (err, data) {
            if (err) {
                console.log("-------Oh Noes! Errors!-------")
                return console.log('Error occurred: ' + err);
            }
            var firstItem = data.tracks.items[0];
            console.log("Artist: " + firstItem.artists[0].name);
            console.log("Song Name: " + firstItem.name);
            console.log("Listen to the song: " + firstItem.external_urls.spotify);
            console.log("Album Title: " + firstItem.album.name);
            console.log("--------------");
        })
    } else  
    spotify.search({ type: 'track', query: spotSong }, function (err, data) {
        if (err) {
            console.log("-------Oh Noes! Errors!-------")
            return console.log('Error occurred: ' + err);
        }
        var firstItem = data.tracks.items[0];
        console.log("--------------");
        console.log("Artist: " + firstItem.artists[0].name);
        console.log("Song Name: " + firstItem.name);
        console.log("Listen to the song: " + firstItem.external_urls.spotify);
        console.log("Album Title: " + firstItem.album.name);
        console.log("--------------");
    })
};




function dispatch(command, argument) {
    if (command === "spotify-this-song") {
        spotifyThis(argument)
    } else if (command === "concert-this") {
        concertThis(argument)
    } else if (command === "movie-this") {
        movieThis(argument)
    } else if (command === "do-what-it-says") {
        doWhatItSays(argument)
    }
}

var command = process.argv[2];
var argument = process.argv[3];
dispatch(command, argument);


function movieThis(movieName) {
    if (movieName === undefined) {
        console.log("--------------");
        console.log("It seems you have forgotten to enter a movie title. Perhaps you should check out 'Mr. Nobody.' It's currently on Netflix.")
        axios
        .get("http://www.omdbapi.com/?t=Mr+Nobody&apikey=3eb0741a")
        .then(function (response) {
            console.log("--------------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Production Country: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot Summary: " + response.data.Plot);
            console.log("Leading Cast: " + response.data.Actors);
            console.log("--------------");
        })
        .catch(function (error) {
            if (error.response) {
                console.log("-------Oh Noes! Errors!-------")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("-------Oh Noes! Errors!-------")
                console.log(error.request);
            } else {
                console.log("-------Oh Noes! Errors!-------")
                console.log("Error", error.message);
            }
            console.log("-------Oh Noes! Errors!-------")
            console.log(error.config);
        })
    } else {
    axios
        .get("http://www.omdbapi.com/?t=" + movieName + "&apikey=3eb0741a")
        .then(function (response) {
            console.log("--------------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Production Country: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot Summary: " + response.data.Plot);
            console.log("Leading Cast: " + response.data.Actors);
            console.log("--------------");
        })
        .catch(function (error) {
            if (error.response) {
                console.log("-------Oh Noes! Errors!-------")
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("-------Oh Noes! Errors!-------")
                console.log(error.request);
            } else {
                console.log("-------Oh Noes! Errors!-------")
                console.log("Error", error.message);
            }
            console.log("-------Oh Noes! Errors!-------")
            console.log(error.config);
        })
}};
var blank = '';
function concertThis(artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios
        .get(url)
        .then(function (response) {
            console.log("--------------");
            console.log(url);
            console.log(response.data.length)
            for (var i = 0; i < response.data.length; ++i) {
                console.log("Concert, Festival, or Venue Name: " + response.data[i].venue.name);
                if (response.data[i].venue.region === blank){
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                } else {
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            }
                var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log("Event Date: " + concertDate);
                console.log("--------------");
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("-------Oh Noes! Errors!-------");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log("-------Oh Noes! Errors!-------")
                console.log(error.request);
            } else {
                console.log("-------Oh Noes! Errors!-------")
                console.log("Error", error.message);
            }
            console.log("-------Oh Noes! Errors!-------")
            console.log(error.config);
        });
}

function doWhatItSays(argument) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");
        var command = output[0];
        var argument = output[1];
        dispatch(command, argument);
    })
}
;
