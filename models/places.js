var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlacesSchema = new Schema({
  city: String,
  country: String,
  isBeautiful: Boolean,
  image: String
});

var Places = mongoose.model('Places', PlacesSchema);

module.exports = Places;
