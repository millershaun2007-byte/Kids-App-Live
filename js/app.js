// Main App JavaScript - Navigation and Accessibility Controls

// ===== State Management =====
const appState = {
    currentSection: 'home',
    soundEnabled: true,
    sessionStartTime: Date.now(),
    totalActivityTime: 0,
    breakReminderInterval: null,
    settings: {
        fontSize: 16,
        fontFamily: 'default',
        colorTheme: 'default',
        reduceMotion: false,
        focusMode: false,
        visualRewards: 'full',
        breakReminders: true
    }
};

// Parent Gate logic removed

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
            // Parent Gate Modal Button Listeners removed
        // Talking Unicorn Button
        // Voice selection dropdown logic
        const voiceSelect = document.getElementById('unicornVoiceSelect');
        let unicornVoices = [];
        function populateVoiceList() {
            if (!('speechSynthesis' in window)) return;
            unicornVoices = window.speechSynthesis.getVoices();
            if (voiceSelect) {
                voiceSelect.innerHTML = '<option value="">Default (Best Match)</option>';
                unicornVoices.forEach((voice, idx) => {
                    const option = document.createElement('option');
                    option.value = idx;
                    option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' [default]' : ''}`;
                    voiceSelect.appendChild(option);
                });
            }
        }
        if ('speechSynthesis' in window) {
            populateVoiceList();
            window.speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        const speakUnicornBtn = document.getElementById('speakUnicornBtn');
        if (speakUnicornBtn) {
            speakUnicornBtn.addEventListener('click', () => {
                if ('speechSynthesis' in window) {
                    const unicornWelcome = new SpeechSynthesisUtterance("Hello, my name is Sparkels! Welcome to the Hip Hop Happening Groovy App");
                    let chosenVoice = null;
                    if (voiceSelect && voiceSelect.value !== "") {
                        chosenVoice = unicornVoices[parseInt(voiceSelect.value)];
                    } else {
                        // Default best match logic
                        const preferredVoiceNames = [
                            'Google UK English Female', 'Google US English', 'Microsoft Zira', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Mia', 'Samantha', 'Karen', 'Susan', 'Victoria', 'Veena', 'Google UK English Child', 'Google US English Child'
                        ];
                        for (const name of preferredVoiceNames) {
                            chosenVoice = unicornVoices.find(v => v.name.includes(name));
                            if (chosenVoice) break;
                        }
                        if (!chosenVoice) {
                            chosenVoice = unicornVoices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('child') || v.name.toLowerCase().includes('girl')));
                        }
                        if (!chosenVoice) {
                            chosenVoice = unicornVoices.find(v => v.lang.startsWith('en'));
                        }
                    }
                    if (chosenVoice) {
                        unicornWelcome.voice = chosenVoice;
                    }
                    unicornWelcome.rate = 1.0;
                    unicornWelcome.pitch = 1.1;
                    unicornWelcome.volume = 1.0;
                    window.speechSynthesis.speak(unicornWelcome);
                }
            });
        }
    // Modal and parent gate logic removed
    // Show home section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        homeSection.style.display = '';
        // Unicorn verbal welcome with more realistic voice
        if ('speechSynthesis' in window) {
            const unicornWelcome = new SpeechSynthesisUtterance("Hello, my name is Sparkels! Welcome to the Hip Hop Happening Groovy App");
            const voices = window.speechSynthesis.getVoices();
            let chosenVoice = null;
            const preferredVoiceNames = [
                'Google UK English Female', 'Google US English', 'Microsoft Zira', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Mia', 'Samantha', 'Karen', 'Susan', 'Victoria', 'Veena', 'Google UK English Child', 'Google US English Child'
            ];
            for (const name of preferredVoiceNames) {
                chosenVoice = voices.find(v => v.name.includes(name));
                if (chosenVoice) break;
            }
            if (!chosenVoice) {
                chosenVoice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('child') || v.name.toLowerCase().includes('girl')));
            }
            if (!chosenVoice) {
                chosenVoice = voices.find(v => v.lang.startsWith('en'));
            }
            if (chosenVoice) {
                unicornWelcome.voice = chosenVoice;
            }
            unicornWelcome.rate = 1.0;
            unicornWelcome.pitch = 1.1;
            unicornWelcome.volume = 1.0;
            setTimeout(() => { window.speechSynthesis.speak(unicornWelcome); }, 800);
        }
    }

    // Initial setup
    loadSettings();
    createFloatingParticles();
    initializeBackgroundMusic();
    setupEventListeners(); // Ensure event listeners are attached
    checkFirstVisit();
});

function checkFirstVisit() {
    // No modal logic needed

function handleNameSubmission() {
    const nameInput = document.getElementById('nameInput');
    const userName = nameInput.value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        // Modal logic fully removed
        // Show home section and update greeting
        const homeSection = document.getElementById('home');
        if (homeSection) {
            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            homeSection.classList.add('active');
            homeSection.style.display = '';
        }
        const welcomeHeader = document.getElementById('welcomeHeader');
        const personalizedGreeting = document.getElementById('personalizedGreeting');
        if (welcomeHeader) {
            welcomeHeader.textContent = `✨ Welcome, ${userName}! ✨`;
        }
        if (personalizedGreeting) {
            personalizedGreeting.textContent = `What would you like to create today?`;
            personalizedGreeting.style.display = 'block';
        }
    } else {
        // No modal shake animation; modal logic removed
    }
}

function setupEventListeners() {
    // Nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Activity cards on home page
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.getAttribute('data-goto');
            navigateToSection(section);
        });
    });

    document.getElementById('submitNameBtn').addEventListener('click', handleNameSubmission);
    document.getElementById('nameInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleNameSubmission();
        }
    });
}

// ===== Accessibility Controls =====
function initializeAccessibility() {
    const toggle = document.getElementById('accessibilityToggle');
    const panel = document.getElementById('panelContent');
    
    // Add click listener to show parent gate
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        showParentGate();
    });

    // Font Selection
    const fontSelect = document.getElementById('fontSelect');
    fontSelect.addEventListener('change', (e) => {
        document.body.className = document.body.className.replace(/dyslexic|comic/g, '');
        if (e.target.value !== 'default') {
            document.body.classList.add(e.target.value);
        }
        appState.settings.fontFamily = e.target.value;
        saveSettings();
    });

    // Font Size Slider
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    fontSizeSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        document.documentElement.style.setProperty('--font-size', `${size}px`);
        fontSizeValue.textContent = `${size}px`;
        appState.settings.fontSize = size;
        saveSettings();
    });

    // Color Theme
    const colorTheme = document.getElementById('colorTheme');
    colorTheme.addEventListener('change', (e) => {
        document.body.className = document.body.className
            .replace(/high-contrast|soft|dark/g, '')
            .trim();
        
        if (e.target.value !== 'default') {
            document.body.classList.add(e.target.value);
        }
        appState.settings.colorTheme = e.target.value;
        saveSettings();
    });

    // Reduce Motion
    const reduceMotion = document.getElementById('reduceMotion');
    reduceMotion.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
        appState.settings.reduceMotion = e.target.checked;
        saveSettings();
    });

    // Sound Toggle
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.addEventListener('change', (e) => {
        appState.soundEnabled = e.target.checked;
        saveSettings();
    });

    // Focus Mode
    const focusMode = document.getElementById('focusMode');
    focusMode.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('focus-mode');
        } else {
            document.body.classList.remove('focus-mode');
        }
        appState.settings.focusMode = e.target.checked;
        saveSettings();
    });

    // Visual Rewards
    const visualRewards = document.getElementById('visualRewards');
    visualRewards.addEventListener('change', (e) => {
        appState.settings.visualRewards = e.target.value;
        saveSettings();
    });

    // Break Reminders
    const breakReminders = document.getElementById('breakReminders');
    breakReminders.addEventListener('change', (e) => {
        appState.settings.breakReminders = e.target.checked;
        if (e.target.checked) {
            startBreakReminders();
        } else {
            stopBreakReminders();
        }
        saveSettings();
    });

    // Start break reminders by default
    startBreakReminders();
}

// ===== Navigation =====
function initializeNavigation() {
    // Nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Activity cards on home page
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.getAttribute('data-goto');
            navigateToSection(section);
        });
    });

        // Math activity completion (example)
        const mathActivity = document.getElementById('mathActivity');
        if (mathActivity) {
            mathActivity.addEventListener('activityComplete', () => {
                if (window.achievements && window.achievements.addStar) {
                    window.achievements.addStar();
                    updateStarsDisplay('math');
                }
            });
        }

        // Literacy activity completion (example)
        const literacyActivity = document.getElementById('literacyActivity');
        if (literacyActivity) {
            literacyActivity.addEventListener('activityComplete', () => {
                if (window.achievements && window.achievements.addStar) {
                    window.achievements.addStar();
                    updateStarsDisplay('literacy');
                }
            });
        }
}

function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionId;
        
        // Play navigation sound
        playSound('navigate');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== Sound Effects =====
function playSound(type) {
    if (!appState.soundEnabled) return;
    
    // Using Web Audio API for simple sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            break;
        case 'success':
            oscillator.frequency.value = 1000;
            gainNode.gain.value = 0.15;
            break;
        case 'navigate':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.08;
            break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ===== Settings Persistence =====
function saveSettings() {
    localStorage.setItem('kidsAppSettings', JSON.stringify(appState.settings));
}

function loadSettings() {
    const settings = getSettings();
    appState.settings = settings;
    
    // Apply saved settings
    if (settings.fontSize) {
        document.documentElement.style.setProperty('--font-size', `${settings.fontSize}px`);
        document.getElementById('fontSizeSlider').value = settings.fontSize;
        document.getElementById('fontSizeValue').textContent = `${settings.fontSize}px`;
    }
    
    if (settings.fontFamily && settings.fontFamily !== 'default') {
        document.body.classList.add(settings.fontFamily);
        document.getElementById('fontSelect').value = settings.fontFamily;
    }
    
    if (settings.colorTheme && settings.colorTheme !== 'default') {
        document.body.classList.add(settings.colorTheme);
        document.getElementById('colorTheme').value = settings.colorTheme;
    }
    
    if (settings.reduceMotion) {
        document.body.classList.add('reduce-motion');
        document.getElementById('reduceMotion').checked = true;
    }

    if (settings.focusMode) {
        document.body.classList.add('focus-mode');
        document.getElementById('focusMode').checked = true;
    }

    if (settings.visualRewards) {
        document.getElementById('visualRewards').value = settings.visualRewards;
    }

    if (settings.breakReminders !== false) {
        document.getElementById('breakReminders').checked = true;
        startBreakReminders();
    }
}

// ===== Break Reminder System =====
function startBreakReminders() {
    stopBreakReminders(); // Clear any existing
    
    appState.breakReminderInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - appState.sessionStartTime) / 60000); // minutes
        
        if (elapsed > 0 && elapsed % 15 === 0) { // Every 15 minutes
            showBreakReminder();
        }
    }, 60000); // Check every minute
}

function stopBreakReminders() {
    if (appState.breakReminderInterval) {
        clearInterval(appState.breakReminderInterval);
        appState.breakReminderInterval = null;
    }
}

function showBreakReminder() {
    const reminder = document.createElement('div');
    reminder.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 1.2em;
        animation: slideIn 0.5s ease;
        max-width: 350px;
    `;
    reminder.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3em; margin-bottom: 10px;">🧘</div>
            <strong>Time for a Brain Break!</strong><br>
            <p style="margin: 10px 0; font-size: 0.9em;">
                Stretch, get water, or rest your eyes for a few minutes.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: white;
                color: #667eea;
                border: none;
                padding: 10px 20px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                margin-top: 10px;
            ">Got it! ✓</button>
        </div>
    `;
    document.body.appendChild(reminder);
    
    if (appState.soundEnabled) {
        playSound('navigate');
    }
    
    setTimeout(() => {
        if (reminder.parentElement) {
            reminder.remove();
        }
    }, 10000); // Auto-remove after 10 seconds
}

// ===== Background Music System =====
let backgroundMusicAudio = null;

function initializeBackgroundMusic() {
    const musicSelect = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('musicVolume');
    const volumeValue = document.getElementById('volumeValue');
    
    musicSelect.addEventListener('change', (e) => {
        if (e.target.value === 'off') {
            stopBackgroundMusic();
        } else {
            playBackgroundMusic();
        }
    });
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        volumeValue.textContent = e.target.value + '%';
        if (backgroundMusicAudio) {
            backgroundMusicAudio.volume = volume * 0.3;
        }
    });

    // Auto-start music
    setTimeout(() => {
        if (musicSelect.value !== 'off') {
            playBackgroundMusic();
        }
    }, 1000);
}

function playBackgroundMusic(type) {
    stopBackgroundMusic();
    const musicSelect = document.getElementById('backgroundMusic');
    if (musicSelect.value === 'off') return;
    // Use new, better song (replace with your actual filename)
    backgroundMusicAudio = new Audio("audio/new-better-song.mp3");
    backgroundMusicAudio.loop = true;
    const volume = document.getElementById('musicVolume').value / 100;
    backgroundMusicAudio.volume = volume * 0.7; // Upbeat and louder
    backgroundMusicAudio.play().catch((e) => {
        // Autoplay might be blocked until user interacts
        console.log('Background music could not play automatically:', e);
    });
}

function stopBackgroundMusic() {
    if (backgroundMusicAudio) {
        backgroundMusicAudio.pause();
        backgroundMusicAudio.currentTime = 0;
        backgroundMusicAudio = null;
    }
}

// ===== Flying Dragons & Unicorns Animation =====
function createFloatingParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Create flying creatures with SVG
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const isUnicorn = i % 2 === 0;
        
        if (isUnicorn) {
            particle.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="50" cy="60" rx="25" ry="30" fill="#FFE4E1"/>
                    <polygon points="50,25 45,45 55,45" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                    <path d="M 30,45 Q 25,50 30,55" fill="#FF69B4" opacity="0.8"/>
                    <path d="M 70,45 Q 75,50 70,55" fill="#9370DB" opacity="0.8"/>
                    <circle cx="42" cy="58" r="3" fill="#000"/>
                    <circle cx="58" cy="58" r="3" fill="#000"/>
                </svg>
            `;
        } else {
            particle.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="55" cy="65" rx="20" ry="18" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
                    <ellipse cx="40" cy="50" rx="15" ry="13" fill="#32CD32" stroke="#228B22" stroke-width="2"/>
                    <polygon points="35,40 33,45 37,45" fill="#FFD700"/>
                    <polygon points="45,40 43,45 47,45" fill="#FFD700"/>
                    <circle cx="38" cy="48" r="3" fill="#FFD700"/>
                    <path d="M 60,55 Q 75,45 70,65 Q 65,60 60,60" fill="#90EE90" stroke="#228B22" stroke-width="1.5"/>
                </svg>
            `;
        }
        
        particle.style.top = Math.random() * 70 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 12) + 's';
        container.appendChild(particle);
    }
    
    // Add flying mermaid with SVG (larger)
    const mermaid = document.createElement('div');
    mermaid.className = 'particle large-character';
    mermaid.innerHTML = `
        <svg width="90" height="110" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
            <!-- Hair (behind) -->
            <path d="M 35,25 Q 25,35 28,55 Q 30,70 32,80" fill="#8B4513" stroke="#6B3410" stroke-width="1.5" opacity="0.8"/>
            <path d="M 38,26 Q 28,38 30,58 Q 32,72 33,82" fill="#A0522D" stroke="#8B4513" stroke-width="1.5" opacity="0.9"/>
            <path d="M 65,25 Q 75,35 72,55 Q 70,70 68,80" fill="#8B4513" stroke="#6B3410" stroke-width="1.5" opacity="0.8"/>
            <path d="M 62,26 Q 72,38 70,58 Q 68,72 67,82" fill="#A0522D" stroke="#8B4513" stroke-width="1.5" opacity="0.9"/>
            
            <!-- Neck and shoulders -->
            <ellipse cx="50" cy="45" rx="8" ry="6" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            
            <!-- Head -->
            <ellipse cx="50" cy="32" rx="14" ry="16" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1.5"/>
            
            <!-- Ear -->
            <ellipse cx="38" cy="32" rx="3" ry="4" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            <ellipse cx="62" cy="32" rx="3" ry="4" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            
            <!-- Hair (front/top) -->
            <ellipse cx="50" cy="20" rx="15" ry="11" fill="#A0522D" stroke="#8B4513" stroke-width="1.5"/>
            <path d="M 42,28 Q 38,33 40,38" fill="#A0522D" stroke="#8B4513" stroke-width="1"/>
            <path d="M 46,27 Q 42,32 44,37" fill="#A0522D" stroke="#8B4513" stroke-width="1"/>
            <path d="M 54,27 Q 58,32 56,37" fill="#A0522D" stroke="#8B4513" stroke-width="1"/>
            <path d="M 58,28 Q 62,33 60,38" fill="#A0522D" stroke="#8B4513" stroke-width="1"/>
            
            <!-- Hair highlights -->
            <path d="M 44,22 Q 46,25 45,28" stroke="#CD853F" stroke-width="1.5" opacity="0.6" fill="none"/>
            <path d="M 56,22 Q 54,25 55,28" stroke="#CD853F" stroke-width="1.5" opacity="0.6" fill="none"/>
            
            <!-- Eyebrows -->
            <path d="M 42,29 Q 45,28 47,29" stroke="#8B4513" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <path d="M 53,29 Q 55,28 58,29" stroke="#8B4513" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            
            <!-- Eyes -->
            <ellipse cx="44" cy="33" rx="3" ry="3.5" fill="#FFF"/>
            <ellipse cx="56" cy="33" rx="3" ry="3.5" fill="#FFF"/>
            <circle cx="44" cy="33.5" r="2" fill="#4682B4"/>
            <circle cx="56" cy="33.5" r="2" fill="#4682B4"/>
            <circle cx="44.5" cy="32.8" r="1.2" fill="#000"/>
            <circle cx="56.5" cy="32.8" r="1.2" fill="#000"/>
            <circle cx="45" cy="32" r="0.7" fill="#FFF" opacity="0.8"/>
            <circle cx="57" cy="32" r="0.7" fill="#FFF" opacity="0.8"/>
            
            <!-- Eyelashes -->
            <path d="M 41,31 L 40,29" stroke="#000" stroke-width="0.5"/>
            <path d="M 42,30 L 41,28" stroke="#000" stroke-width="0.5"/>
            <path d="M 59,30 L 60,28" stroke="#000" stroke-width="0.5"/>
            <path d="M 58,31 L 59,29" stroke="#000" stroke-width="0.5"/>
            
            <!-- Nose -->
            <path d="M 50,35 L 49,38" stroke="#D2B48C" stroke-width="1" stroke-linecap="round"/>
            <ellipse cx="49" cy="38.5" rx="1" ry="0.7" fill="#E6C9A8"/>
            
            <!-- Lips -->
            <path d="M 46,41 Q 50,43 54,41" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1"/>
            <path d="M 46,41 Q 50,42 54,41" stroke="#FF1493" stroke-width="0.5"/>
            
            <!-- Body/torso -->
            <ellipse cx="50" cy="60" rx="13" ry="16" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1.5"/>
            
            <!-- Detailed seashell bikini top -->
            <ellipse cx="44" cy="56" rx="7" ry="6" fill="#FFF5EE" stroke="#FFB6C1" stroke-width="1.2"/>
            <ellipse cx="56" cy="56" rx="7" ry="6" fill="#FFF5EE" stroke="#FFB6C1" stroke-width="1.2"/>
            <path d="M 44,56 Q 44,53 44,50" stroke="#FFB6C1" stroke-width="1"/>
            <path d="M 56,56 Q 56,53 56,50" stroke="#FFB6C1" stroke-width="1"/>
            <path d="M 42,56 L 46,56" stroke="#FFD1DC" stroke-width="0.8"/>
            <path d="M 54,56 L 58,56" stroke="#FFD1DC" stroke-width="0.8"/>
            <circle cx="44" cy="53" r="1.5" fill="#FFB6C1" opacity="0.7"/>
            <circle cx="56" cy="53" r="1.5" fill="#FFB6C1" opacity="0.7"/>
            
            <!-- Necklace -->
            <ellipse cx="50" cy="48" rx="10" ry="3" fill="none" stroke="#FFD700" stroke-width="1"/>
            <circle cx="50" cy="50" r="2" fill="#FF1493"/>
            
            <!-- Arms with hands -->
            <path d="M 39,56 Q 28,62 26,72" stroke="#F5DEB3" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="26" cy="74" rx="3" ry="4" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            <path d="M 61,56 Q 72,62 74,72" stroke="#F5DEB3" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="74" cy="74" rx="3" ry="4" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            
            <!-- Waist/hip transition -->
            <ellipse cx="50" cy="73" rx="12" ry="5" fill="#F5DEB3" stroke="#D2B48C" stroke-width="1"/>
            
            <!-- Tail with gradient and realistic scales -->
            <defs>
                <linearGradient id="tailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#20B2AA;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#48D1CC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#5F9EA0;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Main tail body -->
            <path d="M 50,76 Q 48,90 49,105 Q 48,120 50,128" fill="url(#tailGrad)" stroke="#2F8B8B" stroke-width="2"/>
            <path d="M 50,76 Q 52,90 51,105 Q 52,120 50,128" fill="url(#tailGrad)" stroke="#2F8B8B" stroke-width="2"/>
            
            <!-- Scales pattern on tail -->
            <ellipse cx="47" cy="82" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="53" cy="82" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="47" cy="88" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="53" cy="88" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="47" cy="94" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="53" cy="94" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="47" cy="100" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="53" cy="100" rx="3" ry="2.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="48" cy="106" rx="2.5" ry="2" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="52" cy="106" rx="2.5" ry="2" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="48" cy="112" rx="2.5" ry="2" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="52" cy="112" rx="2.5" ry="2" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="49" cy="118" rx="2" ry="1.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            <ellipse cx="51" cy="118" rx="2" ry="1.5" fill="#98FFD9" opacity="0.6" stroke="#7FFFD4" stroke-width="0.5"/>
            
            <!-- Tail fin -->
            <path d="M 50,128 L 40,138 L 48,132 L 50,133 L 52,132 L 60,138 Z" fill="url(#tailGrad)" stroke="#2F8B8B" stroke-width="1.5"/>
            <!-- Fin details -->
            <path d="M 43,135 L 48,132" stroke="#7FFFD4" stroke-width="0.8" opacity="0.7"/>
            <path d="M 57,135 L 52,132" stroke="#7FFFD4" stroke-width="0.8" opacity="0.7"/>
            <path d="M 45,137 L 50,133" stroke="#7FFFD4" stroke-width="0.8" opacity="0.7"/>
            <path d="M 55,137 L 50,133" stroke="#7FFFD4" stroke-width="0.8" opacity="0.7"/>
        </svg>
    `;
    mermaid.style.top = Math.random() * 50 + 25 + '%';
    mermaid.style.animationDelay = Math.random() * 15 + 's';
    mermaid.style.animationDuration = (Math.random() * 5 + 15) + 's';
    container.appendChild(mermaid);
    
    // Add flying fairy with SVG (larger)
    const fairy = document.createElement('div');
    fairy.className = 'particle large-character';
    fairy.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Wings -->
            <ellipse cx="35" cy="45" rx="18" ry="25" fill="#E6E6FA" stroke="#D8BFD8" stroke-width="1.5" opacity="0.8"/>
            <ellipse cx="65" cy="45" rx="18" ry="25" fill="#E6E6FA" stroke="#D8BFD8" stroke-width="1.5" opacity="0.8"/>
            <!-- Wing details -->
            <path d="M 35,35 Q 30,45 35,55" stroke="#DDA0DD" stroke-width="1" fill="none"/>
            <path d="M 65,35 Q 70,45 65,55" stroke="#DDA0DD" stroke-width="1" fill="none"/>
            <circle cx="32" cy="40" r="2" fill="#FFD700" opacity="0.6"/>
            <circle cx="68" cy="40" r="2" fill="#FFD700" opacity="0.6"/>
            <!-- Body -->
            <ellipse cx="50" cy="55" rx="10" ry="15" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1.5"/>
            <!-- Head -->
            <circle cx="50" cy="30" r="12" fill="#FFE4C4" stroke="#D2B48C" stroke-width="1.5"/>
            <!-- Hair -->
            <ellipse cx="50" cy="22" rx="13" ry="8" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
            <path d="M 42,26 Q 40,32 42,38" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
            <path d="M 58,26 Q 60,32 58,38" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
            <!-- Crown/tiara -->
            <path d="M 42,20 L 44,15 L 46,18 L 50,12 L 54,18 L 56,15 L 58,20" stroke="#FFD700" stroke-width="2" fill="none"/>
            <circle cx="50" cy="12" r="2" fill="#FF1493"/>
            <!-- Eyes -->
            <circle cx="45" cy="29" r="2" fill="#000"/>
            <circle cx="55" cy="29" r="2" fill="#000"/>
            <circle cx="46" cy="28" r="0.8" fill="#FFF"/>
            <circle cx="56" cy="28" r="0.8" fill="#FFF"/>
            <!-- Smile -->
            <path d="M 44,33 Q 50,35 56,33" stroke="#FF69B4" stroke-width="1" fill="none" stroke-linecap="round"/>
            <!-- Arms -->
            <path d="M 42,50 Q 35,55 37,62" stroke="#FFE4C4" stroke-width="4" stroke-linecap="round"/>
            <path d="M 58,50 Q 65,55 63,62" stroke="#FFE4C4" stroke-width="4" stroke-linecap="round"/>
            <!-- Legs -->
            <rect x="45" y="68" width="4" height="12" fill="#FFE4C4" rx="2"/>
            <rect x="51" y="68" width="4" height="12" fill="#FFE4C4" rx="2"/>
            <!-- Magic wand -->
            <line x1="63" y1="62" x2="73" y2="52" stroke="#8B4513" stroke-width="2"/>
            <polygon points="73,52 70,47 75,47 73,42 78,47 78,52" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
            <!-- Sparkles around wand -->
            <circle cx="75" cy="45" r="1.5" fill="#FFD700"/>
            <circle cx="80" cy="50" r="1" fill="#FFD700"/>
            <circle cx="70" cy="49" r="1" fill="#FFD700"/>
        </svg>
    `;
    fairy.style.top = Math.random() * 50 + 15 + '%';
    fairy.style.animationDelay = Math.random() * 15 + 5 + 's';
    fairy.style.animationDuration = (Math.random() * 5 + 14) + 's';
    container.appendChild(fairy);
    
    // Add jumping crocodile with SVG
    const crocodile = document.createElement('div');
    crocodile.className = 'crocodile';
    crocodile.innerHTML = `
        <svg width="140" height="70" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
            <!-- Tail -->
            <path d="M 10,40 Q 15,30 20,35 Q 25,40 30,38" stroke="#3D6B2F" stroke-width="8" fill="none" stroke-linecap="round"/>
            <!-- Main body -->
            <ellipse cx="70" cy="45" rx="40" ry="20" fill="#4A7C3B" stroke="#3D6B2F" stroke-width="2"/>
            <!-- Back texture -->
            <path d="M 45,35 L 48,30 L 51,35" fill="#3D6B2F"/>
            <path d="M 55,33 L 58,28 L 61,33" fill="#3D6B2F"/>
            <path d="M 65,32 L 68,27 L 71,32" fill="#3D6B2F"/>
            <path d="M 75,33 L 78,28 L 81,33" fill="#3D6B2F"/>
            <path d="M 85,35 L 88,30 L 91,35" fill="#3D6B2F"/>
            <!-- Head and snout -->
            <ellipse cx="110" cy="42" rx="28" ry="18" fill="#4A7C3B" stroke="#3D6B2F" stroke-width="2"/>
            <ellipse cx="135" cy="40" rx="18" ry="12" fill="#5A8C4B" stroke="#3D6B2F" stroke-width="2"/>
            <!-- Belly -->
            <ellipse cx="70" cy="52" rx="35" ry="12" fill="#7A9B6A" opacity="0.8"/>
            <!-- Legs -->
            <ellipse cx="55" cy="62" rx="6" ry="10" fill="#4A7C3B" stroke="#3D6B2F" stroke-width="1.5"/>
            <ellipse cx="70" cy="64" rx="6" ry="10" fill="#4A7C3B" stroke="#3D6B2F" stroke-width="1.5"/>
            <ellipse cx="85" cy="62" rx="6" ry="10" fill="#4A7C3B" stroke="#3D6B2F" stroke-width="1.5"/>
            <!-- Toes -->
            <path d="M 52,70 L 50,73 M 55,71 L 55,74 M 58,70 L 60,73" stroke="#3D6B2F" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 67,72 L 65,75 M 70,73 L 70,76 M 73,72 L 75,75" stroke="#3D6B2F" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 82,70 L 80,73 M 85,71 L 85,74 M 88,70 L 90,73" stroke="#3D6B2F" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Eye -->
            <circle cx="115" cy="38" r="4" fill="#2F4F2F" stroke="#1a3d0a" stroke-width="1"/>
            <circle cx="115" cy="37" r="2" fill="#FFD700"/>
            <circle cx="116" cy="36" r="1" fill="#000"/>
            <circle cx="116.5" cy="36" r="0.5" fill="#FFF"/>
            <!-- Nostril -->
            <ellipse cx="142" cy="38" rx="2" ry="1.5" fill="#2F4F2F"/>
            <!-- Mouth line -->
            <path d="M 120,46 Q 130,48 140,47" stroke="#2F4F2F" stroke-width="2" fill="none"/>
            <!-- Teeth -->
            <path d="M 122,47 L 122,50 M 127,48 L 127,51 M 132,48 L 132,51 M 137,47 L 137,50" stroke="#FFF" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Scales detail -->
            <circle cx="60" cy="42" r="2" fill="#5A8C4B" opacity="0.6"/>
            <circle cx="70" cy="40" r="2" fill="#5A8C4B" opacity="0.6"/>
            <circle cx="80" cy="41" r="2" fill="#5A8C4B" opacity="0.6"/>
            <circle cx="90" cy="43" r="2" fill="#5A8C4B" opacity="0.6"/>
        </svg>
    `;
    container.appendChild(crocodile);
    
    // Add lightning strike with SVG
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    lightning.innerHTML = `
        <svg width="80" height="100" viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <polygon points="25,0 20,30 28,30 15,80 35,35 27,35 32,0" fill="#FFFF00" stroke="#FFD700" stroke-width="2" filter="url(#glow)"/>
        </svg>
    `;
    container.appendChild(lightning);
    
    // Add anaconda in tree with SVG
    const anaconda = document.createElement('div');
    anaconda.className = 'anaconda';
    anaconda.innerHTML = `
        <svg width="100" height="120" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="20" width="10" height="80" fill="#8B4513" stroke="#654321" stroke-width="1"/>
            <ellipse cx="40" cy="15" rx="20" ry="12" fill="#228B22" opacity="0.7"/>
            <path d="M 30,50 Q 20,55 25,60 Q 22,65 28,68 Q 25,73 30,76" stroke="#4B8B3B" stroke-width="8" fill="none" stroke-linecap="round"/>
            <circle cx="27" cy="52" r="2" fill="#FFD700"/>
            <circle cx="27" cy="52" r="1" fill="#000"/>
            <path d="M 20,55 L 18,54 L 20,53" fill="#FF0000" stroke="#8B0000" stroke-width="0.5"/>
        </svg>
    `;
    container.appendChild(anaconda);
}

// ===== Utility Functions =====
function showMessage(message, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'success' ? '#4CAF50' : '#FF5722'};
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.5em;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.5s';
        setTimeout(() => messageEl.remove(), 500);
    }, 2000);
}


// Update stars display in progress sections
function updateStarsDisplay(type) {
    const data = window.achievements ? window.achievements.getData() : null;
    if (!data) return;
    if (type === 'math') {
        const starsCount = document.getElementById('starsCount');
        if (starsCount) starsCount.textContent = data.totalStars;
    } else if (type === 'literacy') {
        const literacyStars = document.getElementById('literacyStars');
        if (literacyStars) literacyStars.textContent = data.totalStars;
    }
}

// Export for use in other modules
window.app = {
    state: appState,
    navigate: navigateToSection,
    playSound: playSound,
    showMessage: showMessage,
    updateStarsDisplay: updateStarsDisplay
};

// ===== Legal Compliance Functions =====

// COPPA Consent logic fully removed

// All parent gate and modal functions fully removed

// Legal Pages Navigation
function showAboutMe() {

// Avatar selection logic (unicorn, dinosaur, great big fella)
document.addEventListener('DOMContentLoaded', function() {
    const avatarGreeting = document.getElementById('avatarGreeting');
    const unicornAvatar = document.getElementById('unicornAvatar');
    const dinoAvatar = document.getElementById('dinoAvatar');
    const bigFellaAvatar = document.getElementById('bigFellaAvatar');
    if (unicornAvatar && avatarGreeting) {
        unicornAvatar.addEventListener('click', function() {
            avatarGreeting.textContent = "Hello, my name is Sparkels!";
        });
    }
    if (dinoAvatar && avatarGreeting) {
        dinoAvatar.addEventListener('click', function() {
            avatarGreeting.textContent = "RAWR! You're a Dinosaur!";
        });
    }
    if (bigFellaAvatar && avatarGreeting) {
        bigFellaAvatar.addEventListener('click', function() {
            avatarGreeting.textContent = "Hi! I'm the Great Big Fella!";
        });
    }
});

function goHome() {
    navigateToSection('home');
}

// Make legal functions globally accessible
window.showParentGate = showParentGate;
window.checkParentGate = checkParentGate;
window.closeParentGate = closeParentGate;
window.showPrivacyPolicy = showPrivacyPolicy;
window.showTermsOfService = showTermsOfService;
window.goHome = goHome;
// Voice Greeting Logic
const playGreetingBtn = document.getElementById('playGreetingBtn');
const customGreetingInput = document.getElementById('customGreetingInput');
const recordGreetingBtn = document.getElementById('recordGreetingBtn');
const recordingStatus = document.getElementById('recordingStatus');
let mediaRecorder;
let recordedChunks = [];

// Play typed greeting using SpeechSynthesis
if (playGreetingBtn) {
    playGreetingBtn.onclick = () => {
        const greeting = customGreetingInput.value.trim();
        if (greeting) {
            const utter = new window.SpeechSynthesisUtterance(greeting);
            utter.rate = 1.1;
            utter.pitch = 1.2;
            window.speechSynthesis.speak(utter);
        }
    };
}

// Record voice greeting
if (recordGreetingBtn) {
    recordGreetingBtn.onclick = async () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            recordingStatus.textContent = 'Recording stopped.';
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunks.push(e.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                recordingStatus.textContent = 'Playing your greeting!';
            };
            mediaRecorder.start();
            recordingStatus.textContent = 'Recording...';
        } catch (err) {
            recordingStatus.textContent = 'Microphone access denied.';
        }
    };
}

// Welcome Song Logic (auto-play on load, optional)
window.addEventListener('DOMContentLoaded', () => {
    const welcomeSong = document.getElementById('welcomeSong');
    if (welcomeSong) {
        // Uncomment below to auto-play on load (may require user interaction)
        // welcomeSong.play();
    }
});
// Visual Break Timer Logic
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const breakReminder = document.getElementById('breakReminder');
let timerInterval;
let timerSeconds = 1800; // 30 minutes

function updateTimerDisplay() {
    const min = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const sec = (timerSeconds % 60).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `${min}:${sec}`;
}

function startBreakTimer() {
    timerSeconds = 1800;
    updateTimerDisplay();
    if (breakReminder) breakReminder.style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            if (breakReminder) breakReminder.style.display = 'inline';
            if (timerDisplay) timerDisplay.textContent = '00:00';
        }
    }, 1000);
}

if (startTimerBtn) {
    startTimerBtn.onclick = startBreakTimer;
}
// Calming Animated Background: Fairies, Wizards, Princesses
const animatedBackground = document.getElementById('animatedBackground');
const characterTypes = [
    { name: 'fairy', color: '#FFD1DC', emoji: '🧚' },
    { name: 'wizard', color: '#9370DB', emoji: '🧙' },
    { name: 'princess', color: '#FFB6C1', emoji: '👸' }
];

function createFloatingCharacter() {
    if (!animatedBackground) return;
    const type = characterTypes[Math.floor(Math.random() * characterTypes.length)];
    const el = document.createElement('div');
    el.textContent = type.emoji;
    el.style.position = 'absolute';
    el.style.left = Math.random() * 90 + 'vw';
    el.style.top = '100vh';
    el.style.fontSize = (Math.random() * 2 + 2) + 'em';
    el.style.opacity = 0.85;
    el.style.transition = 'top 18s linear, opacity 2s';
    el.style.pointerEvents = 'none';
    animatedBackground.appendChild(el);
    setTimeout(() => {
        el.style.top = Math.random() * 60 + 'vh';
        el.style.opacity = 0.6;
    }, 100);
    setTimeout(() => {
        el.style.top = '-10vh';
        el.style.opacity = 0.2;
    }, 9000);
    setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 18000);
}

setInterval(createFloatingCharacter, 3500);
for (let i = 0; i < 4; i++) createFloatingCharacter();
// Customizable Color Theme Picker
const colorThemePicker = document.getElementById('colorThemePicker');
if (colorThemePicker) {
    colorThemePicker.oninput = (e) => {
        document.body.style.background = e.target.value;
        if (animatedBackground) animatedBackground.style.background = e.target.value;
    };
}
// Rainbow Star Jar Reward System
const starJar = document.getElementById('starJar');
const addStarBtn = document.getElementById('addStarBtn');
const starJarCount = document.getElementById('starJarCount');
const chimeSound = document.getElementById('chimeSound');
const applauseSound = document.getElementById('applauseSound');
let starCount = 0;
const rainbowColors = ['#FFD700', '#FF69B4', '#32CD32', '#9370DB', '#FFB6C1', '#00BFFF', '#FF6347'];

function playChime() {
    if (chimeSound) {
        chimeSound.currentTime = 0;
        chimeSound.play();
    }
}
function playApplause() {
    if (applauseSound) {
        applauseSound.currentTime = 0;
        applauseSound.play();
    }
}

function addStarToJar() {
    if (!starJar) return;
    starCount++;
    if (starJarCount) starJarCount.textContent = `Stars: ${starCount}`;
    const star = document.createElement('span');
    star.textContent = '★';
    star.style.fontSize = (Math.random() * 1.2 + 2) + 'em';
    star.style.color = rainbowColors[starCount % rainbowColors.length];
    star.style.margin = '0 2px';
    star.style.transition = 'transform 0.5s';
    starJar.appendChild(star);
    setTimeout(() => { star.style.transform = 'scale(1.2)'; }, 100);
    playChime();
    if (starCount % 5 === 0) playApplause();
}

if (addStarBtn) {
    addStarBtn.onclick = addStarToJar;
}
// Sensory Zone: Mindfulness Breathing Animation
const breathingAnimation = document.getElementById('breathingAnimation');
const startBreathingBtn = document.getElementById('startBreathingBtn');
let breathingInterval;

function animateBreathing() {
    if (!breathingAnimation) return;
    breathingAnimation.innerHTML = '';
    const circle = document.createElement('div');
    circle.style.width = '60px';
    circle.style.height = '60px';
    circle.style.borderRadius = '50%';
    circle.style.background = 'radial-gradient(circle at 40% 40%, #9370DB 70%, #32CD32 100%)';
    circle.style.margin = '30px auto';
    circle.style.transition = 'width 4s, height 4s, opacity 1s';
    breathingAnimation.appendChild(circle);
    let phase = 0;
    let cycles = 0;
    function nextPhase() {
        if (phase === 0) { // Breathe in
            circle.style.width = '120px';
            circle.style.height = '120px';
            circle.style.opacity = '1';
        } else if (phase === 1) { // Hold
            // No change, just hold
        } else if (phase === 2) { // Breathe out
            circle.style.width = '60px';
            circle.style.height = '60px';
            circle.style.opacity = '0.7';
        }
        phase = (phase + 1) % 3;
        if (phase === 0) cycles++;
        if (cycles < 5) {
            breathingInterval = setTimeout(nextPhase, 4000);
        } else {
            circle.style.opacity = '0.3';
            setTimeout(() => { breathingAnimation.innerHTML = ''; }, 1200);
        }
    }
    nextPhase();
}

if (startBreathingBtn) {
    startBreathingBtn.onclick = () => {
        if (breathingInterval) clearTimeout(breathingInterval);
        animateBreathing();
    };
}
// Feedback Button and Popup Form Logic
const feedbackBtn = document.getElementById('feedbackBtn');
const feedbackPopup = document.getElementById('feedbackPopup');
const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const feedbackText = document.getElementById('feedbackText');
const feedbackStatus = document.getElementById('feedbackStatus');

if (feedbackBtn && feedbackPopup) {
    feedbackBtn.onclick = () => {
        feedbackPopup.style.display = 'block';
        feedbackStatus.textContent = '';
    };
}
if (closeFeedbackBtn && feedbackPopup) {
    closeFeedbackBtn.onclick = () => {
        feedbackPopup.style.display = 'none';
    };
}
if (submitFeedbackBtn && feedbackText && feedbackStatus) {
    submitFeedbackBtn.onclick = () => {
        if (feedbackText.value.trim().length < 3) {
            feedbackStatus.textContent = 'Please enter your feedback.';
            return;
        }
        feedbackStatus.textContent = 'Thank you for your feedback!';
        feedbackText.value = '';
        setTimeout(() => { feedbackPopup.style.display = 'none'; }, 1800);
    };
}
