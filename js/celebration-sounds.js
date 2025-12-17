// Sound effect loader for correct answers and celebration
// Place your sound files in the audio/ folder

const celebrationSounds = {
    cheer: new Audio('audio/cheer.mp3') // Loud cheer for success
};

celebrationSounds.cheer.volume = 0.8;

function playCheer() {
    celebrationSounds.cheer.currentTime = 0;
    celebrationSounds.cheer.play();
}

// Usage: call playCheer() on correct answer
