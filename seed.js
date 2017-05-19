// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_film = [
  {
  title: "Seven",
  director: "David Fincher",
  genre: "Thriller",
  releaseDate: "September 22, 1995",
  topBilledCast: "Brad Pitt", "Morgan Freeman", "Kevin Spacey"
  }
];

db.Films.create(new_film, function(err, film){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new film", films._id)
  process.exit(); // we're all done! Exit the program.
})
