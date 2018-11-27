var express = require('express');
var app = express();
var server = app.listen(80);

app.use(express.static('public'));

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// curl -X POST -d "value=1" http://localhost:7000/mode
// curl -X POST -d "value=60" http://localhost:7000/speed
// curl -X POST -d "circle=1" -d "square=1" http://localhost:7000/shapes
// curl -X POST -d "h=50" -d "s=100" -d "l=100" http://localhost:7000/background

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use('/', express.static('public'));

var queue = [];

function serverStart(request, response) {
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

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





server.listen(7000, serverStart);
server.put('/queue/mood/', playSong);
server.get('/queue/id/', getInfo);
server.post('/queue/mood/', addSong);
server.put('/queue/id/', nextSong);
