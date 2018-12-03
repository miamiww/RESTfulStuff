//GLOBAL VARIABLES
var playlist = [];
let songIndex = 0;

//server url
let url = "http://206.189.186.47:3000";
// let url = "http://bc2542.itp.io:3000";
//use cors-anywhere to get around CORS
let corsAny = "https://cors-anywhere.herokuapp.com/";
let reqUrl = corsAny + url;

window.addEventListener('load', function() {
  //start up - see if server is up
  init();
  getPlaylist();
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
      songIndex = 0;

      console.log('playing music now');
      let loop = setInterval(function() {
        musicPlayer.src = url + playlist[songIndex].url;
        console.log('now playing', playlist[songIndex].title);
        if (playlist[songIndex].title != "null") {
          currentSong.innerHTML = ("<p>" + playlist[songIndex].title + " by " + playlist[songIndex].artist + "</p>");
        }
        musicPlayer.play();
        songIndex++

        if (songIndex > playlist.length - 1) {
          console.log('done with playlist');
          clearInterval(loop);
        }
      }, 6000);

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

  //see what is playing - NOT USED
  function whatIsPlaying() {
    let reqPath = reqUrl + '/api/player/currently-playing'
    axios({
        method: 'get',
        url: reqPath,
      })
      .then(function(response) {
        let song = response.data;
        // console.log(response.data);
        // if (song.title != "null") {
        //   currentSong.innerHTML = ("<p>" + song.title + " by " + song.artist + "</p>");
        // musicPlayer.src = url + song.url;
        // musicPlayer.play();
        // }

      });
  }

});
