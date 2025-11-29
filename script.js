// Statische DOM-Elemente
const DISPLAY_NAME_ELEMENT = document.getElementById('displayName');
const USERNAME_ELEMENT = document.getElementById('username');
const copyUsernameButton = document.getElementById('copyUsernameButton');
const playPauseIcon = document.getElementById('playPauseIcon');
const songTitleElement = document.getElementById('songTitle'); 

// Elemente für den More Links Toggle
const toggleButton = document.getElementById('moreLinksToggle');
const hiddenContainer = document.getElementById('hiddenLinks');
const arrowIcon = document.querySelector('.arrow-icon');


// ---------------------------
// 1. SCHNEE-EFFEKT LOGIK
// ---------------------------

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


// ---------------------------
// 2. USERNAME KOPIEREN LOGIK
// ---------------------------

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


// ---------------------------
// 3. CUSTOM CURSOR LOGIK
// ---------------------------

document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});


// ---------------------------
// 4. Musikplayer & Song Titel Anzeige
// ---------------------------

let songs = [
    { file: "music/song1.mp3", title: "AYU  - Jamal" }, 
    { file: "music/song2.mp3", title: "Melatonin  - Aymo" },
    { file: "music/song2.mp3", title: "CC&MO  - Aymo" }     
];

let index = 0;
let player = document.getElementById("player");
player.src = songs[index].file;

function updateSongTitle() {
    songTitleElement.textContent = songs[index].title;
}

function togglePlay() {
    if (player.paused) {
        // Spielt ab, wenn es gestartet wird
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

// Global verfügbar machen
window.togglePlay = togglePlay;
window.nextSong = nextSong;
window.prevSong = prevSong;


// ---------------------------
// 5. ZUSÄTZLICHE LINKS TOGGLE LOGIK
// ---------------------------

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        hiddenContainer.classList.toggle('show-links');
        arrowIcon.classList.toggle('rotate-arrow');
    });
}


// ---------------------------
// 6. PRELOADER LOGIK & AUTOPLAY START
// ---------------------------

const preloader = document.getElementById('preloader');

// Blende den Ladebildschirm nach 2 Sekunden aus
window.addEventListener('load', () => {
    // Füge eine Verzögerung hinzu, damit Assets laden und Autoplay-Blocker umgangen werden
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        
        // FEATURE: AUTOPLAY STARTET DEN ERSTEN SONG
        togglePlay(); 
        
    }, 2000); 
});