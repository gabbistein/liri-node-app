require("dotenv").config();

// requiring keys file and important node package "fs"
var keys = require("./key");
var fs = require("fs");

// making sure you have what you need
var Spotify = require("node-spotify-api");
var request = require("request");
var axios = require("axios");
// var bands = require("bands-in-town");
// var omdb = require("omdb-api");

// this keeps track of your input, [2] is your command
var userCommand = process.argv[2];
var userInput = process.argv.splice(3).join(" ");

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
    } else {
        axios({
            method: "get",
            url: "https://rest.bandsintown.com/artists/artistname" + userInput + "/events?app_id=codingbootcamp",
            responseType: 'stream'
        }).then(function (response) {
            console.log(response.data.fs);
        });
    }
}

// SPOTIFY
function spotifyThis(userInput) {
    var spotify = new Spotify(keys.spotify);

    if (!userInput) {
        userInput = "The Sign";
    };

    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data) {
        if (err) {
            console.log("An error has occurred." + err);
        } else {
            console.log("\n------------------------------\n");
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("\n------------------------------\n");
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
            console.log("\n------------------------------\n");
            console.log("Title: " + omdbData.Title);
            console.log("Year Released: " + omdbData.Year);
            console.log("IMDB Rating: " + omdbData.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + omdbData.Ratings[1].Value);
            console.log("Produced In: " + omdbData.Country);
            console.log("Language: " + omdbData.Language);
            console.log("Plot Summary: " + omdbData.Plot);
            console.log("Actors: " + omdbData.Actors);
            console.log("\n------------------------------\n");
        }
    });
}

// DO WHAT IT SAYS (by it we mean random.txt)
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("An error has occurred." + error);
        } else {
            // spotifyThis("whatever is in random.txt");
        }
    });
}