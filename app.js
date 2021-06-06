const musicContainer =  document.getElementById("music-container");
const playBtn =  document.querySelector("#play");
const prevBtn =  document.querySelector("#prev");
const nextBtn =  document.querySelector("#next");

const audio = document.querySelector("#audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//song titles

const songs = ["BeIntehaan","Hawayein","My-Heart"];

//keep track

let songIndex =0;

//load song

loadSong(songs[songIndex]);

//update song
function loadSong (song) {
    title.innerText = song;
    audio.src=`./music/${song}.mp3`;
    cover.src =`./images/${song}.jpg`;
}

function playSong () {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}
function pauseSong () {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
    songIndex--
    if(songIndex <0 ) {
       songIndex = songs.length-1
    } 

    loadSong(songs[songIndex])

    playSong()
}
function nextSong () {
    songIndex++
    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    
    playSong()
}

// function updateProgress(e) {
//     console.log(e.target.id);



//     const {duration,currentTime} = e.target.id;

//     const progressPercent = (currentTime/duration) * 100;
    
//     progress.style.width = `${progressPercent}%`;
//     console.log(progressPercent);
// }
audio.addEventListener("playing", function(_event) {
    var duration = _event.target.duration;
    advance(duration, audio);
  });
  audio.addEventListener("pause", function(_event) {
    clearTimeout(timer);
  });
  var advance = function(duration, element) {
    var progress = document.getElementById("progress");
    increment = 10/duration
    percent = Math.min(increment * element.currentTime * 10, 100);
    progress.style.width = percent+'%'
    startTimer(duration, element);
  }
  var startTimer = function(duration, element){ 
    if(percent < 100) {
      timer = setTimeout(function (){advance(duration, element)}, 100);
    }
  }

//event listeners

playBtn.addEventListener("click", () => {
    
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click",nextSong);

//audio.addEventListener("timeUpdate",updateProgress);



