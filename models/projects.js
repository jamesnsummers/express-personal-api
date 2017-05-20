var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  dateCompleted: String,
  url: String
});

var Projects = mongoose.model('Projects', ProjectSchema);

module.exports = Projects;
