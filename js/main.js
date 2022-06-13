let appsMusic = document.querySelector('.apps')
let prev = document.querySelector('.prev');
let playSongMusic = document.querySelector('.playBtn');
let next = document.querySelector('.next');
let audio = document.querySelector('.audio');
let title = document.querySelector('.title');
let proggres = document.querySelector('.proggres__music');
let gambar = document.querySelector('.gambar');
let proggresContiner = document.querySelector('.proggres');
let timeMusic = document.querySelector('.time');
let musicPlay = ['Fabio Asher - Bertahan Terluka',
                 'chrisye - Aku cinta dia', 
                 'fiersa - nadir',
                 'fiersa - peliku untuk pelikmu',
                 'Mawar de Jongh - Lebih Dari Egoku',
                 'Sisa Rasa - Mahalini'];
let musicIndex = 0;

function loadMusic(music){
  title.innerText = music;
  audio.src = `./${music}.mp3`;
  gambar.src = `images/${music}.jpg`
}
loadMusic(musicPlay[musicIndex]);
playSongMusic.addEventListener('click',() => {
    let playing = appsMusic.classList.contains('play');
    if(playing){
      pauseSong()
    }else{
      playSong()
    }
})
function playSong(){
  appsMusic.classList.add('play');
  playSongMusic.querySelector('.fa-solid').classList.remove('fa-play');
  playSongMusic.querySelector('.fa-solid').classList.add('fa-pause');
  audio.play();
}
function pauseSong(){
  appsMusic.classList.remove('play');
  playSongMusic.querySelector('.fa-solid').classList.add('fa-play');
  playSongMusic.querySelector('.fa-solid').classList.remove('fa-pause');
  audio.pause();
}
prev.addEventListener('click', prevBtn)
function prevBtn(){
   musicIndex--;
   if(musicIndex < 0 ){
    // jika mmusik index sudah memasuki angka minus, maka musicindex akan bernilai pangjan music - 1
    musicIndex = musicPlay.length - 1;
   }
  // jalankan fungsi loadmusic dengan index yang sudah ditentukan diatas
  loadMusic(musicPlay[musicIndex]);
  playSong()
}
next.addEventListener('click', nextBtn);
function nextBtn(){
  musicIndex++;
  if(musicIndex > musicPlay.length - 1){
    musicIndex = 0;
  }
  loadMusic(musicPlay[musicIndex]);
  playSong()
}
audio.addEventListener('timeupdate', setproggress)
function setproggress(e){
  let {duration, currentTime}  = e.srcElement;
  let simpanTime = (currentTime / duration) * 100;
  proggres.style.width = `${simpanTime}%`;
  timeMusic.innerText = convert(audio.currentTime);
}
proggresContiner.addEventListener('click', updateProggress);
function updateProggress(e){
  let widthProggres = this.clientWidth;
  let clickWidth = e.offsetX;
  let durationMusic = audio.duration;
  audio.currentTime = (clickWidth / widthProggres) * durationMusic;
}
audio.addEventListener('ended',() => {
  nextBtn()
})

let matchMediaScreen = matchMedia("(max-width:360px)");
matchMediaScreen.addListener(handleScreen)
function handleScreen(e){
  if(e.matches){
    appsMusic.style.display = "none";
  }else{
    appsMusic.style.display = "block";
  }
}

let convert = (time) =>{
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if(minutes < 10){
    minutes = '0' + String(minutes)
  }
  if(seconds < 10){
    seconds = '0' + String(seconds)
  }
  return minutes + ':' + seconds;
}
