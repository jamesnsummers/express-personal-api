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

  function render () {
    $filmList.empty();
    var filmsHtml = template({ films: allFilms });
    $filmList.append(filmsHtml);
  }

  function filmSuccess(json) {
    allFilms = json;
    render(allFilms);
    for (var i = 0; i < json.length; i++) {
        var poster = json[i].image;
        $('#filmTarget').prepend(`<img src = ${poster} alt="poster"/>`+[i]);
    }
  }
  function filmError(e) {
    console.log('uh oh');
    $('#filmTarget').text('Failed to load films, is the server working?');
  }

  function projectSuccess(json){
    for (var i = 0; i < json.length; i++) {
        var project = json[i].title;
        var projectDate = json[i].dateCompleted;
        $('.container').append(`<h4>${project}</h4>`);
        $('.container').append(`<h5>completed on: ${projectDate}</h5>`);
    }
  }
  function projectError(e) {
    console.log('uh oh');
  }

});
