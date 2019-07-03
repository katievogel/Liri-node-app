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
        logAndText("--------------");
        logAndText("Remember to enter a song, or you will only get to listen to Ace of Base... FOREVER!")
        spotify.search({ type: "track", query: "The Sign Ace Of Base" }, function (err, data) {
            if (err) {
                logAndText("-------Oh Noes! Errors!-------")
                return logAndText('Error occurred: ' + err);
            }
            var firstItem = data.tracks.items[0];
            logAndText("Artist: " + firstItem.artists[0].name);
            logAndText("Song Name: " + firstItem.name);
            logAndText("Listen to the song: " + firstItem.external_urls.spotify);
            logAndText("Album Title: " + firstItem.album.name);
            logAndText("--------------");
        })
    } else  
    spotify.search({ type: 'track', query: spotSong }, function (err, data) {
        if (err) {
            logAndText("-------Oh Noes! Errors!-------")
            return logAndText('Error occurred: ' + err);
        }
        var firstItem = data.tracks.items[0];
        logAndText("--------------");
        logAndText("Artist: " + firstItem.artists[0].name);
        logAndText("Song Name: " + firstItem.name);
        logAndText("Listen to the song: " + firstItem.external_urls.spotify);
        logAndText("Album Title: " + firstItem.album.name);
        logAndText("--------------");
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

function logAndText(msg) {
    console.log(msg);
    fs.appendFileSync("log.txt", msg+'\n');
}

function movieThis(movieName) {
    if (movieName === undefined) {
        logAndText("--------------");
        logAndText("It seems you have forgotten to enter a movie title. Perhaps you should check out 'Mr. Nobody.' It's currently on Netflix.")
        axios
        .get("http://www.omdbapi.com/?t=Mr+Nobody&apikey=3eb0741a")
        .then(function (response) {
            logAndText("--------------");
            logAndText("Movie Title: " + response.data.Title);
            logAndText("Release Year: " + response.data.Year);
            logAndText("IMDB Rating: " + response.data.imdbRating);
            logAndText("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            logAndText("Production Country: " + response.data.Country);
            logAndText("Language(s): " + response.data.Language);
            logAndText("Plot Summary: " + response.data.Plot);
            logAndText("Leading Cast: " + response.data.Actors);
            logAndText("--------------");
        })
        .catch(function (error) {
            if (error.response) {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText(error.response.data);
                logAndText(error.response.status);
                logAndText(error.response.headers);
            } else if (error.request) {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText(error.request);
            } else {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText("Error", error.message);
            }
            logAndText("-------Oh Noes! Errors!-------")
            logAndText(error.config);
        })
    } else {
    axios
        .get("http://www.omdbapi.com/?t=" + movieName + "&apikey=3eb0741a")
        .then(function (response) {
            logAndText("--------------");
            logAndText("Movie Title: " + response.data.Title);
            logAndText("Release Year: " + response.data.Year);
            logAndText("IMDB Rating: " + response.data.imdbRating);
            logAndText("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            logAndText("Production Country: " + response.data.Country);
            logAndText("Language(s): " + response.data.Language);
            logAndText("Plot Summary: " + response.data.Plot);
            logAndText("Leading Cast: " + response.data.Actors);
            logAndText("--------------");
        })
        .catch(function (error) {
            if (error.response) {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText(error.response.data);
                logAndText(error.response.status);
                logAndText(error.response.headers);
            } else if (error.request) {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText(error.request);
            } else {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText("Error", error.message);
            }
            logAndText("-------Oh Noes! Errors!-------")
            logAndText(error.config);
        })
}};
var blank = '';
function concertThis(artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios
        .get(url)
        .then(function (response) {
            logAndText("--------------");
            logAndText(url);
            logAndText(response.data.length)
            for (var i = 0; i < response.data.length; ++i) {
                logAndText("Concert, Festival, or Venue Name: " + response.data[i].venue.name);
                if (response.data[i].venue.region === blank){
                    logAndText("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                } else {
                    logAndText("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            }
                var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
                logAndText("Event Date: " + concertDate);
                logAndText("--------------");
            }
        })
        .catch(function (error) {
            if (error.response) {
                logAndText("-------Oh Noes! Errors!-------");
                logAndText(error.response.data);
                logAndText(error.response.status);
                logAndText(error.response.headers);
            } else if (error.request) {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText(error.request);
            } else {
                logAndText("-------Oh Noes! Errors!-------")
                logAndText("Error", error.message);
            }
            logAndText("-------Oh Noes! Errors!-------")
            logAndText(error.config);
        });
}

function doWhatItSays(argument) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return logAndText(err);
        }
        var output = data.split(",");
        var command = output[0];
        var argument = output[1];
        dispatch(command, argument);
    })
}
;

