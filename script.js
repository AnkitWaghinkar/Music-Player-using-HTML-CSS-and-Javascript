const musicContainer = document.querySelector('.musicContainer');
const playBtn = document.getElementById('play');
const toogle = document.getElementById('toog');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progressContainer');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//song titles
const songs = ['Am I Wrong', 'Dancin', 'Ride'];

//keeping track of songs
let songIndex = 0;

// Initially loading songs info DOM
loadSong(songs[songIndex]);

//update songs details
function loadSong(song){
    title.innerText = song;
    audio.src = `Music/${song}.mp3`;
    cover.src = `Images/${song}.png`;
}

function playSong(){
    musicContainer.classList.add('play');
    toogle.src = 'Icon/pause.png';

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    toogle.src = 'Icon/play.png';

    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
};

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
};

function updateProgress(e){
    const{duration, currentTime} = e.srcElement;
    const progressPercent = currentTime / duration * 100;
    progress.style.width = `${progressPercent}%`;
};

function setProgress(e){
    const width = this.clientWidth;
    const clickX =  e.offsetX;
    const duration = audio.duration;
    const newTime = (clickX / width) * duration;
    console.log(`ClickX: ${clickX}, Width: ${width}, New Time: ${newTime}`);
    audio.currentTime = newTime;
};

//Event Listners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }
     else
        {
            playSong();
        }
});

//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);