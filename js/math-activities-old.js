// Math Activities Module

const mathActivities = {
    currentActivity: null,
    score: 0,
    totalStars: 0,
    currentQuestion: null
};

// ===== Initialize Math Activities =====
document.addEventListener('DOMContentLoaded', () => {
    initializeMathActivities();
    loadMathProgress();
});

function initializeMathActivities() {
    const activityButtons = document.querySelectorAll('#math .activity-btn');
    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const activity = btn.getAttribute('data-activity');
            loadMathActivity(activity);
            
            activityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (window.app && window.app.playSound) {
                window.app.playSound('click');
            }
        });
    });
}

// ===== Multiplication Activity =====
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
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Division Activity =====
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
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Word Problems Activity =====
function createWordProblemsActivity() {
    const problems = [
        { question: "Sarah has 5 unicorns. She gets 3 more. How many unicorns does she have now?", answer: 8, emoji: '🦄' },
        { question: "There are 12 dinosaurs in the park. 4 walk away. How many are left?", answer: 8, emoji: '🦕' },
        { question: "Tom bakes 3 batches of cookies with 4 cookies each. How many cookies total?", answer: 12, emoji: '🍪' },
        { question: "A box has 15 crayons. You share them equally with 2 friends. How many does each person get?", answer: 5, emoji: '🖍️' },
        { question: "Emma reads 2 books on Monday and 3 books on Tuesday. How many books total?", answer: 5, emoji: '📚' }
    ];
    
    const problem = problems[Math.floor(Math.random() * problems.length)];
    mathActivities.currentQuestion = { answer: problem.answer };
    const options = generateOptions(problem.answer, 4);
    
    return `
        <div class="math-question">
            <h3>Story Problem! 📖</h3>
            <div style="font-size: 4em; text-align: center; margin: 20px 0;">
                ${problem.emoji}
            </div>
            <p style="font-size: 1.4em; line-height: 1.8; padding: 20px; background: white; border-radius: 15px; max-width: 600px; margin: 20px auto;">
                ${problem.question}
            </p>
            <div class="answer-grid">
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Comparing Numbers Activity =====
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
            <h3>Compare Numbers! ⚖️</h3>
            <p style="font-size: 1.3em; text-align: center; margin: 20px 0;">Which symbol goes in the middle?</p>
            <div style="font-size: 4em; text-align: center; margin: 30px 0; display: flex; align-items: center; justify-content: center; gap: 40px;">
                <span>${num1}</span>
                <span style="color: #9370DB;">?</span>
                <span>${num2}</span>
            </div>
            <div class="answer-grid" style="max-width: 400px;">
                <button class="answer-btn" data-answer=">" style="font-size: 3em;">&gt;</button>
                <button class="answer-btn" data-answer="<" style="font-size: 3em;">&lt;</button>
                <button class="answer-btn" data-answer="=" style="font-size: 3em;">=</button>
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Time Telling Activity =====
function createTimeActivity() {
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const minutes = [0, 15, 30, 45];
    
    const hour = hours[Math.floor(Math.random() * hours.length)];
    const minute = minutes[Math.floor(Math.random() * minutes.length)];
    
    const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
    mathActivities.currentQuestion = { answer: timeString };
    
    // Generate wrong options
    const options = [timeString];
    while (options.length < 4) {
        const wrongHour = hours[Math.floor(Math.random() * hours.length)];
        const wrongMinute = minutes[Math.floor(Math.random() * minutes.length)];
        const wrongTime = `${wrongHour}:${wrongMinute.toString().padStart(2, '0')}`;
        if (!options.includes(wrongTime)) {
            options.push(wrongTime);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
    return `
        <div class="math-question">
            <h3>What Time Is It? ⏰</h3>
            <div style="font-size: 8em; text-align: center; margin: 30px 0;">
                🕐
            </div>
            <p style="font-size: 1.3em; text-align: center;">The clock shows:</p>
            <div style="font-size: 4em; text-align: center; margin: 20px 0; color: var(--primary-color);">
                ${timeString}
            </div>
            <p style="font-size: 1.2em; text-align: center; margin: 20px 0;">Click the matching time:</p>
            <div class="answer-grid">
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}" style="font-size: 1.8em;">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Money Counting Activity =====
function createMoneyActivity() {
    const coins = [
        { name: 'penny', value: 1, emoji: '🪙' },
        { name: 'nickel', value: 5, emoji: '🪙' },
        { name: 'dime', value: 10, emoji: '🪙' },
        { name: 'quarter', value: 25, emoji: '🪙' }
    ];
    
    const numCoins = Math.floor(Math.random() * 3) + 2;
    let total = 0;
    let coinDisplay = [];
    
    for (let i = 0; i < numCoins; i++) {
        const coin = coins[Math.floor(Math.random() * coins.length)];
        total += coin.value;
        coinDisplay.push(`${coin.emoji} ${coin.value}¢`);
    }
    
    mathActivities.currentQuestion = { answer: total };
    const options = generateOptions(total, 4);
    
    return `
        <div class="math-question">
            <h3>Count the Money! 💰</h3>
            <div style="font-size: 2em; text-align: center; margin: 30px 0;">
                ${coinDisplay.join(' + ')}
            </div>
            <p style="font-size: 1.3em; text-align: center;">How many cents in total?</p>
            <div class="answer-grid">
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}¢</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

function loadMathActivity(activityType) {
    console.log('Loading math activity:', activityType);
    mathActivities.currentActivity = activityType;
    const container = document.getElementById('mathActivity');
    console.log('Container found:', container);
    
    switch(activityType) {
        case 'counting':
            container.innerHTML = createCountingActivity();
            break;
        case 'addition':
            container.innerHTML = createAdditionActivity();
            break;
        case 'subtraction':
            container.innerHTML = createSubtractionActivity();
            break;
        case 'patterns':
            container.innerHTML = createPatternsActivity();
            break;
        case 'multiplication':
            container.innerHTML = createMultiplicationActivity();
            break;
        case 'division':
            container.innerHTML = createDivisionActivity();
            break;
        case 'word-problems':
            container.innerHTML = createWordProblemsActivity();
            break;
        case 'comparing':
            container.innerHTML = createComparingActivity();
            break;
        case 'time':
            container.innerHTML = createTimeActivity();
            break;
        case 'money':
            container.innerHTML = createMoneyActivity();
            break;
    }
    
    attachMathEventListeners();
}

// ===== Counting Activity =====
function createCountingActivity() {
    const count = Math.floor(Math.random() * 10) + 1;
    const emoji = ['🦄', '🦕', '⭐', '🌈', '🎈', '🍎'][Math.floor(Math.random() * 6)];
    
    mathActivities.currentQuestion = { answer: count, emoji: emoji };
    
    return `
        <div class="math-question">
            <h3>Count the ${emoji}!</h3>
            <div style="font-size: 4em; padding: 30px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                ${Array(count).fill(emoji).join(' ')}
            </div>
            <div class="answer-grid">
                ${[...Array(10)].map((_, i) => `
                    <button class="answer-btn" data-answer="${i + 1}">${i + 1}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Addition Activity =====
function createAdditionActivity() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    
    mathActivities.currentQuestion = { answer: answer };
    
    // Generate multiple choice options
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Addition Challenge! ➕</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} + ${num2} = ?
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
                <div style="font-size: 2em;">${Array(num1).fill('🦄').join(' ')}</div>
                <div style="font-size: 3em;">+</div>
                <div style="font-size: 2em;">${Array(num2).fill('🦄').join(' ')}</div>
            </div>
            <div class="answer-grid">
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Subtraction Activity =====
function createSubtractionActivity() {
    const num1 = Math.floor(Math.random() * 10) + 5;
    const num2 = Math.floor(Math.random() * num1) + 1;
    const answer = num1 - num2;
    
    mathActivities.currentQuestion = { answer: answer };
    
    const options = generateOptions(answer, 4);
    
    return `
        <div class="math-question">
            <h3>Subtraction Challenge! ➖</h3>
            <div class="equation" style="font-size: 4em; text-align: center; margin: 30px 0;">
                ${num1} - ${num2} = ?
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2em;">${Array(num1).fill('⭐').join(' ')}</div>
                <div style="font-size: 2em; margin: 10px 0;">Take away ${num2}...</div>
            </div>
            <div class="answer-grid">
                ${options.map(opt => `
                    <button class="answer-btn" data-answer="${opt}">${opt}</button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Patterns Activity =====
function createPatternsActivity() {
    const patterns = [
        { seq: ['🦄', '🦕', '🦄', '🦕', '🦄'], answer: '🦕', choices: ['🦄', '🦕', '🌈'] },
        { seq: ['⭐', '⭐', '🌙', '⭐', '⭐'], answer: '🌙', choices: ['⭐', '🌙', '☀️'] },
        { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', choices: ['🔴', '🔵', '🟢'] },
        { seq: ['1', '2', '3', '1', '2'], answer: '3', choices: ['1', '2', '3'] }
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    mathActivities.currentQuestion = { answer: pattern.answer };
    
    return `
        <div class="math-question">
            <h3>Complete the Pattern! 🔄</h3>
            <p style="font-size: 1.3em; text-align: center;">What comes next?</p>
            <div style="font-size: 4em; text-align: center; padding: 30px;">
                ${pattern.seq.join(' ')} <span style="color: #9370DB;">?</span>
            </div>
            <div class="answer-grid">
                ${pattern.choices.map(choice => `
                    <button class="answer-btn pattern-btn" data-answer="${choice}" style="font-size: 3em;">
                        ${choice}
                    </button>
                `).join('')}
            </div>
            <div class="feedback" id="mathFeedback"></div>
        </div>
    `;
}

// ===== Helper Functions =====
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
    console.log('Attaching math event listeners');
    const answerButtons = document.querySelectorAll('.answer-btn');
    console.log('Found answer buttons:', answerButtons.length);
    answerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Answer clicked:', btn.getAttribute('data-answer'));
            checkMathAnswer(btn.getAttribute('data-answer'));
        });
    });
}

function checkMathAnswer(userAnswer) {
    const feedback = document.getElementById('mathFeedback');
    const correctAnswer = mathActivities.currentQuestion.answer.toString();
    
    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 15px; font-size: 1.5em; margin-top: 20px;">
                🎉 Great job! That's correct! 🌟
            </div>
        `;
        
        mathActivities.score++;
        mathActivities.totalStars++;
        
        // Add achievement tracking
        if (window.achievements) {
            window.achievements.addStar();
        }
        
        updateMathProgress();
        if (window.app && window.app.playSound) {
            window.app.playSound('success');
        }
        
        // Load new question after delay
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
    
    starsElement.textContent = mathActivities.totalStars;
    
    const progress = Math.min(100, (mathActivities.score % 10) * 10);
    progressBar.style.width = `${progress}%`;
    
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
        const progress = JSON.parse(saved);
        mathActivities.score = progress.score || 0;
        mathActivities.totalStars = progress.totalStars || 0;
        updateMathProgress();
    }
}

// Styling for answer buttons
const style = document.createElement('style');
style.textContent = `
    .math-question {
        text-align: center;
    }
    
    .equation {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .answer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 15px;
        max-width: 600px;
        margin: 30px auto;
    }
    
    .answer-btn {
        padding: 20px;
        font-size: 2em;
        background: white;
        border: 3px solid var(--primary-color);
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: bold;
    }
    
    .answer-btn:hover {
        background: var(--primary-color);
        color: white;
        transform: scale(1.1);
    }
    
    .pattern-btn {
        padding: 30px;
    }
`;
document.head.appendChild(style);
