// Literacy Activities Module - Enhanced with Complex Sentences and Story Builder

const literacyActivities = {
    currentActivity: null,
    score: 0,
    totalStars: 0,
    currentQuestion: null,
    stories: [],
    currentStoryIndex: 0
};

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log('Literacy activities initializing...');
    initializeLiteracyActivities();
    loadLiteracyProgress();
    loadStories();
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
        case 'story-builder':
            html = createStoryBuilderActivity();
            break;
        default:
            html = '<p>Activity not found!</p>';
    }

    container.innerHTML = html;
    console.log('Literacy activity HTML loaded');
    attachLiteracyEventListeners();
}

// ===== LETTERS ACTIVITY =====
function createLettersActivity() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const targetLetter = letters[Math.floor(Math.random() * letters.length)];

    literacyActivities.currentQuestion = { answer: targetLetter };

    const options = [targetLetter];
    while (options.length < 6) {
        const random = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(random)) {
            options.push(random);
        }
    }
    options.sort(() => Math.random() - 0.5);

    return `
        <div class="literacy-question">
            <h3>Find the Letter! 🔤</h3>
            <div style="font-size: 6em; text-align: center; margin: 40px 0; color: var(--primary-color); font-weight: bold;">
                ${targetLetter}
            </div>
            <p style="font-size: 1.3em; text-align: center;">Click on the matching letter:</p>
            <div class="letter-grid">
                ${options.map(letter => `
                    <button class="letter-btn" data-answer="${letter}">${letter}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== PHONICS ACTIVITY =====
function createPhonicsActivity() {
    const phonics = [
        { sound: 'CAT', phoneme: 'C', options: ['C', 'K', 'S'] },
        { sound: 'DOG', phoneme: 'D', options: ['D', 'T', 'B'] },
        { sound: 'SUN', phoneme: 'S', options: ['S', 'C', 'Z'] },
        { sound: 'BAT', phoneme: 'B', options: ['B', 'P', 'D'] },
        { sound: 'HAT', phoneme: 'H', options: ['H', 'F', 'W'] },
        { sound: 'PIG', phoneme: 'P', options: ['P', 'B', 'T'] }
    ];

    const question = phonics[Math.floor(Math.random() * phonics.length)];
    literacyActivities.currentQuestion = { answer: question.phoneme };

    return `
        <div class="literacy-question">
            <h3>Beginning Sounds! 🔊</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">What sound does this word start with?</p>
            <div style="font-size: 5em; text-align: center; margin: 30px 0; color: var(--secondary-color); font-weight: bold;">
                ${question.sound}
            </div>
            <div class="letter-grid">
                ${question.options.map(letter => `
                    <button class="letter-btn" data-answer="${letter}">${letter}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== SPELLING ACTIVITY =====
function createSpellingActivity() {
    const words = ['CAT', 'DOG', 'SUN', 'HAT', 'BIG', 'RUN', 'FUN', 'BAT', 'TOP', 'PIG'];
    const targetWord = words[Math.floor(Math.random() * words.length)];

    literacyActivities.currentQuestion = { answer: targetWord };

    return `
        <div class="literacy-question">
            <h3>Spell the Word! 🖊️</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Type this word:</p>
            <div style="font-size: 5em; text-align: center; margin: 30px 0; color: var(--primary-color); font-weight: bold;">
                ${targetWord.toUpperCase()}
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <input type="text" id="spellingInput" placeholder="Type here..." style="font-size: 2em; padding: 15px; border: 3px solid var(--primary-color); border-radius: 10px; text-align: center; width: 300px; text-transform: uppercase;">
            </div>
            <div style="text-align: center;">
                <button class="check-spelling-btn" style="font-size: 1.5em; padding: 15px 40px; background: var(--secondary-color); color: white; border: none; border-radius: 10px; cursor: pointer;">Check Answer</button>
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== VOCABULARY ACTIVITY =====
function createVocabularyActivity() {
    const vocabulary = [
        { word: 'HAPPY', emoji: '😊', choices: ['😊', '😢', '😡'] },
        { word: 'SAD', emoji: '😢', choices: ['😢', '😊', '😴'] },
        { word: 'ANGRY', emoji: '😡', choices: ['😡', '😊', '😢'] },
        { word: 'SLEEPY', emoji: '😴', choices: ['😴', '😡', '😊'] },
        { word: 'SURPRISED', emoji: '😲', choices: ['😲', '😊', '😴'] },
        { word: 'LOVE', emoji: '❤️', choices: ['❤️', '😢', '😡'] }
    ];

    const question = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    literacyActivities.currentQuestion = { answer: question.emoji };

    return `
        <div class="literacy-question">
            <h3>Match the Feeling! 📖</h3>
            <div style="font-size: 4em; text-align: center; margin: 30px 0; color: var(--primary-color); font-weight: bold;">
                ${question.word}
            </div>
            <p style="font-size: 1.3em; text-align: center;">Which face matches this word?</p>
            <div class="letter-grid">
                ${question.choices.map(emoji => `
                    <button class="letter-btn" data-answer="${emoji}" style="font-size: 3em;">${emoji}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== SIGHT WORDS ACTIVITY =====
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

// ===== SENTENCES ACTIVITY (ENHANCED) =====
function createSentencesActivity() {
    // Three difficulty levels
    const sentencesEasy = [
        { words: ['The', 'cat', 'runs'], correct: 'The cat runs' },
        { words: ['I', 'see', 'you'], correct: 'I see you' },
        { words: ['Dogs', 'can', 'jump'], correct: 'Dogs can jump' },
        { words: ['We', 'like', 'fun'], correct: 'We like fun' },
        { words: ['The', 'sun', 'is', 'hot'], correct: 'The sun is hot' },
        { words: ['Cats', 'like', 'milk'], correct: 'Cats like milk' },
        { words: ['I', 'can', 'read'], correct: 'I can read' },
        { words: ['Birds', 'can', 'fly'], correct: 'Birds can fly' }
    ];
    
    const sentencesMedium = [
        { words: ['The', 'happy', 'cat', 'plays'], correct: 'The happy cat plays' },
        { words: ['My', 'dog', 'loves', 'running', 'fast'], correct: 'My dog loves running fast' },
        { words: ['Birds', 'fly', 'high', 'in', 'sky'], correct: 'Birds fly high in sky' },
        { words: ['She', 'reads', 'books', 'every', 'day'], correct: 'She reads books every day' }
    ];
    
    const sentencesHard = [
        { words: ['The', 'curious', 'cat', 'jumped', 'over', 'the', 'fence'], correct: 'The curious cat jumped over the fence' },
        { words: ['My', 'fluffy', 'dog', 'likes', 'to', 'play', 'in', 'the', 'garden'], correct: 'My fluffy dog likes to play in the garden' },
        { words: ['She', 'enjoys', 'reading', 'adventure', 'stories', 'before', 'bedtime'], correct: 'She enjoys reading adventure stories before bedtime' },
        { words: ['The', 'colorful', 'butterfly', 'landed', 'on', 'the', 'beautiful', 'flower'], correct: 'The colorful butterfly landed on the beautiful flower' }
    ];

    // Randomly pick a difficulty level
    const rand = Math.random();
    let sentences;
    let difficulty;
    if (rand < 0.4) {
        sentences = sentencesEasy;
        difficulty = 'Easy';
    } else if (rand < 0.7) {
        sentences = sentencesMedium;
        difficulty = 'Medium';
    } else {
        sentences = sentencesHard;
        difficulty = 'Hard';
    }

    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    literacyActivities.currentQuestion = { answer: sentence.correct };

    const shuffled = [...sentence.words].sort(() => Math.random() - 0.5);

    return `
        <div class="literacy-question">
            <h3>Build a Sentence! ✏️</h3>
            <div style="background: var(--secondary-color); color: white; padding: 10px; border-radius: 10px; display: inline-block; margin-bottom: 20px;">
                ${difficulty} Level
            </div>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Put these words in order:</p>
            <div class="word-grid" style="margin: 30px auto;">
                ${shuffled.map(word => `
                    <button class="word-btn" data-answer="${sentence.correct}">${word}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== RHYMING ACTIVITY =====
function createRhymingActivity() {
    const rhymes = [
        { word: 'CAT', rhyme: 'HAT', choices: ['HAT', 'DOG', 'SUN'] },
        { word: 'DOG', rhyme: 'LOG', choices: ['LOG', 'CAT', 'PIG'] },
        { word: 'BIG', rhyme: 'PIG', choices: ['PIG', 'HAT', 'SUN'] },
        { word: 'SUN', rhyme: 'FUN', choices: ['FUN', 'BAT', 'DOG'] }
    ];

    const question = rhymes[Math.floor(Math.random() * rhymes.length)];
    literacyActivities.currentQuestion = { answer: question.rhyme };

    return `
        <div class="literacy-question">
            <h3>Find the Rhyme! 🎵</h3>
            <div style="font-size: 4em; text-align: center; margin: 30px 0; color: var(--secondary-color); font-weight: bold;">
                ${question.word}
            </div>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Which word rhymes with ${question.word}?</p>
            <div class="word-grid">
                ${question.choices.map(word => `
                    <button class="word-btn" data-answer="${word}">${word}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== READING ACTIVITY =====
function createReadingActivity() {
    const stories = [
        {
            text: 'The cat sat on the mat.',
            question: 'Where did the cat sit?',
            answer: 'mat',
            choices: ['mat', 'hat', 'dog']
        },
        {
            text: 'I see a big red ball.',
            question: 'What color is the ball?',
            answer: 'red',
            choices: ['red', 'blue', 'green']
        },
        {
            text: 'The dog runs fast.',
            question: 'What does the dog do?',
            answer: 'runs',
            choices: ['runs', 'sits', 'jumps']
        }
    ];

    const story = stories[Math.floor(Math.random() * stories.length)];
    literacyActivities.currentQuestion = { answer: story.answer };

    return `
        <div class="literacy-question">
            <h3>Reading Comprehension! 📚</h3>
            <div style="font-size: 1.8em; text-align: center; margin: 30px 0; padding: 30px; background: #f0f0f0; border-radius: 15px; line-height: 1.6;">
                ${story.text}
            </div>
            <p style="font-size: 1.3em; text-align: center; margin: 30px 0; font-weight: bold;">
                ${story.question}
            </p>
            <div class="word-grid">
                ${story.choices.map(choice => `
                    <button class="word-btn" data-answer="${choice}">${choice}</button>
                `).join('')}
            </div>
            <div class="feedback" id="literacyFeedback"></div>
        </div>
    `;
}

// ===== STORY BUILDER ACTIVITY (NEW!) =====
function createStoryBuilderActivity() {
    const storyPrompts = [
        {
            prompt: "Once upon a time, there was a ___ who lived in a ___. One day, they decided to ___.",
            blanks: 3,
            suggestions: [
                ['dragon', 'unicorn', 'fairy', 'wizard'],
                ['castle', 'forest', 'cloud', 'mountain'],
                ['go on an adventure', 'make new friends', 'learn magic', 'explore the world']
            ]
        },
        {
            prompt: "In a magical garden, a ___ discovered a ___. It was very ___ and made them feel ___.",
            blanks: 4,
            suggestions: [
                ['butterfly', 'rabbit', 'kitten', 'puppy'],
                ['treasure', 'secret door', 'rainbow', 'magic wand'],
                ['sparkly', 'colorful', 'mysterious', 'beautiful'],
                ['happy', 'excited', 'curious', 'brave']
            ]
        },
        {
            prompt: "A brave ___ wanted to ___ the ___. With help from a ___, they succeeded!",
            blanks: 4,
            suggestions: [
                ['knight', 'explorer', 'scientist', 'artist'],
                ['save', 'find', 'protect', 'discover'],
                ['kingdom', 'treasure', 'forest', 'animals'],
                ['friend', 'teacher', 'dragon', 'wizard']
            ]
        }
    ];

    const currentPrompt = storyPrompts[literacyActivities.currentStoryIndex % storyPrompts.length];
    
    const savedStories = literacyActivities.stories || [];
    const storiesHTML = savedStories.length > 0 ? `
        <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 15px;">
            <h4 style="color: var(--primary-color);">📚 Your Story Collection</h4>
            ${savedStories.slice(-5).reverse().map((story, i) => `
                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 10px; border-left: 4px solid var(--secondary-color);">
                    <p style="font-size: 1.1em; line-height: 1.6;">${story}</p>
                </div>
            `).join('')}
        </div>
    ` : '';

    return `
        <div class="literacy-question">
            <h3>Story Builder! 📖✨</h3>
            <p style="font-size: 1.2em; text-align: center; margin: 20px 0;">Fill in the blanks to create your own story!</p>
            
            <div style="background: #f0f0f0; padding: 30px; border-radius: 15px; margin: 20px 0;">
                <p id="storyPrompt" style="font-size: 1.5em; line-height: 1.8; text-align: center;">
                    ${currentPrompt.prompt}
                </p>
            </div>

            <div id="wordSuggestions" style="margin: 30px 0;">
                <p style="font-size: 1.2em; font-weight: bold; text-align: center; margin-bottom: 15px;">Word Suggestions:</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; max-width: 800px; margin: 0 auto;">
                    ${currentPrompt.suggestions.flat().map(word => `
                        <button class="suggestion-btn" style="padding: 10px; background: var(--secondary-color); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em;">
                            ${word}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <textarea id="storyInput" placeholder="Type your story here or click suggestions above..." 
                    style="width: 90%; max-width: 700px; min-height: 150px; font-size: 1.3em; padding: 20px; border: 3px solid var(--primary-color); border-radius: 15px; resize: vertical; line-height: 1.6;"></textarea>
            </div>

            <div style="text-align: center; margin: 20px 0;">
                <button id="saveStoryBtn" style="font-size: 1.3em; padding: 15px 40px; background: var(--primary-color); color: white; border: none; border-radius: 10px; cursor: pointer; margin: 0 10px;">
                    💾 Save Story
                </button>
                <button id="newStoryBtn" style="font-size: 1.3em; padding: 15px 40px; background: var(--secondary-color); color: white; border: none; border-radius: 10px; cursor: pointer; margin: 0 10px;">
                    ✨ New Prompt
                </button>
            </div>

            <div class="feedback" id="literacyFeedback"></div>

            ${storiesHTML}
        </div>
    `;
}

// ===== HELPER FUNCTIONS =====
function attachLiteracyEventListeners() {
    console.log('Attaching literacy event listeners...');

    const answerButtons = document.querySelectorAll('#literacyActivity .letter-btn, #literacyActivity .word-btn');
    console.log('Found literacy buttons:', answerButtons.length);

    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const userAnswer = this.getAttribute('data-answer');
            console.log('Literacy button clicked, answer:', userAnswer);
            checkLiteracyAnswer(userAnswer);
        });
    });

    const checkBtn = document.querySelector('#literacyActivity .check-spelling-btn');
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

        const input = document.getElementById('spellingInput');
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const userAnswer = input.value.toUpperCase().trim();
                    checkLiteracyAnswer(userAnswer);
                }
            });
        }
    }

    // Story Builder listeners
    const saveStoryBtn = document.getElementById('saveStoryBtn');
    if (saveStoryBtn) {
        saveStoryBtn.addEventListener('click', saveStory);
    }

    const newStoryBtn = document.getElementById('newStoryBtn');
    if (newStoryBtn) {
        newStoryBtn.addEventListener('click', function() {
            literacyActivities.currentStoryIndex++;
            loadLiteracyActivity('story-builder');
        });
    }

    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textarea = document.getElementById('storyInput');
            if (textarea) {
                const currentText = textarea.value;
                const word = this.textContent.trim();
                textarea.value = currentText + (currentText ? ' ' : '') + word;
                textarea.focus();
            }
        });
    });
}

function checkLiteracyAnswer(userAnswer) {
    console.log('Checking literacy answer:', userAnswer, 'Correct:', literacyActivities.currentQuestion.answer);
    const feedback = document.getElementById('literacyFeedback');
    const correctAnswer = literacyActivities.currentQuestion.answer;

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px; animation: bounce 0.5s;">
                🎉 Excellent! That's correct! 🌟
            </div>
        `;

        literacyActivities.score++;
        literacyActivities.totalStars++;

        if (window.achievements && window.achievements.addStar) {
            window.achievements.addStar();
        }

        updateLiteracyProgress();

        if (window.app && window.app.playSound) {
            window.app.playSound('success');
        }

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

function saveStory() {
    const textarea = document.getElementById('storyInput');
    const feedback = document.getElementById('literacyFeedback');
    
    if (!textarea || !textarea.value.trim()) {
        feedback.innerHTML = `
            <div style="background: #FF9800; color: white; padding: 15px; border-radius: 10px; font-size: 1.2em; margin-top: 20px;">
                Please write your story first! ✏️
            </div>
        `;
        setTimeout(() => {
            feedback.innerHTML = '';
        }, 2000);
        return;
    }

    const story = textarea.value.trim();
    literacyActivities.stories.push(story);
    saveStories();

    feedback.innerHTML = `
        <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px;">
            📚 Story saved! You're a great author! 🌟
        </div>
    `;

    literacyActivities.score++;
    literacyActivities.totalStars += 2; // Bonus stars for creativity!
    
    if (window.achievements && window.achievements.addStar) {
        window.achievements.addStar();
        window.achievements.addStar();
    }

    updateLiteracyProgress();

    if (window.app && window.app.playSound) {
        window.app.playSound('success');
    }

    setTimeout(() => {
        loadLiteracyActivity('story-builder');
    }, 2000);
}

function saveStories() {
    localStorage.setItem('userStories', JSON.stringify(literacyActivities.stories));
}

function loadStories() {
    const saved = localStorage.getItem('userStories');
    if (saved) {
        try {
            literacyActivities.stories = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading stories:', e);
            literacyActivities.stories = [];
        }
    }
}

function updateLiteracyProgress() {
    const starsElement = document.getElementById('literacyStars');
    const progressBar = document.getElementById('literacyProgress');

    if (starsElement) {
        starsElement.textContent = literacyActivities.totalStars;
    }

    if (progressBar) {
        const progress = Math.min(100, (literacyActivities.score % 10) * 10);
        progressBar.style.width = progress + '%';
    }

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
        try {
            const progress = JSON.parse(saved);
            literacyActivities.score = progress.score || 0;
            literacyActivities.totalStars = progress.totalStars || 0;
            updateLiteracyProgress();
        } catch (e) {
            console.error('Error loading literacy progress:', e);
        }
    }
}

// Styling
const literacyStyle = document.createElement('style');
literacyStyle.textContent = `
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

    .suggestion-btn:hover {
        background: var(--primary-color) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(literacyStyle);

