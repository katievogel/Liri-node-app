# Liri-node-app

### Description

The LIRI Node App is an exercise in NodeJS to retrieve data from 3 separate APIs as well as various installed node packages. API URLS and keys are storedin external files and using node we are able to reach those APIs to pull our information, using javascript like a backend language.

This particular app will pull pieces of information on songs from Spotify, movie information from OMDB, and concert information from Bands In Town. The information will populate in the terminal as well as log to an external file.

### Organization

The app is organized with the majority of variables listed at the top, particularly those using 'require' to pull the information from the APIs and other libraries needed through the application.

The next portion created is the "logAndText" function used throughout the enitre app. This function combines console.log and fs.appendFileSync to write information to the terminal and the log.txt file. 

This is followed by the functions actually calling the information from the APIs. From Spotify it will pull, the artist's name, song name, song url, and the album name. 

From the OMDB api, it will pull the movie title, release year, imdb rating, rotten tomatoes rating, production country, language, plot summary, and leading cast.

From the Bands In Town API, it will pull the name of the venue or concert, location, and event date. One thing to note on the venue is that it may not be a specific place like a concert hall if the concert has a name or is part of a concert series. For example, instead of "The Mann Center" it might be "Summer Smash Tour" or similar. 

The last portions are for the do-what-it-says function where it takes a command and an argument from an external file and runs the same functions within the liri.js file based on what is in the external file. An additional function called 'dispatch' was created to account for each of the other functions and incorporated into the do-what-it-says functionality instead of rewriting code from all of the other functions.

### Using the Liri-Node-App

Below are instructions on how to use the app. To avoid errors, make sure that you have installed the correct node packages to the folder in order to run the app by running `npm install PACKAGE` in the terminal. 

1. Create a clone of the Liri-Node-App repository on your computer.
1. In your preferred code editor, navigate to the repository folder and open the "liri.js" file.
1. In the terminal, navigate to the repository folder on your machine. If you use VS code for code editor, you can just right-click and select 'Open in Terminal'.
1. All commands and arguments you want to run will be done so in the terminal. Below is how each should be entered to get the information.
    1. Song Information: enter `node liri spotify-this-song "YOUR SONG CHOICE"` and hit enter
    1. Move Information: enter `node liri movie-this "YOUR MOVIE CHOICE"` and hit enter
    1. Concert Information: enter `node liri concert-this "YOUR BAND CHOICE"` and hit enter
    1. Do What It Says: enter `node liri  do-what-it-says` and hit enter. 
        1. Note: This one does not take an additional argument as the argument comes from the "random.txt" file. You may update the information in the "random.txt" file to see this work. Movie and Band/Musician names work best without quotes here.
1. A default option will populate for the Song Information and the Movie Information if you do not enter an argument. 
1. As you request information and see it populate in the terminal, be sure to look at the "log.txt" file to see it populate there as well.

### Media

Below are images / video / gif links of the app in action

### Deployed Link

This app is not associated with an html page. In order to use the app, you need to copy the repository to you computer.
* Repository Link: https://github.com/katievogel/Liri-node-app

### Technologies Used
* Javascript
* NodeJS
* Axios
* fs
* Spotify API / node-spotify-api
* Bands In Town API
* OMDB API
* Moment
* Dotenv
