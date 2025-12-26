// Add celebratory confetti and sound effects for the mountain climb game
function showMountainConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.left = 0;
  confetti.style.top = 0;
  confetti.style.width = '100vw';
  confetti.style.height = '100vh';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = 9999;
  confetti.innerHTML = Array.from({length: 80}).map(() => {
    const colors = ['#FFD700','#8ED6FF','#FF69B4','#32CD32','#764ba2','#FF9800'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    const left = Math.random()*100;
    const delay = Math.random()*2;
    const duration = 2.5+Math.random()*1.5;
    return `<div style="position:absolute;left:${left}vw;top:-5vh;width:12px;height:12px;background:${color};border-radius:50%;opacity:0.85;animation:fall ${duration}s ${delay}s linear forwards;"></div>`;
  }).join('');
  document.body.appendChild(confetti);
  setTimeout(()=>confetti.remove(), 5000);
}

// Add keyframes for confetti
const style = document.createElement('style');
style.innerHTML = `@keyframes fall {0%{top:-5vh;}100%{top:105vh;}}`;
document.head.appendChild(style);

// Simple success sound
function playMountainSuccessSound() {
  const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c3b.mp3');
  audio.volume = 0.5;
  audio.play();
}

window.showMountainConfetti = showMountainConfetti;
window.playMountainSuccessSound = playMountainSuccessSound;
