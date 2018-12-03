var express = require('express');
var app = express();
var server = app.listen(80);

app.use(express.static(__dirname + '/public'));

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var queue = [];

// function serverStart(request, response) {
//   var port = this.address().port;
//   console.log('Server listening on port ' + port);
// }

function playSong(request, response) {
	let newSong = getSong(request.body.mood, request.body.genre);
	//play song is always the first song
	let latestSong = {
		id: 0,
		song: newSong.song,
		artist: newSong.artist,
		mood: request.body.mood,
		genre: request.body.genre
	}
	queue.push(latestSong);
  response.send(latestSong);
}

function getSong(mood, genre) {
  return {
    song: 'Boys Are Back In Town',
    artist: 'Thin Lizzy'
  };
}

//HOW DO WE KNOW WHEN SONG HAS ENDED
//OR WHAT THE CURRENT SONG IS? THERE'S
//NO FEEDBACK FOR WHAT SONG IT'S ON
function getInfo(request, response) {
  response.send(queue[0]);
  console.log('get request successt');
  console.log(request.body.id)
}

function addSong(request, response) {
	let newSong = getSong(request.body.mood, request.body.genre);
	let latestSong = {
		id: queue.length -1,
		song: newSong.song,
		artist: newSong.artist,
		mood: request.body.mood,
		genre: request.body.genre
	}
	queue.push(latestSong);
  response.send(latestSong);
}

function nextSong(request, response) {

}





// server.listen(7000, serverStart);
app.put('/queue/mood/', playSong);
app.get('/queue/id/', getInfo);
app.post('/queue/mood/', addSong);
app.put('/queue/id/', nextSong);
