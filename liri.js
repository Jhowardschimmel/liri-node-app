require("dotenv").config();
const keys = import("keys.js");
const spotify = new Spotify(keys.spotify);