// Sensory Zone / Calm Corner Module

const calmCorner = {
    currentActivity: null,
    breathingTimer: null,
    musicPlaying: false,
    currentSound: null,
    bubbles: [],
    canvas: null,
    ctx: null
};

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log('Calm Corner initializing...');
    initializeCalmCorner();
});

function initializeCalmCorner() {
    const calmButtons = document.querySelectorAll('.calm-btn');
    console.log('Found calm activity buttons:', calmButtons.length);

    calmButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            console.log('Calm activity clicked:', activity);

            calmButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (window.app && window.app.playSound) {
                window.app.playSound('click');
            }

            loadCalmActivity(activity);
        });
    });

    // Load default activity (breathing)
    loadCalmActivity('breathing');
}

function loadCalmActivity(activityType) {
    console.log('Loading calm activity:', activityType);
    calmCorner.currentActivity = activityType;
    const container = document.getElementById('calmActivity');

    if (!container) {
        console.error('Calm activity container not found!');
        return;
    }

    // Stop any ongoing activities
    stopAllCalmActivities();

    let html = '';

    switch(activityType) {
        case 'breathing':
            html = createBreathingActivity();
            break;
        case 'music':
            html = createMusicActivity();
            break;
        case 'bubbles':
            html = createBubblesActivity();
            break;
        case 'drawing':
            html = createCalmDrawingActivity();
            break;
        default:
            html = '<p>Activity not found!</p>';
    }

    container.innerHTML = html;
    console.log('Calm activity HTML loaded');
    attachCalmEventListeners();
}

function stopAllCalmActivities() {
    // Stop breathing timer
    if (calmCorner.breathingTimer) {
        clearInterval(calmCorner.breathingTimer);
        calmCorner.breathingTimer = null;
    }

    // Stop music
    if (calmCorner.currentSound) {
        try {
            calmCorner.currentSound.pause();
            calmCorner.currentSound = null;
        } catch (e) {
            console.log('Error stopping sound:', e);
        }
    }
    calmCorner.musicPlaying = false;

    // Clear bubbles
    calmCorner.bubbles = [];
}

// ===== BREATHING EXERCISE =====
function createBreathingActivity() {
    return `
        <div class="breathing-container" style="text-align: center; padding: 40px;">
            <h3 style="color: #9370DB; margin-bottom: 30px;">Take Deep Breaths 🌬️</h3>
            
            <div class="breathing-circle-container" style="position: relative; width: 300px; height: 300px; margin: 40px auto;">
                <div id="breathingCircle" style="
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 50px auto;
                    transition: all 4s ease-in-out;
                    box-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5em;
                    font-weight: bold;
                ">
                    Breathe In
                </div>
            </div>

            <div style="margin: 30px 0;">
                <p id="breathingInstruction" style="font-size: 1.8em; color: #764ba2; font-weight: bold;">
                    Breathe In... 1... 2... 3... 4...
                </p>
            </div>

            <div style="margin: 30px 0;">
                <button id="startBreathing" class="action-btn" style="font-size: 1.3em; padding: 15px 40px;">
                    ▶️ Start Breathing Exercise
                </button>
                <button id="stopBreathing" class="action-btn" style="font-size: 1.3em; padding: 15px 40px; display: none;">
                    ⏸️ Pause
                </button>
            </div>

            <div style="background: rgba(147, 112, 219, 0.1); padding: 20px; border-radius: 15px; margin-top: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
                <p style="font-size: 1.1em; margin: 0;">
                    💜 Breathe in slowly through your nose for 4 counts<br>
                    💙 Hold your breath for 4 counts<br>
                    💚 Breathe out slowly through your mouth for 4 counts<br>
                    💛 Repeat as many times as you need
                </p>
            </div>
        </div>
    `;
}

function startBreathingExercise() {
    const circle = document.getElementById('breathingCircle');
    const instruction = document.getElementById('breathingInstruction');
    const startBtn = document.getElementById('startBreathing');
    const stopBtn = document.getElementById('stopBreathing');

    if (!circle || !instruction) return;

    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';

    let phase = 0; // 0: breathe in, 1: hold, 2: breathe out, 3: hold

    calmCorner.breathingTimer = setInterval(() => {
        phase = (phase + 1) % 4;

        switch(phase) {
            case 0: // Breathe In
                circle.style.width = '280px';
                circle.style.height = '280px';
                circle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                circle.textContent = 'Breathe In';
                instruction.textContent = 'Breathe In... 1... 2... 3... 4...';
                instruction.style.color = '#667eea';
                break;
            case 1: // Hold
                instruction.textContent = 'Hold... 1... 2... 3... 4...';
                instruction.style.color = '#9370DB';
                break;
            case 2: // Breathe Out
                circle.style.width = '200px';
                circle.style.height = '200px';
                circle.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
                circle.textContent = 'Breathe Out';
                instruction.textContent = 'Breathe Out... 1... 2... 3... 4...';
                instruction.style.color = '#fed6e3';
                break;
            case 3: // Hold
                instruction.textContent = 'Hold... 1... 2... 3... 4...';
                instruction.style.color = '#a8edea';
                break;
        }
    }, 4000); // 4 seconds per phase
}

function stopBreathingExercise() {
    if (calmCorner.breathingTimer) {
        clearInterval(calmCorner.breathingTimer);
        calmCorner.breathingTimer = null;
    }

    const startBtn = document.getElementById('startBreathing');
    const stopBtn = document.getElementById('stopBreathing');
    const circle = document.getElementById('breathingCircle');
    const instruction = document.getElementById('breathingInstruction');

    if (startBtn && stopBtn) {
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
    }

    if (circle) {
        circle.style.width = '200px';
        circle.style.height = '200px';
        circle.textContent = 'Breathe In';
    }

    if (instruction) {
        instruction.textContent = 'Click Start when ready';
        instruction.style.color = '#764ba2';
    }
}

// ===== CALMING MUSIC =====
function createMusicActivity() {
    return `
        <div class="music-container" style="text-align: center; padding: 40px;">
            <h3 style="color: #9370DB; margin-bottom: 30px;">Calming Sounds 🎵</h3>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <div class="music-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 30px 0;">
                    
                    <button class="music-choice-btn" data-sound="rain" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        font-size: 1.3em;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        <div style="font-size: 3em; margin-bottom: 10px;">🌧️</div>
                        Rain Sounds
                    </button>

                    <button class="music-choice-btn" data-sound="ocean" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                        color: #333;
                        border: none;
                        border-radius: 15px;
                        font-size: 1.3em;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        <div style="font-size: 3em; margin-bottom: 10px;">🌊</div>
                        Ocean Waves
                    </button>

                    <button class="music-choice-btn" data-sound="forest" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                        color: #333;
                        border: none;
                        border-radius: 15px;
                        font-size: 1.3em;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        <div style="font-size: 3em; margin-bottom: 10px;">🌲</div>
                        Forest Birds
                    </button>

                    <button class="music-choice-btn" data-sound="piano" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                        color: #333;
                        border: none;
                        border-radius: 15px;
                        font-size: 1.3em;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        <div style="font-size: 3em; margin-bottom: 10px;">🎹</div>
                        Soft Piano
                    </button>

                </div>

                <div id="musicPlayer" style="margin-top: 40px; padding: 30px; background: rgba(147, 112, 219, 0.1); border-radius: 15px; display: none;">
                    <p style="font-size: 1.5em; margin-bottom: 20px;">
                        <span id="currentSoundName">Select a sound</span>
                    </p>
                    <div style="margin: 20px 0;">
                        <label style="font-size: 1.2em; color: #764ba2;">Volume: </label>
                        <input type="range" id="volumeControl" min="0" max="100" value="50" style="width: 200px;">
                        <span id="volumeValue">50</span>%
                    </div>
                    <button id="stopMusic" class="action-btn" style="font-size: 1.2em; padding: 12px 30px;">
                        ⏹️ Stop
                    </button>
                </div>

                <div style="background: rgba(147, 112, 219, 0.1); padding: 20px; border-radius: 15px; margin-top: 30px;">
                    <p style="font-size: 1.1em; margin: 0; color: #764ba2;">
                        💜 Pick your favorite calming sound and relax<br>
                        🎧 Close your eyes and listen<br>
                        ✨ Take as long as you need
                    </p>
                </div>
            </div>
        </div>
    `;
}

function playCalmMusic(soundType) {
    // Stop any current sound
    if (calmCorner.currentSound) {
        calmCorner.currentSound.pause();
    }

    // Since we don't have actual audio files yet, we'll show a visual indication
    const player = document.getElementById('musicPlayer');
    const soundName = document.getElementById('currentSoundName');
    
    if (player && soundName) {
        player.style.display = 'block';
        
        const soundNames = {
            rain: '🌧️ Rain Sounds',
            ocean: '🌊 Ocean Waves',
            forest: '🌲 Forest Birds',
            piano: '🎹 Soft Piano'
        };
        
        soundName.textContent = soundNames[soundType] || soundType;
        calmCorner.musicPlaying = true;

        // Show success message
        if (window.app && window.app.showMessage) {
            window.app.showMessage('Playing ' + soundNames[soundType] + ' ✨', 'success');
        }

        // Note: In a production app, we would load and play actual audio files here
        // For now, this creates the UI for when audio files are added
    }
}

function stopCalmMusic() {
    if (calmCorner.currentSound) {
        calmCorner.currentSound.pause();
        calmCorner.currentSound = null;
    }

    const player = document.getElementById('musicPlayer');
    if (player) {
        player.style.display = 'none';
    }

    calmCorner.musicPlaying = false;

    if (window.app && window.app.showMessage) {
        window.app.showMessage('Music stopped 🎵', 'info');
    }
}

// ===== BUBBLE POP GAME =====
function createBubblesActivity() {
    return `
        <div class="bubbles-container" style="text-align: center; padding: 40px;">
            <h3 style="color: #9370DB; margin-bottom: 20px;">Pop the Bubbles! 🫧</h3>
            <p style="font-size: 1.2em; color: #764ba2; margin-bottom: 30px;">
                Click or tap the bubbles to pop them - it's so satisfying! ✨
            </p>

            <div id="bubbleCanvas" style="
                position: relative;
                width: 100%;
                max-width: 800px;
                height: 500px;
                margin: 0 auto;
                background: linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%);
                border-radius: 20px;
                overflow: hidden;
                cursor: pointer;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            ">
                <!-- Bubbles will be added here by JavaScript -->
            </div>

            <div style="margin-top: 30px;">
                <button id="addMoreBubbles" class="action-btn" style="font-size: 1.2em; padding: 12px 30px;">
                    ➕ More Bubbles!
                </button>
            </div>

            <div style="background: rgba(147, 112, 219, 0.1); padding: 20px; border-radius: 15px; margin-top: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
                <p style="font-size: 1.1em; margin: 0; color: #764ba2;">
                    💜 Pop bubbles to calm your mind<br>
                    ✨ Watch them float and drift<br>
                    🫧 Each pop is satisfying and peaceful
                </p>
            </div>
        </div>
    `;
}

function startBubbles() {
    calmCorner.bubbles = [];
    const container = document.getElementById('bubbleCanvas');
    if (!container) return;

    // Create initial bubbles
    for (let i = 0; i < 10; i++) {
        createBubble();
    }

    // Animate bubbles
    setInterval(() => {
        calmCorner.bubbles.forEach(bubble => {
            if (bubble.element && bubble.element.parentNode) {
                bubble.y -= bubble.speed;
                bubble.x += Math.sin(bubble.y / 30) * 0.5;
                
                bubble.element.style.left = bubble.x + 'px';
                bubble.element.style.bottom = bubble.y + 'px';

                // Remove if off screen
                if (bubble.y > 520) {
                    bubble.element.remove();
                    calmCorner.bubbles = calmCorner.bubbles.filter(b => b !== bubble);
                }
            }
        });
    }, 30);
}

function createBubble() {
    const container = document.getElementById('bubbleCanvas');
    if (!container) return;

    const bubble = document.createElement('div');
    const size = Math.random() * 60 + 30; // 30-90px
    const x = Math.random() * (container.offsetWidth - size);
    const colors = ['rgba(147, 112, 219, 0.3)', 'rgba(102, 126, 234, 0.3)', 'rgba(168, 237, 234, 0.3)', 'rgba(254, 214, 227, 0.3)'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    bubble.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid rgba(255, 255, 255, 0.5);
        bottom: -100px;
        left: ${x}px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: inset -10px -10px 20px rgba(255, 255, 255, 0.5),
                    inset 10px 10px 20px rgba(0, 0, 0, 0.1);
    `;

    const bubbleData = {
        element: bubble,
        x: x,
        y: -100,
        speed: Math.random() * 1 + 0.5, // 0.5-1.5px per frame
        size: size
    };

    bubble.addEventListener('click', function() {
        // Pop animation
        this.style.transform = 'scale(1.3)';
        this.style.opacity = '0';
        
        // Play pop sound if available
        if (window.app && window.app.playSound) {
            window.app.playSound('correct');
        }

        setTimeout(() => {
            this.remove();
            calmCorner.bubbles = calmCorner.bubbles.filter(b => b !== bubbleData);
        }, 300);
    });

    container.appendChild(bubble);
    calmCorner.bubbles.push(bubbleData);
}

function addMoreBubbles() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createBubble(), i * 200);
    }
}

// ===== CALM DRAWING PAD =====
function createCalmDrawingActivity() {
    return `
        <div class="calm-drawing-container" style="text-align: center; padding: 40px;">
            <h3 style="color: #9370DB; margin-bottom: 20px;">Peaceful Drawing ✏️</h3>
            <p style="font-size: 1.2em; color: #764ba2; margin-bottom: 30px;">
                Draw slowly and mindfully - let your creativity flow ✨
            </p>

            <div style="margin: 20px 0;">
                <label style="font-size: 1.1em; color: #764ba2; margin-right: 15px;">Choose a calming color:</label>
                <div class="calm-color-palette" style="display: inline-block;">
                    <button class="calm-color-btn" data-color="#9370DB" style="background: #9370DB; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                    <button class="calm-color-btn" data-color="#667eea" style="background: #667eea; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                    <button class="calm-color-btn" data-color="#a8edea" style="background: #a8edea; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                    <button class="calm-color-btn" data-color="#fed6e3" style="background: #fed6e3; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                    <button class="calm-color-btn" data-color="#ffecd2" style="background: #ffecd2; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                    <button class="calm-color-btn" data-color="#ffffff" style="background: #ffffff; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #999; cursor: pointer; margin: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"></button>
                </div>
            </div>

            <canvas id="calmCanvas" width="700" height="500" style="
                border: 3px solid #9370DB;
                border-radius: 15px;
                background: white;
                cursor: crosshair;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                display: block;
                margin: 20px auto;
                max-width: 100%;
            "></canvas>

            <div style="margin-top: 20px;">
                <button id="clearCalmCanvas" class="action-btn" style="font-size: 1.1em; padding: 10px 30px;">
                    🗑️ Clear
                </button>
            </div>

            <div style="background: rgba(147, 112, 219, 0.1); padding: 20px; border-radius: 15px; margin-top: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
                <p style="font-size: 1.1em; margin: 0; color: #764ba2;">
                    💜 Draw slowly and peacefully<br>
                    ✨ Focus on the colors and movements<br>
                    🎨 There's no right or wrong - just create
                </p>
            </div>
        </div>
    `;
}

function setupCalmDrawing() {
    const canvas = document.getElementById('calmCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#9370DB';
    let lastX = 0;
    let lastY = 0;

    // Set default drawing properties
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Color buttons
    document.querySelectorAll('.calm-color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentColor = this.getAttribute('data-color');
            ctx.strokeStyle = currentColor;
            
            // Visual feedback
            document.querySelectorAll('.calm-color-btn').forEach(b => {
                b.style.border = '3px solid #fff';
            });
            this.style.border = '5px solid #FFD700';
        });
    });

    // Set initial color
    ctx.strokeStyle = currentColor;

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('touchend', () => isDrawing = false);

    // Clear button
    const clearBtn = document.getElementById('clearCalmCanvas');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (window.app && window.app.playSound) {
                window.app.playSound('click');
            }
        });
    }
}

// Attach event listeners after content is loaded
function attachCalmEventListeners() {
    // Breathing exercise
    const startBreathingBtn = document.getElementById('startBreathing');
    const stopBreathingBtn = document.getElementById('stopBreathing');
    
    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', startBreathingExercise);
    }
    if (stopBreathingBtn) {
        stopBreathingBtn.addEventListener('click', stopBreathingExercise);
    }

    // Music
    const musicButtons = document.querySelectorAll('.music-choice-btn');
    musicButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sound = this.getAttribute('data-sound');
            playCalmMusic(sound);
        });

        // Hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    const stopMusicBtn = document.getElementById('stopMusic');
    if (stopMusicBtn) {
        stopMusicBtn.addEventListener('click', stopCalmMusic);
    }

    const volumeControl = document.getElementById('volumeControl');
    const volumeValue = document.getElementById('volumeValue');
    if (volumeControl && volumeValue) {
        volumeControl.addEventListener('input', function() {
            volumeValue.textContent = this.value;
            if (calmCorner.currentSound) {
                calmCorner.currentSound.volume = this.value / 100;
            }
        });
    }

    // Bubbles
    const bubbleCanvas = document.getElementById('bubbleCanvas');
    if (bubbleCanvas) {
        startBubbles();
    }

    const addBubblesBtn = document.getElementById('addMoreBubbles');
    if (addBubblesBtn) {
        addBubblesBtn.addEventListener('click', addMoreBubbles);
    }

    // Calm drawing
    const calmCanvas = document.getElementById('calmCanvas');
    if (calmCanvas) {
        setupCalmDrawing();
    }
}

// Make functions globally accessible
window.calmCorner = calmCorner;
window.loadCalmActivity = loadCalmActivity;
