console.log("Sanity Check: JS is working!");
var template;
var $filmList;
var allFilms = [];

$(document).ready(function(){

  $filmList = $('#filmTarget');

  var source = $('#films-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/films',
    success: handleSuccess,
    error: handleError
  });

  function render () {
    $filmList.empty();
    var filmsHtml = template({ films: allFilms });
    $filmList.append(filmsHtml);
  }

  function handleSuccess(json) {
    allFilms = json;
    render();
  }
  function handleError(e) {
    console.log('uh oh');
    $('#filmTarget').text('Failed to load films, is the server working?');
  }

});
