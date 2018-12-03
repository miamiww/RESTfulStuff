//GLOBAL VARIABLES
var state = {
  id: 0,
  title: 'null',
  artist: 'null',
  isPlaying: false,
  mood: 'null',
  genre: 'null',
  url: 'null'
};

var playlist = [];

//server url
let url = "http://206.189.186.47:3000";
//use cors-anywhere to get around CORS
let corsAny = "https://cors-anywhere.herokuapp.com/";
let reqUrl = corsAny + url;

window.addEventListener('load', function() {
  //start up - see if server is up
  init();

  //get elements
  let playButton = document.getElementById('play');
  let addSongButton = document.getElementById('addSong');
  let moodSelect = document.getElementById('mood');
  let playlistDiv = document.getElementById('playlist');

  playButton.addEventListener('click', function() {

    let reqPath = reqUrl + "/api/player/play";
    //set isPlaying to true
    console.log('PUT', 'true');

    axios({
        method: 'put',
        url: reqUrl + "/api/player/play",
      })
      .then(function(response) {
        if (response.data){
          this.style.visibility = "hidden";
          console.log(response.data);
        }
      });

  });

  //when user adds a song
  addSongButton.addEventListener('click', function() {
    let mood = moodSelect.value;
    let reqPath = reqUrl + "/api/songs/mood/" + mood;
    console.log('GET song', reqPath);
    //get a song randomly based on mood
    axios({
        method: 'get',
        url: reqPath,
      })
      .then(function(response) {
        //got the song
        let newSong = response.data;
        console.log(newSong);
        //now post the song to playlist
        console.log('POST song to playlist');
        axios({
          method: 'post',
          url: reqUrl + "/api/playlist",
          data: {
            title: newSong.title,
            artist: newSong.artist,
            mood: newSong.mood,
            genre: newSong.genre,
            url: newSong.url
          }
        })
      });
  });

  //loop every 1 second
  setInterval(function() {

  }, 1000);



  //check to see that their server is up
  //get welcome message
  function init() {
    axios({
        method: 'get',
        url: reqUrl,
      })
      .then(function(response) {
        if (response.data) {
          console.log(response.data);
        } else {
          console.log('server is down maybe ):');
        }

      });
  }

  function getPlaylist() {
    axios({
        method: 'get',
        url: reqUrl + '/api/playlist',
      })
      .then(function(response) {
        if (response.data) {
          playlistDiv.innerHTML = response.data;
        } else {
          console.log("error: no playlist")
        }
      });
  }



});
