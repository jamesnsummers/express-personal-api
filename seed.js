// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_film = [
  {
    title: "Seven",
    director: "David Fincher",
    genre: "Thriller",
    releaseDate: "September 22, 1995",
    topBilledCast: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey"]
  },
  {
    title: "The Game",
    director: "David Fincher",
    genre: "Thriller",
    releaseDate: "September 12, 1997",
    topBilledCast: ["Michael Douglas", "Sean Penn"]
  },
  {
    title: "Short Term 12",
    director: "Destin Daniel Cretton",
    genre: "Drama",
    releaseDate: "August 23, 2013",
    topBilledCast: ["Brie Larson", "John Gallagher Jr.", "Keith Stanfield"]
  },
  {
    title: "Get Out",
    director: "Jordan Peele",
    genre: "Horror",
    releaseDate: "February 24, 2017",
    topBilledCast: ["Daniel Kaluuya", "Allison Williams", "Catherine Keener", "Bradley Whitford"]
  },

];

var director = [
  {
    name: "David Fincher",
    alive: true,
    image: "/public/images/David-Fincher.jpg"
  },
  {
    name: "Destin Daniel Cretton",
    alive: true,
    image: "/public/images/Destin-Daniel-Cretton.jpg"
  },
  {
    name: "Jordan Peele",
    alive: true,
    image: "/public/images/Jordan-Peele.jpg"
  },

];

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
