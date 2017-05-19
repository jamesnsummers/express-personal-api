var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlacesSchema = new Schema({
  city: String,
  country: String,
  isBeautiful: Boolean,
  image: String
});

var Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;
