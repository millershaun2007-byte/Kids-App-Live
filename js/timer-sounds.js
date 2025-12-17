// Sound effect loader for activity timers and warnings
// Place your sound files in the audio/ folder

const timerSounds = {
    warning: new Audio('audio/timer-warning.mp3'), // 10 second warning
    siren: new Audio('audio/timer-siren.mp3')     // Time's up
};

timerSounds.warning.volume = 0.5;
timerSounds.siren.volume = 0.7;

function playTimerWarning() {
    timerSounds.warning.currentTime = 0;
    timerSounds.warning.play();
}

function playTimerSiren() {
    timerSounds.siren.currentTime = 0;
    timerSounds.siren.play();
}

// Usage: call playTimerWarning() at 10s left, playTimerSiren() at 0s
