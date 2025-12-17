// Floor is Lava Word Game
// Kids must quickly select correct words/letters to escape before the lava rises

const lavaWords = ['UNICORN', 'DRAGON', 'MAGIC', 'CASTLE', 'RAINBOW', 'HAPPY', 'JUMP', 'STARS', 'BOOK', 'DANCE'];
let lavaState = {
    word: '',
    letters: [],
    selected: [],
    timeLeft: 30,
    timer: null,
    gameOver: false
};

function startLavaGame() {
    lavaState.word = lavaWords[Math.floor(Math.random() * lavaWords.length)];
    lavaState.letters = shuffleArray(lavaState.word.split('').concat(randomLetters(6)));
    lavaState.selected = [];
    lavaState.timeLeft = 30;
    lavaState.gameOver = false;
    renderLavaGame();
    startLavaTimer();
}

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function randomLetters(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }
    return arr;
}

function renderLavaGame() {
    const container = document.getElementById('literacyActivity');
    if (!container) return;
    let html = `<div class='lava-game'><h3>Floor is Lava! Spell "${lavaState.word}"</h3><div class='lava-timer'>Time Left: <span id='lavaTime'>${lavaState.timeLeft}</span>s</div><div class='lava-letters'>`;
    lavaState.letters.forEach((l, i) => {
        let selected = lavaState.selected.includes(i);
        html += `<button class='lava-letter${selected ? ' selected' : ''}' data-index='${i}' ${selected ? 'disabled' : ''}>${l}</button>`;
    });
    html += '</div><div class="lava-status"></div></div>';
    container.innerHTML = html;
    document.querySelectorAll('.lava-letter').forEach(btn => {
        btn.addEventListener('click', function() {
            selectLavaLetter(parseInt(this.getAttribute('data-index')));
        });
    });
    updateLavaStatus();
}

function selectLavaLetter(index) {
    if (lavaState.gameOver || lavaState.selected.includes(index)) return;
    lavaState.selected.push(index);
    let currentWord = lavaState.selected.map(i => lavaState.letters[i]).join('');
    if (currentWord === lavaState.word) {
        lavaState.gameOver = true;
        clearInterval(lavaState.timer);
    }
    renderLavaGame();
}

function startLavaTimer() {
    clearInterval(lavaState.timer);
    lavaState.timer = setInterval(() => {
        lavaState.timeLeft--;
        document.getElementById('lavaTime').textContent = lavaState.timeLeft;
        if (lavaState.timeLeft <= 0) {
            lavaState.gameOver = true;
            clearInterval(lavaState.timer);
            renderLavaGame();
        }
    }, 1000);
}

function updateLavaStatus() {
    const status = document.querySelector('.lava-status');
    if (!status) return;
    let currentWord = lavaState.selected.map(i => lavaState.letters[i]).join('');
    if (lavaState.gameOver && currentWord === lavaState.word) {
        status.innerHTML = `<span style='color: #4CAF50; font-size: 1.2em;'>🎉 You escaped! The word was ${lavaState.word}!</span>`;
    } else if (lavaState.gameOver) {
        status.innerHTML = `<span style='color: #e53935; font-size: 1.2em;'>🔥 The lava got you! The word was ${lavaState.word}.</span>`;
    } else {
        status.innerHTML = `<span>Current: <b>${currentWord}</b></span>`;
    }
}

// To start the game, call startLavaGame() and ensure there is a div with id="literacyActivity" in your HTML.
