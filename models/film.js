var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Director = require ('./director')

var CastSchema = new Schema({
  name: String
});

var FilmSchema = new Schema({
  title: String,
  director: {
    type: Schema.Types.ObjectId,
    ref: "Director"
  },
  genre: String,
  releaseDate: String,
  topBilledCast: [String],
  image: String
});

var Film = mongoose.model('Film', FilmSchema);

module.exports = Film;
