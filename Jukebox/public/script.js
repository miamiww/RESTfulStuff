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
  let musicPlayer = document.getElementById('musicPlayer');
  let currentSong = document.getElementById('currentSong');



  playButton.addEventListener('click', function() {
    let reqPath = reqUrl + "/api/player/play";
    let song = playlist[0];
    //set isPlaying to true
    console.log('PUT', reqPath);
    axios.put(reqPath, {
      id: song.id,
      title: song.title,
      artist: song.artist,
      // isPlaying: 'true',
      mood: song.mood,
      genre: song.genre,
      url: song.url
    }).then(function(response) {
      console.log(response);
    });

    // axios({
    //     method: 'put',
    //     url: reqPath,
    //     data: {
    //       id: playlist[0].id,
    //       title: playlist[0].title,
    //       artist: playlist[0].artist,
    //       mood: playlist[0].mood,
    //       genre: playlist[0].genre,
    //       url: playlist[0].url
    //     }
    //   })
    //   .then(function(response) {
    //     this.style.visibility = "hidden";
    //     console.log(response.data);
    //   });
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

  //loop every 3 second
  setInterval(function() {
    getPlaylist();
    whatIsPlaying();
  }, 3000);






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

  //get current playlist
  function getPlaylist() {
    axios({
        method: 'get',
        url: reqUrl + '/api/playlist',
      })
      .then(function(response) {
        if (response.data) {
          playlist = response.data;
          //show on the website
          playlistDiv.innerHTML = "";
          for (let i = 0; i < playlist.length; i++) {
            playlistDiv.innerHTML += ("<li>" + response.data[i].title + " by " + response.data[i].artist + "</li>");
          }
        }
      });
  }

  function whatIsPlaying() {
    let reqPath = reqUrl + '/api/player/currently-playing'
    axios({
        method: 'get',
        url: reqPath,
      })
      .then(function(response) {
        console.log(response.data);
        let song = response.data;
        currentSong.innerHTML = ("<p>" + song.title + " by " + song.artist + "</p>");
        musicPlayer.src = song.url;
        musicPlayer.play();
      });
  }

});
