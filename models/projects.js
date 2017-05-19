var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  dateCompleted: String,
  image: String
});

var Projects = mongoose.model('Places', ProjectSchema);

module.exports = Projects;
