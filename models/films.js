var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Director = require ('./director')

var CastSchema = new Schema({
  name: String
});

var FilmsSchema = new Schema({
  title: String,
  director: String,
  genre: String,
  releaseDate: String,
  topBilledCast: [CastSchema]
});

var Films = mongoose.model('Films', FilmsSchema);

module.exports = Films;
