// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// need to add this so that we can accept request payloads
app.use(bodyParser.json());

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var controllers = require('./controllers');

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

 /*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

// app.get('/api/profile', controllers.profile.index);

app.get('/api/films', controllers.film.index);
app.get('/api/films/:filmId', controllers.film.show);
app.post('/api/films', controllers.film.create);
app.delete('/api/films/:filmId', controllers.film.destroy);
app.put('/api/films/:filmId', controllers.film.update);

// ALL OTHER ROUTES (ANGULAR HANDLES)
// redirect all other paths to index
app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/profile', function getProfile(req, res){
 var profile = res.json({
   name: "James N. Summers",
   githuUsername: "jamesnsummers",
   githubLink: "https://github.com/jamesnsummers",
   githubProfileImage: "https://avatars0.githubusercontent.com/u/23504992?v=3&s=460",
   personalSiteLink: "http://jamesnsummers.com/",
   currentCity: "Austin, TX",
   pets: ["Sedona", "Duke", "Oreo"]
 });
});

// app.post('/api/films', function (req, res) {
//   var newFilm = new db.Films({
//     title: req.body.title,
//     genre: req.body.genre,
//     releaseDate: req.body.releaseDate,
//     topBilledCast: req.body.topBilledCast,
//     image: req.body.image
//   });
//
//   db.Director.findOne({name: req.body.director}, function(err, director){
//     if (err) {
//       return console.log(err);
//     }
//     if (director === null) {
//       db.Director.create({name:req.body.director, alive:true}, function(err, newDirector) {
//         createFilmWithDirector(newFilm, newDirector, res);
//       });
//     } else {
//       createFilmWithDirector(newFilm, director, res);
//     }
//   });
// });

// function createFilmWithDirector(film, director, res) {
//   film.director = director;
//   film.save(function(err, book){
//     if (err) {
//       return console.log("save error: " + err);
//     }
//     console.log("saved ", film.title);
//     res.json(film);
//   });
// }

// app.delete('/api/films/:id', function (req, res) {
//   // console.log('films deleted: ', req.params);
//   var filmId = req.params.id;
//   db.Films.findOneAndRemove({ _id: filmId })
//     .populate('director')
//     .exec(function (err, deletedFilm) {
//       res.json(deletedFilm);
//   });
// });


app.get('/api/projects', function getProjects(req, res){
 db.Projects.find()
   .exec(function(err, projects) {
     if (err) { return console.log("index error: " + err); }
     res.json(projects);
 });
});

/*
 * JSON API Endpoints list
 */

app.get('/api/', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/jamesnsummers/express-personal-api/README.md",
    baseUrl: "https://ancient-gorge-64117.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Here's a little story about James..."},
      {method: "GET", path: "/api/films", description: "Films I've seen and loved"},
      {method: "POST", path: "/api/films", description: "Add new film I've seen"},
      {method: "DELETE", path: "/api/films/:id", description: "Delete a film from the list"},
      {method: "GET", path: "/api/projects", description: "Projects I've made"}
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
