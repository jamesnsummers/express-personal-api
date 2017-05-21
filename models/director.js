var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  name: String,
  alive: Boolean
});

var Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;
