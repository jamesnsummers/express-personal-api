var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Films = require("./films.js");
module.exports.Director = require("./director.js");
module.exports.Projects = require("./projects.js");
