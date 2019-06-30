require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

axios
  .get("http://www.omdbapi.com/?i=tt3896198&apikey=3eb0741a")
  .then(function(response) {
    console.log(response.data);
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

  axios
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
    console.log(response.data);
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