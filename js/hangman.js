// Hangman-style Literacy Game
// Add this script to your literacy activities for a fun word-guessing game!

// Themed and difficulty-based word lists
const hangmanWordLists = {
    easy: {
        Animals: ['CAT', 'DOG', 'FISH', 'BIRD', 'FROG', 'COW', 'PIG', 'BAT', 'ANT', 'BUG'],
        Colors: ['RED', 'BLUE', 'PINK', 'GRAY', 'GOLD', 'LIME', 'CYAN', 'NAVY', 'TAN', 'TEAL'],
        School: ['BOOK', 'PEN', 'DESK', 'BELL', 'MAP', 'MATH', 'ART', 'BAG', 'TAPE', 'RULER']
    },
    medium: {
        Fantasy: ['UNICORN', 'DRAGON', 'MAGIC', 'CASTLE', 'WIZARD', 'FAIRY', 'ELF', 'TROLL', 'SPELL', 'POTION'],
        Nature: ['FOREST', 'MOUNTAIN', 'RIVER', 'OCEAN', 'DESERT', 'ISLAND', 'VALLEY', 'CANYON', 'GLACIER', 'VOLCANO'],
        Sports: ['SOCCER', 'TENNIS', 'HOCKEY', 'BASKET', 'SKATER', 'BOXING', 'GOLF', 'BOWLING', 'CYCLING', 'ROWING']
    },
    hard: {
        Science: ['GRAVITY', 'ATOM', 'MOLECULE', 'ENERGY', 'PLANET', 'GALAXY', 'NEURON', 'PROTEIN', 'ELECTRON', 'VIRUS'],
        Feelings: ['CURIOUS', 'EXCITED', 'NERVOUS', 'SURPRISED', 'CONFUSED', 'RELIEVED', 'DISGUSTED', 'FRUSTRATED', 'GRATEFUL', 'EMBARRASSED'],
        Adventure: ['EXPLORER', 'TREASURE', 'JOURNEY', 'DISCOVER', 'MYSTERY', 'CHALLENGE', 'MISSION', 'ESCAPE', 'SURVIVAL', 'VOYAGE']
    }
};

let hangmanState = {
    word: '',
    guessed: [],
    wrong: 0,
    maxWrong: 6
};

function startHangmanGame(theme, difficulty) {
    hangmanDifficulty = difficulty || hangmanDifficulty;
    hangmanTheme = theme || hangmanTheme;
    const list = hangmanWordLists[hangmanDifficulty][hangmanTheme];
    hangmanState.word = list[Math.floor(Math.random() * list.length)];
    hangmanState.guessed = [];
    hangmanState.wrong = 0;
    renderHangman();
}

function renderHangman() {
    const container = document.getElementById('literacyActivity');
    if (!container) return;
    let displayWord = hangmanState.word.split('').map(l => hangmanState.guessed.includes(l) ? l : '_').join(' ');
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l =>
        `<button class="hangman-letter" data-letter="${l}" ${hangmanState.guessed.includes(l) ? 'disabled' : ''}>${l}</button>`
    ).join(' ');

    // Theme and difficulty selectors
    let themeOptions = Object.keys(hangmanWordLists[hangmanDifficulty]).map(theme =>
        `<option value="${theme}" ${theme === hangmanTheme ? 'selected' : ''}>${theme}</option>`
    ).join('');
    let difficultyOptions = Object.keys(hangmanWordLists).map(diff =>
        `<option value="${diff}" ${diff === hangmanDifficulty ? 'selected' : ''}>${diff.charAt(0).toUpperCase() + diff.slice(1)}</option>`
    ).join('');

    container.innerHTML = `
        <div class="hangman-game">
            <h3>Hangman: Guess the Word!</h3>
            <div class="hangman-graphic">${getHangmanSVG(hangmanState.wrong)}</div>
            <div class="hangman-word">${displayWord}</div>
            <div class="hangman-letters">${letters}</div>
            <div class="hangman-status"></div>
        </div>
    `;
    document.querySelectorAll('.hangman-letter').forEach(btn => {
        btn.addEventListener('click', function() {
            guessHangmanLetter(this.getAttribute('data-letter'));
        });
    });
    document.getElementById('hangmanThemeSelect').addEventListener('change', function() {
        startHangmanGame(this.value, hangmanDifficulty);
    });
    document.getElementById('hangmanDifficultySelect').addEventListener('change', function() {
        startHangmanGame(hangmanTheme, this.value);
    });
    updateHangmanStatus();
}

function guessHangmanLetter(letter) {
    if (hangmanState.guessed.includes(letter)) return;
    hangmanState.guessed.push(letter);
    if (!hangmanState.word.includes(letter)) {
        hangmanState.wrong++;
    }
    renderHangman();
}

function updateHangmanStatus() {
    const status = document.querySelector('.hangman-status');
    if (!status) return;
    if (hangmanState.word.split('').every(l => hangmanState.guessed.includes(l))) {
        status.innerHTML = '<span style="color: #4CAF50; font-size: 1.2em;">🎉 You won! The word was ' + hangmanState.word + '!</span>';
    } else if (hangmanState.wrong >= hangmanState.maxWrong) {
        status.innerHTML = '<span style="color: #e53935; font-size: 1.2em;">😢 Game over! The word was ' + hangmanState.word + '.</span>';
    }
}

function getHangmanSVG(wrong) {
    // Simple stick figure hangman SVG
    let parts = [
        '<circle cx="50" cy="30" r="10" stroke="#333" stroke-width="3" fill="none"/>', // head
        '<line x1="50" y1="40" x2="50" y2="70" stroke="#333" stroke-width="3"/>', // body
        '<line x1="50" y1="50" x2="40" y2="60" stroke="#333" stroke-width="3"/>', // left arm
        '<line x1="50" y1="50" x2="60" y2="60" stroke="#333" stroke-width="3"/>', // right arm
        '<line x1="50" y1="70" x2="40" y2="90" stroke="#333" stroke-width="3"/>', // left leg
        '<line x1="50" y1="70" x2="60" y2="90" stroke="#333" stroke-width="3"/>'  // right leg
    ];
    return `<svg width="100" height="100">${parts.slice(0, wrong).join('')}</svg>`;
}

// To start the game, call startHangmanGame() and ensure there is a div with id="literacyActivity" in your HTML.
