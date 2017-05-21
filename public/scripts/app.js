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
    url: '/api/profile',
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

  function render () {
    $filmList.empty();
    var filmsHtml = template({ films: allFilms });
    $filmList.append(filmsHtml);
  }

  function profileSuccess(json){
    var profile = json.githubProfileImage;
    $('h1').prepend(`<img class = "profilePic" src = ${profile} height = 150/><br>`);
  }

  function profileError(e) {
    console.log('uh oh');
  }

  function filmSuccess(json) {
    allFilms = json;
    render(allFilms);
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

  function projectSuccess(json){
    for (var i = 0; i < json.length; i++) {
        var project = json[i].title;
        var projectDate = json[i].dateCompleted;
        $('.container').append(`<h4 class="projectTitle">${project}</h4><h5 class="projectDate">completed on: ${projectDate}</h5>`);
        // $('.container').append(`<h5 class="projectDate">completed on: ${projectDate}</h5>`);
    }
  }

  function projectError(e) {
    console.log('uh oh');
  }

});
