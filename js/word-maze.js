// Word Maze Game
// Kids find a path through a grid of letters to spell the target word

const wordMazeWords = ['UNICORN', 'DRAGON', 'MAGIC', 'CASTLE', 'RAINBOW', 'HAPPY', 'JUMP', 'STARS', 'BOOK', 'DANCE'];
let wordMazeState = {
    grid: [],
    word: '',
    path: [],
    found: false
};

function startWordMazeGame() {
    wordMazeState.word = wordMazeWords[Math.floor(Math.random() * wordMazeWords.length)];
    wordMazeState.grid = generateWordMazeGrid(wordMazeState.word);
    wordMazeState.path = [];
    wordMazeState.found = false;
    renderWordMaze();
cd "C:\Users\mille\OneDrive\Desktop\Kids Groovy Hip Hop Happening Unicorn App"


function generateWordMazeGrid(word) {
    // 6x6 grid, word placed randomly in a path
    const size = 6;
    let grid = Array(size).fill().map(() => Array(size).fill(''));
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    grid[row][col] = word[0];
    let positions = [[row, col]];
    for (let i = 1; i < word.length; i++) {
        let options = [
            [row+1, col], [row-1, col], [row, col+1], [row, col-1]
        ].filter(([r, c]) => r >= 0 && r < size && c >= 0 && c < size && !grid[r][c]);
        if (options.length === 0) break;
        [row, col] = options[Math.floor(Math.random() * options.length)];
        grid[row][col] = word[i];
        positions.push([row, col]);
    }
    // Fill rest with random letters
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (!grid[r][c]) grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
    return grid;
}

function renderWordMaze() {
    const container = document.getElementById('literacyActivity');
    if (!container) return;
    let html = `<div class='word-maze-game'><h3>Word Maze: Spell "${wordMazeState.word}"</h3><div class='maze-grid'>`;
    for (let r = 0; r < wordMazeState.grid.length; r++) {
        html += '<div class="maze-row">';
        for (let c = 0; c < wordMazeState.grid[r].length; c++) {
            let selected = wordMazeState.path.some(([pr, pc]) => pr === r && pc === c);
            html += `<button class='maze-cell${selected ? ' selected' : ''}' data-row='${r}' data-col='${c}'>${wordMazeState.grid[r][c]}</button>`;
        }
        html += '</div>';
    }
    html += '</div><div class="maze-status"></div></div>';
    container.innerHTML = html;
    document.querySelectorAll('.maze-cell').forEach(btn => {
        btn.addEventListener('click', function() {
            selectMazeCell(parseInt(this.getAttribute('data-row')), parseInt(this.getAttribute('data-col')));
        });
    });
    updateWordMazeStatus();
}

function selectMazeCell(row, col) {
    if (wordMazeState.found) return;
    wordMazeState.path.push([row, col]);
    let pathWord = wordMazeState.path.map(([r, c]) => wordMazeState.grid[r][c]).join('');
    if (pathWord === wordMazeState.word) {
        wordMazeState.found = true;
    }
    renderWordMaze();
}

function updateWordMazeStatus() {
    const status = document.querySelector('.maze-status');
    if (!status) return;
    let pathWord = wordMazeState.path.map(([r, c]) => wordMazeState.grid[r][c]).join('');
    if (wordMazeState.found) {
        status.innerHTML = `<span style='color: #4CAF50; font-size: 1.2em;'>🎉 You found the word: ${wordMazeState.word}!</span>`;
    } else {
        status.innerHTML = `<span>Current path: <b>${pathWord}</b></span>`;
    }
}

// To start the game, call startWordMazeGame() and ensure there is a div with id="literacyActivity" in your HTML.
