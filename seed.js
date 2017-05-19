// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_film =
  {
  title: "Seven",
  genre: "Thriller",
  releaseDate: "September 22, 1995",
  topBilledCast: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey"]
  }


var director = {
  name: "David Fincher",
  alive: true
}

db.Films.remove(function(err,succ){
  db.Director.remove(function(err,succ){
    db.Director.create(director, function(err, newDirector){
      if (err){
        return console.log("Error:", err);
      }
      new_film.director = newDirector;
      db.Films.create(new_film, function(err, film){
        if (err){
          return console.log("Error:", err);
        }
        console.log(film);
        //console.log("Created new film", films._id)
        process.exit(); // we're all done! Exit the program.
      })


    });
  });
});
