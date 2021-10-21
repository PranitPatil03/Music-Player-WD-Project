// index.html  script.js  style.css
const musicContainer = document.querySelector('.music-container')
const prevBtr = document.querySelector('#prev')
const playBtr = document.querySelector('#play')
const nextBtr = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progessContanier = document.querySelector('.progess-contanier')
const progess = document.querySelector('.progess')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = 
['coastLine',
'Don\'t Give Up On Me',
'Night Changes',
'Photograph'];  

let songIndex = 2;

loadSongs(songs[songIndex])

function loadSongs(song) {
    title.innerText = song;
    audio.src = `asong/${song}.mp3`;
    cover.src = `images/${song}.jpeg`;
}

function playSong() {
    musicContainer.classList.add('play')
    playBtr.querySelector('i.fas').classList.remove('fa-play')
    playBtr.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtr.querySelector('i.fas').classList.add('fa-play')
    playBtr.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSongs(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSongs(songs[songIndex])

    playSong()
}

function updateprogress(e) {
    const { duration, currentTime } = e.srcElement;
    const progessPercentage = (currentTime / duration) * 100
    progess.style.width = `${progessPercentage}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration

}

playBtr.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtr.addEventListener('click', prevSong)

nextBtr.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateprogress)

progessContanier.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)