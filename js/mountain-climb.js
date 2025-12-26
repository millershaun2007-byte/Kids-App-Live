// Mountain Climb Word Game
// The child climbs a mountain by solving word challenges. Motivational messages about resilience and never giving up are shown.


// Expanded and randomized word list
const mountainWords = shuffleArray([
  { word: 'brave', clue: 'A word for someone who faces their fears.' },
  { word: 'strong', clue: 'A word for someone who keeps going, even when it’s hard.' },
  { word: 'focus', clue: 'A word for paying close attention.' },
  { word: 'hope', clue: 'A word for believing good things can happen.' },
  { word: 'climb', clue: 'A word for going up a mountain.' },
  { word: 'try', clue: 'A word for making an effort.' },
  { word: 'grow', clue: 'A word for getting better or bigger.' },
  { word: 'learn', clue: 'A word for gaining new skills.' },
  { word: 'goal', clue: 'A word for something you want to achieve.' },
  { word: 'smile', clue: 'A word for showing happiness on your face.' }
]);

const resilienceMessages = [
  'Every step makes you stronger! Keep going!',
  'Mistakes are proof you are trying. Never give up!',
  'You are braver than you think!',
  'Resilience means trying again, even if it’s tough.',
  'You can do hard things!',
  'If you fall, get back up and try again!',
  'Champions are made by never giving up!',
  'You are climbing higher every time you try!',
  'Believe in yourself—you are unstoppable!',
  'The view is best for those who keep climbing!'
];

function shuffleArray(arr) {
  return arr.map(v => [v, Math.random()]).sort((a, b) => a[1] - b[1]).map(v => v[0]);
}

let currentStep = 0;

let mountainMusicAudio = null;
function showMountainClimbGame() {
  const container = document.getElementById('mountain-game-container');
  if (!container) return;
  container.innerHTML = '';
  currentStep = 0;
  renderStep();
  renderMountainMusicControls();
}

function renderMountainMusicControls() {
  let controls = document.getElementById('mountain-music-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'mountain-music-controls';
    controls.style = 'margin:18px 0 0 0; text-align:center;';
    controls.innerHTML = `
      <button id='mountain-music-play' style='background:#FFD700;color:#764ba2;border:none;border-radius:8px;padding:8px 22px;font-size:1.08em;font-weight:700;cursor:pointer;margin-right:8px;'>🎵 Play Music</button>
      <button id='mountain-music-pause' style='background:#FFD700;color:#764ba2;border:none;border-radius:8px;padding:8px 22px;font-size:1.08em;font-weight:700;cursor:pointer;display:none;margin-right:8px;'>⏸️ Pause</button>
      <label style='font-size:1em;color:#764ba2;margin-left:8px;'>Volume <input id='mountain-music-volume' type='range' min='0' max='1' step='0.01' value='0.5' style='vertical-align:middle;'></label>
    `;
    document.getElementById('mountain-game-container').prepend(controls);
  }
  if (!mountainMusicAudio) {
    mountainMusicAudio = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b1b6b7.mp3'); // cheerful, motivating
    mountainMusicAudio.loop = true;
    mountainMusicAudio.volume = 0.5;
  }
  document.getElementById('mountain-music-play').onclick = function() {
    mountainMusicAudio.play();
    this.style.display = 'none';
    document.getElementById('mountain-music-pause').style.display = '';
  };
  document.getElementById('mountain-music-pause').onclick = function() {
    mountainMusicAudio.pause();
    this.style.display = 'none';
    document.getElementById('mountain-music-play').style.display = '';
  };
  document.getElementById('mountain-music-volume').oninput = function() {
    mountainMusicAudio.volume = parseFloat(this.value);
  };
}

function renderStep() {
  const container = document.getElementById('mountain-game-container');
  if (!container) return;
  if (currentStep >= mountainWords.length) {
    container.innerHTML = `
      <div class='mountain-certificate'>
        <div style='font-size:1.3em;color:#388e3c;font-weight:bold;margin:24px 0;'>🏆 You reached the top!<br>Remember: Never give up, you are amazing!</div>
        <div style='margin:24px 0;'><button id="mountain-replay-btn" style="background:#FFD700;color:#764ba2;border:none;border-radius:8px;padding:10px 28px;font-size:1.1em;font-weight:700;cursor:pointer;">Play Again</button></div>
        <div style='margin:24px 0;'><button id="mountain-certificate-btn" style="background:#32CD32;color:#fff;border:none;border-radius:8px;padding:10px 28px;font-size:1.1em;font-weight:700;cursor:pointer;">Print Certificate</button></div>
      </div>`;
    if (window.showMountainConfetti) window.showMountainConfetti();
    if (window.playMountainSuccessSound) window.playMountainSuccessSound();
    document.getElementById('mountain-replay-btn').onclick = showMountainClimbGame;
    document.getElementById('mountain-certificate-btn').onclick = showMountainCertificate;
    return;
  }
  const wordObj = mountainWords[currentStep];
  const message = resilienceMessages[Math.floor(Math.random() * resilienceMessages.length)];
  const progress = ((currentStep+1)/mountainWords.length)*100;
  const climberBottom = ((currentStep)/mountainWords.length)*180;
  container.innerHTML = `
    <div style='margin-bottom:18px;font-size:1.1em;'>Step ${currentStep + 1} of ${mountainWords.length}</div>
    <div style='margin-bottom:16px;font-size:1.2em;color:#764ba2;'>${wordObj.clue}</div>
    <input id='mountain-word-input' type='text' style='font-size:1.1em;padding:8px;border-radius:8px;border:1.5px solid #FFD700;margin-bottom:12px;width:220px;'/>
    <button id='mountain-submit-btn' style='background:#FFD700;color:#764ba2;border:none;border-radius:8px;padding:8px 22px;font-size:1.08em;font-weight:700;cursor:pointer;margin-left:8px;'>Submit</button>
    <div id='mountain-message' style='margin-top:18px;color:#0288D1;font-size:1.08em;'>${message}</div>
    <div style='margin-top:32px;position:relative;height:240px;'>
      <div class='mountain-bg'></div>
      <div class='mountain-progress-bar'>
        <div class='mountain-progress-fill' style='height:${progress}%;'></div>
        <div class='mountain-climber' style='bottom:${climberBottom}px;'>🧗‍♂️</div>
        <div class='mountain-peak'>🏔️</div>
      </div>
    </div>
  `;
  document.getElementById('mountain-submit-btn').onclick = checkMountainWord;
  document.getElementById('mountain-word-input').onkeypress = function(e) {
    if (e.key === 'Enter') checkMountainWord();
  };
}
// Print certificate
function showMountainCertificate() {
  const container = document.getElementById('mountain-game-container');
  if (!container) return;
  container.innerHTML = `<div style='background:#fffbe7;border:2px solid #FFD700;border-radius:18px;padding:32px;max-width:420px;margin:32px auto;text-align:center;box-shadow:0 4px 16px #FFD70033;'>
    <h2 style='color:#32CD32;margin-bottom:12px;'>🏅 Certificate of Resilience</h2>
    <div style='font-size:1.15em;color:#764ba2;margin-bottom:18px;'>This award is presented to:</div>
    <input id='mountain-cert-name' placeholder='Your Name' style='font-size:1.1em;padding:8px 12px;border-radius:8px;border:1.5px solid #FFD700;margin-bottom:18px;width:70%;text-align:center;'/><br>
    <div style='font-size:1.08em;color:#388e3c;margin-bottom:18px;'>For climbing the mountain, solving word challenges, and showing amazing resilience!</div>
    <div style='font-size:1em;color:#0288D1;margin-bottom:18px;'>Date: ${new Date().toLocaleDateString()}</div>
    <button onclick='window.print()' style='background:#FFD700;color:#764ba2;border:none;border-radius:8px;padding:10px 28px;font-size:1.1em;font-weight:700;cursor:pointer;'>Print Certificate</button>
    <div style='margin-top:18px;'><button onclick='showMountainClimbGame()' style='background:#32CD32;color:#fff;border:none;border-radius:8px;padding:10px 28px;font-size:1.1em;font-weight:700;cursor:pointer;'>Back to Game</button></div>
  </div>`;
}

function checkMountainWord() {
  const input = document.getElementById('mountain-word-input');
  if (!input) return;
  const guess = input.value.trim().toLowerCase();
  if (guess === mountainWords[currentStep].word) {
    currentStep++;
    renderStep();
  } else {
    const msg = document.getElementById('mountain-message');
    if (msg) msg.textContent = 'Try again! Remember, resilience means not giving up.';
  }
}

// Auto-initialize when section is shown
if (window.location.hash === '#mountain-climb' || document.getElementById('mountain-climb').classList.contains('active')) {
  showMountainClimbGame();
}
// Optional: Expose for navigation
window.showMountainClimbGame = showMountainClimbGame;
