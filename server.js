// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

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

app.get('/api/films', function getFilms(req, res){
 db.Films.find()
   .populate('director')
   .exec(function(err, films) {
     if (err) { return console.log("index error: " + err); }
     res.json(films);
 });
});

app.post('/api/films', function (req, res) {
  var newFilm = new db.Films({
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    topBilledCast: req.body.topBilledCast,
    image: req.body.image
  });

  db.Director.findOne({name: req.body.director}, function(err, director){
    if (err) {
      return console.log(err);
    }
    if (director === null) {
      db.Director.create({name:req.body.director, alive:true}, function(err, newDirector) {
        createFilmWithDirector(newFilm, newDirector, res);
      });
    } else {
      createFilmWithDirector(newFilm, director, res);
    }
  });
});

function createFilmWithDirector(film, director, res) {
  film.director = director;
  film.save(function(err, book){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", film.title);
    res.json(film);
  });
}

app.delete('/api/films/:id', function (req, res) {
  // console.log('films deleted: ', req.params);
  var filmId = req.params.id;
  db.Films.findOneAndRemove({ _id: filmId })
    .populate('director')
    .exec(function (err, deletedFilm) {
      res.json(deletedFilm);
  });
});


app.get('/api/projects', function getProjects(req, res){
 db.Projects.find()
   .exec(function(err, projects) {
     if (err) { return console.log("index error: " + err); }
     res.json(projects);
 });
});

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
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
