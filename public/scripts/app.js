console.log("Sanity Check: JS is working!");
var template;
var $filmList;
var allFilms = [];
var projectList;
var allProjects = [];

$(document).ready(function(){

  $filmList = $('#filmTarget');

  var source = $('#films-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/profile/',
    data: $("form").serialize(),
    success: profileSuccess,
    error: profileError
  });

  $.ajax({
    method: 'GET',
    url: '/api/films',
    data: $("form").serialize(),
    success: filmSuccess,
    error: filmError
  });

  $.ajax({
    method: 'GET',
    url: '/api/projects',
    data: $("form").serialize(),
    success: projectSuccess,
    error: projectError
  });

  $('#newFilmForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new film serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/films',
      data: $(this).serializeArray(),
      success: newFilmSuccess,
      error: newFilmError
    });
  });

  $filmList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/films/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/films/'+$(this).attr('data-id'),
      success: deleteFilmSuccess,
      error: deleteFilmError
    });
  });

  function render () {
    $filmList.empty();
    var filmsHtml = template({ films: allFilms });
    $filmList.append(filmsHtml);
  }

  function filmSuccess(json) {
    allFilms = json;
    render();
  }

  function filmError(e) {
    console.log('uh oh');
    $('#filmTarget').text('Failed to load films, is the server working?');
  }

  function newFilmSuccess(json) {
    $('#newFilmForm input').val('');
    allFilms.push(json);
    render();
  }

  function newFilmError() {
    console.log('newfilm error!');
  }

  function deleteFilmSuccess(json) {
    var film = json;
      console.log(json);
    var filmId = film._id;
      console.log('delete film', filmId);
    for(var index = 0; index < allFilms.length; index++) {
      if(allFilms[index]._id === filmId) {
        allFilms.splice(index, 1);
        break;
      }
    }
    render();
  }

  function deleteFilmError() {
    console.log('deletefilm error!');
  }

  function projectSuccess(json){
    $('h1').append(`<br><h2>Projects</h2>`)
    for (var i = 0; i < json.length; i++) {
      var project = json[i].title;
      var projectUrl = json[i].url;
      var projectDate = json[i].dateCompleted;
      $('h1').append
      (`<div class="col-md-3 col-md">
          <h4><a href=${projectUrl}>${project}</a></h4>
          <h5>completed on: ${projectDate}</h5>
        </div><br><br>`);
    }
  }

  function projectError(e) {
    console.log('uh oh');
  }

  function profileSuccess(json){
    var profile = json.githubProfileImage;
    $('h1').prepend(`<img class = "profilePic" src = ${profile} height = 150/><br>`);
  }

  function profileError(e) {
    console.log('uh oh');
  }

});
