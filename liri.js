require("dotenv").config();

// requiring keys file and important node package "fs"
var keys = require("./key");
var fs = require("fs");

// making sure you have what you need
var Spotify = require("node-spotify-api");
var request = require("request");
var axios = require("axios");

// this keeps track of your input, [2] is your command
var userCommand = process.argv[2];
var userInput = process.argv.splice(3).join(" ");

// url built for your movie choice
var queryURL;

// useful variable for writing out things
var line = "\n------------------------------------\n"

// this is how Liri directs your command
function commandDirectory() {
    switch (userCommand) {
        case "concert-this":
            concertThis(userInput);
            break;

        case "spotify-this-song":
            spotifyThis(userInput);
            break;

        case "movie-this":
            movieThis(userInput);
            break;

        case "do-what-it-says":
            doThis();
            break;

        default:
            console.log("Please choose a command I can understand. Type: concert-this, spotify-this-song, movie-this, or do-what-it-says.");
            break;
    }
}

commandDirectory();

// BANDS IN TOWN
function concertThis(userInput) {
    if (userInput == null) {
        console.log("An error has occurred. Please enter an artist.");
    } else {
        axios({
            method: "get",
            url: "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp",
        }).then(function (response) {
            var yourConcert = response.data;

            console.log(line);
            console.log("Venue Name: " + yourConcert[0].venue.name);
            console.log("Venue Location: " + yourConcert[0].venue.city + ", " + yourConcert[0].venue.country);
            console.log("Event Date: " + yourConcert[0].datetime);
            console.log(line);
        });
    }
}

// SPOTIFY
function spotifyThis(userInput) {
    var spotify = new Spotify(keys.spotify);

    if (userInput === null) {
        userInput = "The Sign";
    };

    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data) {
        if (err) {
            console.log("An error has occurred." + err);
        } else {
            console.log(line);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
            console.log(line);
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
        var omdbData = JSON.parse(body);

        if (error) {
            console.log("An error has occurred." + error);
        } else {
            console.log(line);
            console.log("Title: " + omdbData.Title);
            console.log("Year Released: " + omdbData.Year);
            console.log("IMDB Rating: " + omdbData.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + omdbData.Ratings[1].Value);
            console.log("Produced In: " + omdbData.Country);
            console.log("Language: " + omdbData.Language);
            console.log("Plot Summary: " + omdbData.Plot);
            console.log("Actors: " + omdbData.Actors);
            console.log(line);
        }
    });
}

// DO WHAT IT SAYS (by it we mean random.txt)
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(line);
            console.log("An error has occurred." + error);
            console.log(line);
        }
        var dataArr = data.split(",");
        var firstSlice = dataArr[0];
        var secondSlice = dataArr[1];
        userCommand = firstSlice;
        userInput = secondSlice;
        commandDirectory();
    });
}