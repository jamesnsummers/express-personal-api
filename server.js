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

// var db = require('./models');

/**********
 * ROUTES *
 **********/

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
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/jamesnsummers/express-personal-api/README.md",
    baseUrl: "https://ancient-gorge-64117.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Here's a little story about James..."},
      {method: "GET", path: "/api/films", description: "Films I've seen and loved"},
      {method: "POST", path: "/api/films", description: "Add new film I've seen"},
      {method: "PUT", path: "/api/films/:id", description: "Edit something about a film I've seen"},
      {method: "DELETE", path: "/api/films/:id", description: "Delete a film from the list"},
      {method: "GET", path: "/api/places", description: "Places I've traveled"},
      {method: "POST", path: "/api/places/", description: "Add new place I've traveled"},
      {method: "PUT", path: "/api/places/:id", description: "Edit something about a place I've traveled"},
      {method: "DELETE", path: "/api/places/:id", description: "Delete a place from the list"}
    ]
  })
});

app.get('/api/profile', function getProfile (req, res){
  var profile = res.json({
    name: "James Summers",
    githuUsername: "jamesnsummers",
    githubLink: "https://github.com/jamesnsummers",
    githubProfileImage: "https://avatars0.githubusercontent.com/u/23504992?v=3&u=23e80422beb2b0e79dc025bb26b80e52fabc2ebe&s=400",
    personalSiteLink: "http://jamesnsummers.com/",
    currentCity: "Austin, TX",
    pets: ["Sedona", "Duke", "Oreo"]
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
