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
    var poster = json[2].image;
    $('#films-template').prepend(
      `<a href=${poster}> <img src = ${poster}/></>`
    )
  }
  function filmError(e) {
    console.log('uh oh');
    $('#filmTarget').text('Failed to load films, is the server working?');
  }

  function projectSuccess(projects){
    $('.container').append(
      `<div class = "col-md-8">
        <h3>${projects[0].title}</h3>
      </div>
      `
    )
  }
  function projectError(e) {
    console.log('uh oh');
  }

});
