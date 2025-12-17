// Math Activities Module - Simplified and Fixed

const mathActivities = {
    currentActivity: null,
    score: 0,
    totalStars: 0,
    currentQuestion: null
};

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log('Math activities initializing...');
    initializeMathActivities();
    loadMathProgress();
});

function initializeMathActivities() {
    const activityButtons = document.querySelectorAll('#math .activity-btn');
    console.log('Found math activity buttons:', activityButtons.length);
    
    activityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            console.log('Math activity clicked:', activity);
            
            activityButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (window.app && window.app.playSound) {
                window.app.playSound('click');
            }
            
            loadMathActivity(activity);
        });
    });
}

function loadMathActivity(activityType) {
    console.log('Loading activity:', activityType);
    mathActivities.currentActivity = activityType;
    const container = document.getElementById('mathActivity');
    
    if (!container) {
        console.error('Math activity container not found!');
        return;
    }
    
    let html = '';
    
    switch(activityType) {
        case 'counting':
            html = createCountingActivity();
            break;
        case 'addition':
            html = createAdditionActivity();
            break;
        case 'subtraction':
            html = createSubtractionActivity();
            break;
        case 'multiplication':
            html = createMultiplicationActivity();
            break;
        case 'division':
            html = createDivisionActivity();
            break;
        case 'word-problems':
            html = createWordProblemsActivity();
            break;
        case 'comparing':
            html = createComparingActivity();
            break;
        case 'patterns':
            html = createPatternsActivity();
            break;
        case 'time':
            html = createTimeActivity();
            break;
        case 'money':
            html = createMoneyActivity();
            break;
        default:
            html = '<p>Activity not found!</p>';
    }
    
    container.innerHTML = html;
    console.log('Activity HTML loaded');
    attachMathEventListeners();
}

// ===== COUNTING ACTIVITY =====
function createCountingActivity() {
    const count = Math.floor(Math.random() * 10) + 1;
    const emojis = ['🦄', '🦕', '⭐', '🌈', '🎈', '🍎'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    mathActivities.currentQuestion = { answer: count };
    
    // Build emoji string
    let emojiDisplay = '';
    for (let i = 0; i < count; i++) {
        emojiDisplay += emoji + ' ';
    }
    
    return `
        <div class="math-question">
            <h3>Count the ${emoji}!</h3>
            <div style="font-size: 3em; padding: 30px; text-align: center;">
                ${emojiDisplay}
            </div>
            <div class="answer-grid">
                <button class="answer-btn" data-answer="1">1</button>
                <button class="answer-btn" data-answer="2">2</button>
                <button class="answer-btn" data-answer="3">3</button>
                <button class="answer-btn" data-answer="4">4</button>
                <button class="answer-btn" data-answer="5">5</button>
                <button class="answer-btn" data-answer="6">6</button>
                <button class="answer-btn" data-answer="7">7</button>
                <button class="answer-btn" data-answer="8">8</button>
                <button class="answer-btn" data-answer="9">9</button>
                <button class="answer-btn" data-answer="10">10</button>
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== ADDITION ACTIVITY =====
function createAdditionActivity() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    
    mathActivities.currentQuestion = { answer: answer };
    
    // Build unicorn displays
    let unicorns1 = '';
    for (let i = 0; i < num1; i++) {
        unicorns1 += '🦄 ';
    }
    let unicorns2 = '';
    for (let i = 0; i < num2; i++) {
        unicorns2 += '🦄 ';
    }
    
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Addition Challenge! ➕</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} + ${num2} = ?
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2em; margin: 10px 0;">${unicorns1}</div>
                <div style="font-size: 2em;">+</div>
                <div style="font-size: 2em; margin: 10px 0;">${unicorns2}</div>
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== SUBTRACTION ACTIVITY =====
function createSubtractionActivity() {
    const num1 = Math.floor(Math.random() * 10) + 5;
    const num2 = Math.floor(Math.random() * num1) + 1;
    const answer = num1 - num2;
    
    mathActivities.currentQuestion = { answer: answer };
    
    // Build stars
    let stars = '';
    for (let i = 0; i < num1; i++) {
        stars += '⭐ ';
    }
    
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Subtraction Challenge! ➖</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} - ${num2} = ?
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2em;">${stars}</div>
                <div style="font-size: 1.5em; margin: 10px 0;">Take away ${num2}...</div>
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== MULTIPLICATION ACTIVITY =====
function createMultiplicationActivity() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;
    
    mathActivities.currentQuestion = { answer: answer };
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Multiplication Challenge! ✖️</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} × ${num2} = ?
            </div>
            <div style="text-align: center; margin: 20px 0; font-size: 1.2em;">
                ${num1} groups of ${num2}
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== DIVISION ACTIVITY =====
function createDivisionActivity() {
    const num2 = Math.floor(Math.random() * 9) + 2;
    const answer = Math.floor(Math.random() * 10) + 1;
    const num1 = num2 * answer;
    
    mathActivities.currentQuestion = { answer: answer };
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Division Challenge! ➗</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} ÷ ${num2} = ?
            </div>
            <div style="text-align: center; margin: 20px 0; font-size: 1.2em;">
                Share ${num1} into ${num2} equal groups
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== WORD PROBLEMS ACTIVITY =====
function createWordProblemsActivity() {
    const problems = [
        { question: "Sarah has 5 unicorns. She gets 3 more. How many unicorns does she have now?", answer: 8 },
        { question: "There are 12 dinosaurs in the park. 4 walk away. How many are left?", answer: 8 },
        { question: "Tom bakes 3 batches of cookies with 4 cookies each. How many cookies total?", answer: 12 },
        { question: "A box has 15 crayons. You share them equally with 2 friends (3 people total). How many does each person get?", answer: 5 },
        { question: "Emma reads 2 books on Monday and 3 books on Tuesday. How many books total?", answer: 5 }
    ];
    
    const problem = problems[Math.floor(Math.random() * problems.length)];
    mathActivities.currentQuestion = { answer: problem.answer };
    const options = generateOptions(problem.answer, 4);
    
    return `
        <div class="math-question">
            <h3>Story Problem 📖</h3>
            <div style="font-size: 1.3em; padding: 30px; text-align: center; line-height: 1.6;">
                ${problem.question}
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== COMPARING ACTIVITY =====
function createComparingActivity() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    let answer;
    if (num1 > num2) answer = '>';
    else if (num1 < num2) answer = '<';
    else answer = '=';
    
    mathActivities.currentQuestion = { answer: answer };
    
    return `
        <div class="math-question">
            <h3>Which is Bigger? ⚖️</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} ___ ${num2}
            </div>
            <div style="text-align: center; margin: 20px 0; font-size: 1.2em;">
                Choose the correct symbol
            </div>
            <div class="answer-grid">
                <button class="answer-btn" data-answer=">" style="font-size: 2em;">></button>
                <button class="answer-btn" data-answer="<" style="font-size: 2em;"><</button>
                <button class="answer-btn" data-answer="=" style="font-size: 2em;">=</button>
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== PATTERNS ACTIVITY =====
function createPatternsActivity() {
    const patterns = [
        { seq: ['🦄', '🦕', '🦄', '🦕', '🦄'], answer: '🦕', choices: ['🦄', '🦕', '🌈'] },
        { seq: ['⭐', '⭐', '🌙', '⭐', '⭐'], answer: '🌙', choices: ['⭐', '🌙', '☀️'] },
        { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', choices: ['🔴', '🔵', '🟢'] }
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    mathActivities.currentQuestion = { answer: pattern.answer };
    
    return `
        <div class="math-question">
            <h3>Complete the Pattern! 🔄</h3>
            <div style="font-size: 3em; text-align: center; margin: 30px 0;">
                ${pattern.seq.join(' ')} <span style="color: #999;">?</span>
            </div>
            <div class="answer-grid">
                ${pattern.choices.map(choice => `
                    <button class="answer-btn" data-answer="${choice}" style="font-size: 3em;">
                        ${choice}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== TIME ACTIVITY =====
function createTimeActivity() {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const answer = `${hour}:${minute === 0 ? '00' : minute}`;
    
    mathActivities.currentQuestion = { answer: answer };
    
    return `
        <div class="math-question">
            <h3>What Time Is It? ⏰</h3>
            <div style="font-size: 1.3em; text-align: center; margin: 30px 0;">
                The clock shows ${hour}:${minute === 0 ? '00' : minute}
            </div>
            <div class="answer-grid">
                <button class="answer-btn" data-answer="${answer}">${answer}</button>
                <button class="answer-btn" data-answer="${hour}:15">${hour}:15</button>
                <button class="answer-btn" data-answer="${hour}:30">${hour}:30</button>
                <button class="answer-btn" data-answer="${hour}:45">${hour}:45</button>
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== MONEY ACTIVITY =====
function createMoneyActivity() {
    const coins = [1, 5, 10, 25];
    const count = Math.floor(Math.random() * 5) + 1;
    const coin = coins[Math.floor(Math.random() * coins.length)];
    const answer = coin * count;
    
    mathActivities.currentQuestion = { answer: answer };
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Count the Money! 💰</h3>
            <div style="font-size: 1.3em; text-align: center; margin: 20px 0;">
                You have ${count} coins worth ${coin}¢ each
            </div>
            <div style="font-size: 3em; text-align: center; margin: 20px 0;">
                🪙 × ${count}
            </div>
            <div style="text-align: center; margin: 10px 0;">
                How many cents total?
            </div>
            <div class="answer-grid">
                ${options.map(opt => `<button class="answer-btn" data-answer="${opt}">${opt}¢</button>`).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== HELPER FUNCTIONS =====
function generateOptions(correctAnswer, count) {
    const options = new Set([correctAnswer]);
    
    while (options.size < count) {
        const offset = Math.floor(Math.random() * 6) - 3;
        const option = Math.max(0, correctAnswer + offset);
        if (option !== correctAnswer) {
            options.add(option);
        }
    }
    
    return Array.from(options).sort(() => Math.random() - 0.5);
}

function attachMathEventListeners() {
    console.log('Attaching event listeners...');
    const answerButtons = document.querySelectorAll('#mathActivity .answer-btn');
    console.log('Found buttons:', answerButtons.length);
    
    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const userAnswer = this.getAttribute('data-answer');
            console.log('Button clicked, answer:', userAnswer);
            checkMathAnswer(userAnswer);
        });
    });
}

function checkMathAnswer(userAnswer) {
    console.log('Checking answer:', userAnswer, 'Correct:', mathActivities.currentQuestion.answer);
    const feedback = document.getElementById('mathFeedback');
    const correctAnswer = mathActivities.currentQuestion.answer.toString();
    
    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px; animation: bounce 0.5s;">
                🎉 Correct! Amazing work! 🌟
            </div>
        `;
        
        mathActivities.score++;
        mathActivities.totalStars++;
        
        if (window.achievements && window.achievements.addStar) {
            window.achievements.addStar();
        }
        
        updateMathProgress();
        
        if (window.app && window.app.playSound) {
            window.app.playSound('success');
        }
        
        setTimeout(() => {
            loadMathActivity(mathActivities.currentActivity);
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

function updateMathProgress() {
    const starsElement = document.getElementById('starsCount');
    const progressBar = document.getElementById('mathProgress');
    
    if (starsElement) {
        starsElement.textContent = mathActivities.totalStars;
    }
    
    if (progressBar) {
        const progress = Math.min(100, (mathActivities.score % 10) * 10);
        progressBar.style.width = progress + '%';
    }
    
    saveMathProgress();
}

function saveMathProgress() {
    localStorage.setItem('mathProgress', JSON.stringify({
        score: mathActivities.score,
        totalStars: mathActivities.totalStars
    }));
}

function loadMathProgress() {
    const saved = localStorage.getItem('mathProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            mathActivities.score = progress.score || 0;
            mathActivities.totalStars = progress.totalStars || 0;
            updateMathProgress();
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}
