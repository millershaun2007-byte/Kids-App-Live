// Literacy Activities Module

const literacyActivities = {
    currentActivity: null,
    score: 0,
    totalStars: 0,
    currentQuestion: null
};

// ===== Initialize Literacy Activities =====
window.addEventListener('DOMContentLoaded', function() {
    console.log('Literacy activities initializing...');
    initializeLiteracyActivities();
    loadLiteracyProgress();
});

function initializeLiteracyActivities() {
    const activityButtons = document.querySelectorAll('#literacy .activity-btn');
    console.log('Found literacy activity buttons:', activityButtons.length);
    
    activityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            console.log('Literacy activity clicked:', activity);
            
            activityButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (window.app && window.app.playSound) {
                window.app.playSound('click');
            }
            
            loadLiteracyActivity(activity);
        });
    });
}

function loadLiteracyActivity(activityType) {
    console.log('Loading literacy activity:', activityType);
    literacyActivities.currentActivity = activityType;
    const container = document.getElementById('literacyActivity');
    
    if (!container) {
        console.error('Literacy activity container not found!');
        return;
    }
    
    let html = '';
    
    switch(activityType) {
        case 'letters':
            html = createLettersActivity();
            break;
        case 'phonics':
            html = createPhonicsActivity();
            break;
        case 'spelling':
            html = createSpellingActivity();
            break;
        case 'vocabulary':
            html = createVocabularyActivity();
            break;
        case 'sight-words':
            html = createSightWordsActivity();
            break;
        case 'sentences':
            html = createSentencesActivity();
            break;
        case 'rhyming':
            html = createRhymingActivity();
            break;
        case 'reading':
            html = createReadingActivity();
            break;
        default:
            html = '<p>Activity not found!</p>';
    }
    
    container.innerHTML = html;
    console.log('Literacy activity HTML loaded');
    attachLiteracyEventListeners();
}

// ===== Sight Words Activity =====
function createSightWordsActivity() {
    const sightWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy'];
    
    const targetWord = sightWords[Math.floor(Math.random() * sightWords.length)];
    literacyActivities.currentQuestion = { answer: targetWord };
    
    const options = [targetWord];
    while (options.length < 4) {
        const random = sightWords[Math.floor(Math.random() * sightWords.length)];
        if (!options.includes(random)) {
            options.push(random);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="literacy-question">
            <h3>Sight Word Practice! 👁️</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Read this word:</p>
            <div style="font-size: 5em; text-align: center; margin: 30px 0; color: var(--primary-color); font-weight: bold;">
                ${targetWord.toUpperCase()}
            </div>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Now find it below:</p>
            <div class="word-grid">
                ${options.map(word => `
                    <button class="word-btn" data-answer="${word}">${word}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Sentence Building Activity =====
function createSentencesActivity() {
    const sentences = [
        { words: ['The', 'cat', 'is', 'big'], correct: 'The cat is big' },
        { words: ['I', 'like', 'to', 'play'], correct: 'I like to play' },
        { words: ['Dogs', 'can', 'run', 'fast'], correct: 'Dogs can run fast' },
        { words: ['We', 'go', 'to', 'school'], correct: 'We go to school' },
        { words: ['The', 'sun', 'is', 'hot'], correct: 'The sun is hot' }
    ];
    
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const shuffled = [...sentence.words].sort(() => Math.random() - 0.5);
    
    literacyActivities.currentQuestion = { answer: sentence.correct, type: 'sentence' };
    
    return `
        <div class="literacy-question">
            <h3>Build a Sentence! ✏️</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Put these words in the correct order:</p>
            <div id="wordBank" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 30px auto; max-width: 600px;">
                ${shuffled.map((word, i) => `
                    <button class="draggable-word" data-word="${word}" style="
                        padding: 15px 25px;
                        font-size: 1.5em;
                        background: var(--accent-color);
                        border: 3px solid var(--primary-color);
                        border-radius: 12px;
                        cursor: move;
                    ">${word}</button>
                `).join('')}
            </div>
            <div id="sentenceBuilder" style="
                min-height: 80px;
                border: 3px dashed var(--primary-color);
                border-radius: 15px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                align-items: center;
                justify-content: center;
            ">
                <p style="color: #999; font-size: 1.2em;">Drag words here...</p>
            </div>
            <button class="check-sentence-btn" style="
                padding: 15px 40px;
                font-size: 1.5em;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 15px;
                cursor: pointer;
                display: block;
                margin: 20px auto;
            ">Check Answer ✓</button>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Rhyming Activity =====
function createRhymingActivity() {
    const rhymes = [
        { word: 'cat', rhymes: ['hat', 'bat', 'rat'], notRhyme: 'dog' },
        { word: 'sun', rhymes: ['fun', 'run', 'bun'], notRhyme: 'moon' },
        { word: 'hop', rhymes: ['pop', 'mop', 'top'], notRhyme: 'jump' },
        { word: 'ball', rhymes: ['tall', 'call', 'fall'], notRhyme: 'toy' },
        { word: 'tree', rhymes: ['bee', 'see', 'me'], notRhyme: 'leaf' }
    ];
    
    const rhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
    const correctRhyme = rhyme.rhymes[Math.floor(Math.random() * rhyme.rhymes.length)];
    
    literacyActivities.currentQuestion = { answer: correctRhyme };
    
    const options = [correctRhyme, rhyme.notRhyme];
    // Add one more non-rhyme
    const allWords = ['dog', 'moon', 'jump', 'toy', 'leaf', 'car', 'book'];
    options.push(allWords.find(w => !options.includes(w) && w !== rhyme.word));
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="literacy-question">
            <h3>Find the Rhyme! 🎵</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Which word rhymes with:</p>
            <div style="font-size: 5em; text-align: center; margin: 30px 0; color: var(--secondary-color);">
                ${rhyme.word}
            </div>
            <div class="word-grid">
                ${options.map(word => `
                    <button class="word-btn" data-answer="${word}">${word}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Reading Comprehension Activity =====
function createReadingActivity() {
    const stories = [
        {
            text: "The little unicorn loved to play in the rainbow garden. Every day she would dance with the butterflies. 🦋",
            question: "Where did the unicorn play?",
            answer: "rainbow garden",
            options: ["rainbow garden", "the forest", "the mountain", "the beach"]
        },
        {
            text: "Tim the dinosaur was very hungry. He ate ten big leaves for breakfast. Then he felt much better! 🦕",
            question: "What did Tim eat?",
            answer: "leaves",
            options: ["leaves", "meat", "fruit", "grass"]
        },
        {
            text: "Emma found a magic star that could grant wishes. She wished for all children to be happy. ⭐",
            question: "What did Emma wish for?",
            answer: "children to be happy",
            options: ["children to be happy", "a new toy", "more wishes", "a pet"]
        }
    ];
    
    const story = stories[Math.floor(Math.random() * stories.length)];
    literacyActivities.currentQuestion = { answer: story.answer };
    
    return `
        <div class="literacy-question">
            <h3>Reading Time! 📚</h3>
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                margin: 20px auto;
                max-width: 600px;
                border: 3px solid var(--primary-color);
            ">
                <p style="font-size: 1.4em; line-height: 2; text-align: left;">
                    ${story.text}
                </p>
            </div>
            <p style="font-size: 1.3em; text-align: center; margin: 30px 0; font-weight: bold; color: var(--primary-color);">
                ${story.question}
            </p>
            <div class="word-grid">
                ${story.options.map(opt => `
                    <button class="word-btn" data-answer="${opt}" style="font-size: 1.1em; padding: 20px;">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Letter Recognition Activity =====
function createLettersActivity() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const targetLetter = letters[Math.floor(Math.random() * letters.length)];
    
    literacyActivities.currentQuestion = { answer: targetLetter };
    
    // Generate 6 options including the correct letter
    const options = [targetLetter];
    while (options.length < 6) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="literacy-question">
            <h3>Find the Letter!</h3>
            <div style="font-size: 6em; text-align: center; margin: 30px 0; color: var(--primary-color);">
                ${targetLetter}
            </div>
            <p style="font-size: 1.5em; text-align: center;">Click on the letter <strong>${targetLetter}</strong></p>
            <div class="letter-grid">
                ${options.map(letter => `
                    <button class="letter-btn" data-answer="${letter}">
                        ${letter}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Phonics Activity =====
function createPhonicsActivity() {
    const phonicsWords = [
        { word: 'CAT', sound: 'C-A-T', image: '🐱' },
        { word: 'DOG', sound: 'D-O-G', image: '🐕' },
        { word: 'SUN', sound: 'S-U-N', image: '☀️' },
        { word: 'BAT', sound: 'B-A-T', image: '🦇' },
        { word: 'HAT', sound: 'H-A-T', image: '🎩' },
        { word: 'PIG', sound: 'P-I-G', image: '🐷' },
        { word: 'BEE', sound: 'B-E-E', image: '🐝' },
        { word: 'FOX', sound: 'F-O-X', image: '🦊' }
    ];
    
    const target = phonicsWords[Math.floor(Math.random() * phonicsWords.length)];
    literacyActivities.currentQuestion = { answer: target.word };
    
    // Generate options
    const options = [target];
    while (options.length < 4) {
        const random = phonicsWords[Math.floor(Math.random() * phonicsWords.length)];
        if (!options.find(opt => opt.word === random.word)) {
            options.push(random);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="literacy-question">
            <h3>Sound It Out! 🔊</h3>
            <div style="font-size: 8em; text-align: center; margin: 20px 0;">
                ${target.image}
            </div>
            <div style="font-size: 2em; text-align: center; margin: 20px 0; color: var(--primary-color);">
                ${target.sound}
            </div>
            <p style="font-size: 1.5em; text-align: center;">Which word matches the picture?</p>
            <div class="word-grid">
                ${options.map(opt => `
                    <button class="word-btn" data-answer="${opt.word}">
                        ${opt.word}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Spelling Activity =====
function createSpellingActivity() {
    const words = [
        { word: 'UNICORN', hint: '🦄', scrambled: 'RNCIUNO' },
        { word: 'DINOSAUR', hint: '🦕', scrambled: 'RUOANIDS' },
        { word: 'RAINBOW', hint: '🌈', scrambled: 'WOBNAIR' },
        { word: 'STAR', hint: '⭐', scrambled: 'RATS' },
        { word: 'MOON', hint: '🌙', scrambled: 'ONOM' },
        { word: 'HAPPY', hint: '😊', scrambled: 'PAHPY' },
        { word: 'JUMP', hint: '🦘', scrambled: 'PMUJ' }
    ];
    
    const target = words[Math.floor(Math.random() * words.length)];
    literacyActivities.currentQuestion = { answer: target.word };
    
    return `
        <div class="literacy-question">
            <h3>Unscramble the Word! 📝</h3>
            <div style="font-size: 6em; text-align: center; margin: 20px 0;">
                ${target.hint}
            </div>
            <div style="font-size: 2.5em; text-align: center; margin: 20px 0; color: var(--secondary-color); letter-spacing: 10px;">
                ${target.scrambled}
            </div>
            <p style="font-size: 1.3em; text-align: center;">Type the correct spelling:</p>
            <div style="text-align: center; margin: 20px 0;">
                <input type="text" id="spellingInput" class="spelling-input" placeholder="Type here..." 
                    style="font-size: 2em; padding: 15px; border: 3px solid var(--primary-color); 
                    border-radius: 10px; text-align: center; text-transform: uppercase; width: 300px;">
            </div>
            <div style="text-align: center;">
                <button class="check-spelling-btn" style="padding: 15px 40px; font-size: 1.5em; 
                    background: var(--primary-color); color: white; border: none; border-radius: 15px; 
                    cursor: pointer;">Check Answer ✓</button>
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Vocabulary Activity =====
function createVocabularyActivity() {
    const vocabulary = [
        { word: 'BRAVE', definition: 'Not afraid; courageous', emoji: '🦁', options: ['BRAVE', 'SCARED', 'TIRED', 'HUNGRY'] },
        { word: 'HAPPY', definition: 'Feeling joy and pleasure', emoji: '😊', options: ['HAPPY', 'SAD', 'ANGRY', 'TIRED'] },
        { word: 'HUGE', definition: 'Very, very big', emoji: '🐘', options: ['HUGE', 'TINY', 'FAST', 'SLOW'] },
        { word: 'SPARKLE', definition: 'To shine with little flashes of light', emoji: '✨', options: ['SPARKLE', 'DARK', 'QUIET', 'LOUD'] },
        { word: 'MAGIC', definition: 'Special powers to make impossible things happen', emoji: '🪄', options: ['MAGIC', 'NORMAL', 'BORING', 'SIMPLE'] },
        { word: 'FRIEND', definition: 'Someone you like and enjoy being with', emoji: '🤝', options: ['FRIEND', 'ENEMY', 'STRANGER', 'ALONE'] }
    ];
    
    const target = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    literacyActivities.currentQuestion = { answer: target.word };
    
    return `
        <div class="literacy-question">
            <h3>Build Your Vocabulary! 📖</h3>
            <div style="font-size: 6em; text-align: center; margin: 20px 0;">
                ${target.emoji}
            </div>
            <div style="background: var(--card-bg); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 500px;">
                <p style="font-size: 1.5em; text-align: center; line-height: 1.8;">
                    <strong>Definition:</strong><br>
                    "${target.definition}"
                </p>
            </div>
            <p style="font-size: 1.3em; text-align: center;">Which word matches this meaning?</p>
            <div class="word-grid">
                ${target.options.map(word => `
                    <button class="word-btn" data-answer="${word}">
                        ${word}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== Helper Functions =====
function attachLiteracyEventListeners() {
    console.log('Attaching literacy event listeners...');
    
    // Letter and word buttons
    const buttons = document.querySelectorAll('#literacyActivity .letter-btn, #literacyActivity .word-btn');
    console.log('Found literacy buttons:', buttons.length);
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const userAnswer = this.getAttribute('data-answer');
            console.log('Literacy button clicked, answer:', userAnswer);
            checkLiteracyAnswer(userAnswer);
        });
    });
    
    // Spelling check button
    const checkBtn = document.querySelector('.check-spelling-btn');
    if (checkBtn) {
        console.log('Found spelling check button');
        checkBtn.addEventListener('click', function() {
            const input = document.getElementById('spellingInput');
            if (input) {
                const userAnswer = input.value.toUpperCase().trim();
                console.log('Spelling check clicked, answer:', userAnswer);
                checkLiteracyAnswer(userAnswer);
            }
        });
        
        // Allow Enter key to submit
        const input = document.getElementById('spellingInput');
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkLiteracyAnswer(input.value.toUpperCase().trim());
                }
            });
        }
    }
    
    // Sentence building
    const sentenceBtn = document.querySelector('.check-sentence-btn');
    if (sentenceBtn) {
        const draggables = document.querySelectorAll('.draggable-word');
        const builder = document.getElementById('sentenceBuilder');
        
        draggables.forEach(word => {
            word.addEventListener('click', function() {
                // Move word to sentence builder
                if (builder.querySelector('p')) {
                    builder.innerHTML = '';
                }
                builder.appendChild(this.cloneNode(true));
            });
        });
        
        sentenceBtn.addEventListener('click', function() {
            const words = Array.from(builder.querySelectorAll('.draggable-word'))
                .map(w => w.getAttribute('data-word'));
            checkLiteracyAnswer(words.join(' '));
        });
    }
}

function checkLiteracyAnswer(userAnswer) {
    const feedback = document.getElementById('literacyFeedback');
    const correctAnswer = literacyActivities.currentQuestion.answer;
    
    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px;">
                🎉 Excellent! That's correct! 🌟
            </div>
        `;
        
        literacyActivities.score++;
        literacyActivities.totalStars++;
        
        // Add achievement tracking
        if (window.achievements) {
            window.achievements.addStar();
        }
        
        updateLiteracyProgress();
        if (window.app && window.app.playSound) {
            window.app.playSound('success');
        }
        
        // Load new question after delay
        setTimeout(() => {
            loadLiteracyActivity(literacyActivities.currentActivity);
        }, 2000);
    } else {
        feedback.innerHTML = `
            <div style="background: #FF9800; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px;">
                Not quite! Try again! 💪
            </div>
        `;
        
        setTimeout(() => {
            feedback.innerHTML = '';
        }, 1500);
    }
}

function updateLiteracyProgress() {
    const starsElement = document.getElementById('literacyStars');
    const progressBar = document.getElementById('literacyProgress');
    
    starsElement.textContent = literacyActivities.totalStars;
    
    const progress = Math.min(100, (literacyActivities.score % 10) * 10);
    progressBar.style.width = `${progress}%`;
    
    saveLiteracyProgress();
}

function saveLiteracyProgress() {
    localStorage.setItem('literacyProgress', JSON.stringify({
        score: literacyActivities.score,
        totalStars: literacyActivities.totalStars
    }));
}

function loadLiteracyProgress() {
    const saved = localStorage.getItem('literacyProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        literacyActivities.score = progress.score || 0;
        literacyActivities.totalStars = progress.totalStars || 0;
        updateLiteracyProgress();
    }
}

// Styling for literacy buttons
const style = document.createElement('style');
style.textContent = `
    .literacy-question {
        text-align: center;
    }
    
    .letter-grid,
    .word-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 15px;
        max-width: 600px;
        margin: 30px auto;
    }
    
    .letter-btn,
    .word-btn {
        padding: 25px;
        font-size: 2.5em;
        background: white;
        border: 3px solid var(--primary-color);
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: bold;
    }
    
    .letter-btn:hover,
    .word-btn:hover {
        background: var(--secondary-color);
        color: white;
        transform: scale(1.1);
    }
    
    .spelling-input:focus {
        outline: 3px solid var(--accent-color);
        border-color: var(--secondary-color);
    }
    
    .check-spelling-btn:hover {
        background: var(--secondary-color) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
