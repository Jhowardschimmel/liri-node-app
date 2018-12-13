require("dotenv").config();
const inquirer = require("inquirer");
//const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const keys = require("./keys");
const request = require("request");
const moment = require("moment");
const fs = require("fs");
const spotify = new Spotify(keys.spotify);

inquirer.prompt([
    {
        type: "input"
    }
])
.then(function(inquirerResponse) {
    if (inquirerResponse === "concert-this") {
        getConcert();

    }
});

getConcert() = function(artist) {
    const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let jsonData = JSON.parse (body);

            if (!jsonData.length) {
                console.log("No results found for " + artist);
                return;
            }

            console.log("Upcoming concerts for " + artist + ":");

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];

                console.log(show.venue.city + "," + (show.venue.region || show.venue.country) + "at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY")
                 );
            }
        }
    })
}