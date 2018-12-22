var assert = chai.assert;
var chai = require("chai");
var liri = require("../liri");
describe("Liri Test", function() {
  describe("runThis", function() {
    it("returns LIRI doesn't know that", function() {
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
      // const runThis = (argOne, argTwo) => 
      // pick(argOne, argTwo);
      const runThis = () => pick();
      runThis(process.argv[2], process.argv.slice(3).join(" "));
      assert.isNull(process.argv[2]);
      
    });
  });
});
