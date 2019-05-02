require("dotenv").config();

// requiring keys file and important node package "fs"
var keys = require("./keys.js");
var fs = require("fs");

// making sure you have what you need
var music = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bands = require("bands-in-town");
var request = require("request");
var omdb = require("omdb-api");

// this keeps track of your input, [2] is your command
var userCommand = process.argv[2];
var userInput = process.argv.splice(3).join(" ");

// your song or movie title is stored here
var title = "";

// url built for your movie choice
var queryURL;

// this is how Liri directs your command
switch (userCommand) {
    case "concert-this":
        concertThis(userInput);
        break;

    case "spotify-this-song":
        spotifyThis(userInput);
        break;

    case "movie-this":
        setMovie();
        movieThis(userInput);
        break;
    
    case "do-what-it-says":
        doThis();
        break;

    default:
        console.log("Please choose a command I can understand. Type: concert-this, spotify-this-song, movie-this, or do-what-it-says.");
        break;
}

// BANDS IN TOWN
function concertThis(userInput) {
    if (userInput == null) {
        console.log("An error has occurred. Please enter an artist.");
    }
}

// SPOTIFY
function spotifyThis(userInput) {
    if (userInput == null){
        userInput = "The Sign";
    }

    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data) {
        if (err) {
            console.log("An error has occurred." + err);            
        } else {
            console.log("\n------------------\n");
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Link: " + data.tracks.items[0].preview_url);
            console.log("\n------------------\n");  
        }
    });
}

// OMDB
function movieThis(userInput) {
    if (userInput == null) {
        userInput = "Mr. Nobody";
    }

    queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("An error has occurred." + error);
        } else {

        }
    });

}




