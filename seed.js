// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var film_list = [
  {
    title: "Seven",
    director: "David Fincher",
    genre: "Thriller",
    releaseDate: "September 22, 1995",
    topBilledCast: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey"],
    image: "/public/images/seven-poster.jpeg"
  },
  {
    title: "The Game",
    director: "David Fincher",
    genre: "Thriller",
    releaseDate: "September 12, 1997",
    topBilledCast: ["Michael Douglas", "Sean Penn"],
    image: "/public/images/seven-poster.jpeg"
  },
  {
    title: "Short Term 12",
    director: "Destin Daniel Cretton",
    genre: "Drama",
    releaseDate: "August 23, 2013",
    topBilledCast: ["Brie Larson", "John Gallagher Jr.", "Keith Stanfield"],
    image: "/public/images/seven-poster.jpeg"
  },
  {
    title: "Get Out",
    director: "Jordan Peele",
    genre: "Horror",
    releaseDate: "February 24, 2017",
    topBilledCast: ["Daniel Kaluuya", "Allison Williams", "Catherine Keener", "Bradley Whitford"],
    image: "/public/images/seven-poster.jpeg"
  },

];

var director_list = [
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
  }

];

var project_list = [
  {
    title: "Tic Tac Toe",
    dateCompleted: "May 7, 2017",
    url: "http://jim-jac-joe.bitballoon.com/"
  },
  {
    title: "Books App",
    dateCompleted: "May 12, 2017",
    url: ""
  }

];

db.Director.remove(function(err, succ){
  db.Director.create(director_list, function(err, newDirector){
    if (err){
      return console.log("Error:", err);
    }

    db.Films.remove({}, function(err, films){
      console.log('removed all films');
      film_list.forEach(function (filmData) {
        var film = new db.Films({
          title: filmData.title,
          genre: filmData.genre,
          releaseDate: filmData.releaseDate,
          topBilledCast: filmData.topBilledCast,
          image: filmData.image
        });
        db.Director.findOne({name: filmData.director}, function (err, foundDirector) {
          console.log('found director ' + foundDirector.name + ' for book ' + film.title);
          if (err) {
            console.log(err);
            return;
          }
          film.director = foundDirector;
          film.save(function(err, savedFilm){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedFilm.title + ' directed by ' + foundDirector.name);
          });
        });
      });
    });
  });
});

db.Projects.remove(function(err, succ){
  db.Projects.create(project_list, function(err, succ){
    if (err){
      return console.log("error:", err);
    }
    db.Projects.find(succ);
  });
});
