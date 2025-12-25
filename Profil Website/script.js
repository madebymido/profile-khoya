const DISPLAY_NAME_ELEMENT = document.getElementById('displayName');
const USERNAME_ELEMENT = document.getElementById('username');
const copyUsernameButton = document.getElementById('copyUsernameButton');
const playPauseIcon = document.getElementById('playPauseIcon');
const songTitleElement = document.getElementById('songTitle'); 

const toggleButton = document.getElementById('moreLinksToggle');
const hiddenContainer = document.getElementById('hiddenLinks');
const arrowIcon = document.querySelector('.arrow-icon');


function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    
    const snowflake = document.createElement('img');
    snowflake.classList.add('snowflake');
    snowflake.src = 'icons/snowflake.svg'; 
    snowflake.alt = 'Schneeflocke';
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 10 + 5; 
    snowflake.style.animationDuration = duration + 's';
    
    const size = Math.random() * 15 + 10; 
    snowflake.style.width = size + 'px'; 
    snowflake.style.height = size + 'px'; 
    
    snowflake.style.animationDelay = Math.random() * 10 + 's';

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

setInterval(createSnowflake, 300); 


if (copyUsernameButton) {
    copyUsernameButton.addEventListener('click', () => {
        const usernameText = USERNAME_ELEMENT.textContent.substring(1); 
        
        navigator.clipboard.writeText(usernameText).then(() => {
            copyUsernameButton.style.opacity = '0.3';
            
            setTimeout(() => {
                copyUsernameButton.style.opacity = '1'; 
            }, 1500);
        }).catch(err => {
            console.error('Kopieren fehlgeschlagen:', err);
        });
    });
}


document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});


let songs = [
    { file: "music/song3.mp3", title: "Natrium  - Aziz" }, 
    { file: "music/song2.mp3", title: "Yamal  - Kartal" },
    { file: "music/song1.mp3", title: "AYU  - Jamal" },
    { file: "music/song4.mp3", title: "MOK  - Dazlak" },

];

let index = 0;
let player = document.getElementById("player");
player.src = songs[index].file;

function updateSongTitle() {
    songTitleElement.textContent = songs[index].title;
}

function togglePlay() {
    if (player.paused) {
        player.play();
        playPauseIcon.src = 'icons/pause.svg'; 
        playPauseIcon.alt = 'Pause';
        updateSongTitle();
    } else {
        player.pause();
        playPauseIcon.src = 'icons/play.svg'; 
        playPauseIcon.alt = 'Play';
    }
}

function nextSong() {
    index = (index + 1) % songs.length;
    player.src = songs[index].file;
    player.play();
    playPauseIcon.src = 'icons/pause.svg'; 
    playPauseIcon.alt = 'Pause';
    updateSongTitle();
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    player.src = songs[index].file;
    player.play();
    playPauseIcon.src = 'icons/pause.svg'; 
    playPauseIcon.alt = 'Pause';
    updateSongTitle();
}

window.togglePlay = togglePlay;
window.nextSong = nextSong;
window.prevSong = prevSong;


if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        hiddenContainer.classList.toggle('show-links');
        arrowIcon.classList.toggle('rotate-arrow');
    });
}


const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        
        togglePlay(); 
        
    }, 2000); 
});


const texts = ["Developer", "19yo", "Berlin", "Streamer", "Analyst", "Car Developer", "Designer", "VeynoService"];
let currentIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const statusTexts = document.querySelectorAll('.status-text');

function updateText() {
    const activeElement = document.getElementById(`text-${currentIndex}`);
    const currentText = texts[currentIndex];
    
    if (!activeElement) return;
    
    if (isDeleting) {
        currentCharIndex--;
        activeElement.textContent = currentText.substring(0, currentCharIndex);
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            statusTexts[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % texts.length;
            statusTexts[currentIndex].classList.add('active');
            setTimeout(updateText, 500);
            return;
        }
    } else {
        currentCharIndex++;
        activeElement.textContent = currentText.substring(0, currentCharIndex);
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(updateText, 2000);
            return;
        }
    }
    
    setTimeout(updateText, 100);
}

updateText();