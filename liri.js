
require("dotenv").config();

//const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const keys = require("./keys");
const request = require("request");
const moment = require("moment");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);

const getBand = function(artist) {
    return artist.name;
};


const getSpotify = songName => {
    if (songName === undefined) {
      songName = "What's my age again";
    }

spotify.search(
    {
        type: "track",
        query: songName
    },
    function(err, data) {
        if (err) {
            console.log("Error! " + err);
            return;
        }
        const songs = data.tracks.items;

        for (let i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getBand));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------");
          }
        }
      );
    };
    
    const getBands = artist => {
      const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
      request(queryURL, function(error, res, body) {
        if (!error && res.statusCode === 200) {
          const jsonData = JSON.parse(body);
    
          if (!jsonData.length) {
            console.log("No results found for " + artist);
            return;
          }
    
          console.log("Upcoming concerts for " + artist + ":");
    
          for (let i = 0; i < jsonData.length; i++) {
            var show = jsonData[i];
    
            console.log(
              show.venue.city +
                "," +
                (show.venue.region || show.venue.country) +
                " at " +
                show.venue.name +
                " " +
                moment(show.datetime).format("MM/DD/YYYY")
            );
          }
        }
      });
    };
    
    
    const getMovie = movieName => {
      if (movieName === undefined) {
        movieName = "Mr Nobody";
      }
    
      const urlHit =
        "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
      request(urlHit, function(error, res, body) {
        if (!error && res.statusCode === 200) {
          var jsonData = JSON.parse(body);
    
          console.log("Title: " + jsonData.Title);
          console.log("Year: " + jsonData.Year);
          console.log("Rated: " + jsonData.Rated);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
      });
    };
    
    
    const runCommand = () => {
      fs.readFile("random.txt", "utf8", (error, data) => {
        console.log(data);
    
        const userInput = data.split(",");
    
        if (userInput.length === 2) {
          pick(userInput[0], userInput[1]);
        } else if (userInput.length === 1) {
          pick(userInput[0]);
        }
      });
    };
    
    
    const pick = (caseData, functionData) => {
      switch (caseData) {
      case "concert-this":
        getBands(functionData);
        break;
      case "spotify-this-song":
        getSpotify(functionData);
        break;
      case "movie-this":
        getMovie(functionData);
        break;
      case "do-what-it-says":
        runCommand();
        break;
      default:
        console.log("LIRI doesn't know that");
      }
    };
    
    
    const runThis = (argOne, argTwo) => 
      pick(argOne, argTwo);
    
    
    runThis(process.argv[2], process.argv.slice(3).join(" "));
    
    