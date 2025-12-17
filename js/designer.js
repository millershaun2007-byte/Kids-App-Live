// Creature Designer Module

const designer = {
    currentCreature: {
        type: 'unicorn',
        bodyColor: '#FF69B4',
        maneColor: '#9370DB',
        hornStyle: 'spiral',
        pattern: 'solid'
    },
    savedCreatures: []
};

// ===== Initialize Designer =====
document.addEventListener('DOMContentLoaded', () => {
    initializeDesigner();
    loadSavedCreatures();
});

function initializeDesigner() {
    // Creature Type Selection
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            designer.currentCreature.type = btn.getAttribute('data-creature');
            updateCreatureDisplay();
            window.app.playSound('click');
        });
    });

    // Color Selection
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const part = btn.getAttribute('data-part');
            const color = btn.getAttribute('data-color');
            
            if (part === 'body') {
                designer.currentCreature.bodyColor = color;
                document.querySelectorAll('[data-part="body"]').forEach(b => b.classList.remove('selected'));
            } else if (part === 'mane') {
                designer.currentCreature.maneColor = color;
                document.querySelectorAll('[data-part="mane"]').forEach(b => b.classList.remove('selected'));
            }
            
            btn.classList.add('selected');
            updateCreatureDisplay();
            window.app.playSound('click');
        });
    });

    // Style Selection
    const styleButtons = document.querySelectorAll('.style-btn');
    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            styleButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            designer.currentCreature.hornStyle = btn.getAttribute('data-style');
            updateCreatureDisplay();
            window.app.playSound('click');
        });
    });

    // Pattern Selection
    const patternButtons = document.querySelectorAll('.pattern-btn');
    patternButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            patternButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            designer.currentCreature.pattern = btn.getAttribute('data-pattern');
            updateCreatureDisplay();
            window.app.playSound('click');
        });
    });

    // Save Creature
    document.getElementById('saveCreature').addEventListener('click', saveCreature);

    // Random Design
    document.getElementById('randomCreature').addEventListener('click', randomizeCreature);

    // Initial display
    updateCreatureDisplay();
}

function updateCreatureDisplay() {
    const display = document.getElementById('creatureDisplay');
    const creature = designer.currentCreature;
    
    let description = '';
    
    // Build visual representation with SVG
    if (creature.type === 'unicorn') {
        description = `
            <div style="text-align: center;">
                <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                    <!-- Unicorn body -->
                    <ellipse cx="50" cy="65" rx="28" ry="25" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <!-- Legs -->
                    <rect x="40" y="80" width="5" height="15" fill="${creature.bodyColor}" stroke="#000" stroke-width="0.5"/>
                    <rect x="55" y="80" width="5" height="15" fill="${creature.bodyColor}" stroke="#000" stroke-width="0.5"/>
                    <!-- Head -->
                    <ellipse cx="50" cy="45" rx="18" ry="20" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <!-- Mane -->
                    <path d="M 35,35 Q 30,40 35,45" fill="${creature.maneColor}" opacity="0.8"/>
                    <path d="M 38,30 Q 32,35 36,40" fill="${creature.maneColor}" opacity="0.9"/>
                    <path d="M 65,35 Q 70,40 65,45" fill="${creature.maneColor}" opacity="0.8"/>
                    <path d="M 62,30 Q 68,35 64,40" fill="${creature.maneColor}" opacity="0.9"/>
                    <!-- Horn (${creature.hornStyle}) -->
                    <polygon points="50,18 47,35 53,35" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                    ${creature.hornStyle === 'Spiral' ? '<path d="M 48,25 Q 50,30 52,25" stroke="#FFF" stroke-width="1" fill="none"/>' : ''}
                    <!-- Eyes -->
                    <circle cx="44" cy="43" r="3" fill="#000"/>
                    <circle cx="56" cy="43" r="3" fill="#000"/>
                    <circle cx="45" cy="42" r="1" fill="#FFF"/>
                    <circle cx="57" cy="42" r="1" fill="#FFF"/>
                    <!-- Nose -->
                    <ellipse cx="50" cy="52" rx="4" ry="3" fill="#FFB6C1"/>
                    <!-- Pattern: ${creature.pattern} -->
                    ${getPatternSVG(creature.pattern, creature.bodyColor)}
                    <!-- Tail -->
                    <path d="M 75,70 Q 85,65 80,75" stroke="${creature.maneColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 1.2em;">
                <strong>Your Beautiful Unicorn!</strong><br>
                Body: <span style="color: ${creature.bodyColor};">●</span>
                Mane: <span style="color: ${creature.maneColor};">●</span><br>
                Horn: ${creature.hornStyle} | Pattern: ${creature.pattern}
            </div>
        `;
    } else if (creature.type === 'princess') {
        description = `
            <div style="text-align: center;">
                <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                    <!-- Princess dress -->
                    <path d="M 50,50 L 30,95 L 70,95 Z" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <ellipse cx="50" cy="50" rx="15" ry="10" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <!-- Pattern on dress: ${creature.pattern} -->
                    ${getPatternSVG(creature.pattern, creature.bodyColor, 50, 70)}
                    <!-- Arms -->
                    <rect x="35" y="50" width="4" height="15" fill="#FFE4C4" stroke="#000" stroke-width="0.5"/>
                    <rect x="61" y="50" width="4" height="15" fill="#FFE4C4" stroke="#000" stroke-width="0.5"/>
                    <!-- Head -->
                    <circle cx="50" cy="35" r="12" fill="#FFE4C4" stroke="#000" stroke-width="1"/>
                    <!-- Hair -->
                    <path d="M 40,28 Q 35,30 38,35" fill="${creature.maneColor}"/>
                    <path d="M 60,28 Q 65,30 62,35" fill="${creature.maneColor}"/>
                    <ellipse cx="50" cy="27" rx="13" ry="8" fill="${creature.maneColor}"/>
                    <!-- Crown -->
                    <polygon points="40,22 42,28 44,22 46,28 48,22 50,28 52,22 54,28 56,22 58,28 60,22 50,20" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                    <circle cx="50" cy="20" r="2" fill="#FF1493"/>
                    <!-- Eyes -->
                    <circle cx="46" cy="34" r="2" fill="#000"/>
                    <circle cx="54" cy="34" r="2" fill="#000"/>
                    <circle cx="47" cy="33" r="0.8" fill="#FFF"/>
                    <circle cx="55" cy="33" r="0.8" fill="#FFF"/>
                    <!-- Smile -->
                    <path d="M 45,39 Q 50,41 55,39" stroke="#000" stroke-width="1" fill="none"/>
                    <!-- Jewelry -->
                    <circle cx="50" cy="45" r="2" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
                </svg>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 1.2em;">
                <strong>Your Royal Princess!</strong><br>
                Dress: <span style="color: ${creature.bodyColor};">●</span>
                Crown: <span style="color: ${creature.maneColor};">●</span><br>
                Style: ${creature.hornStyle} | Pattern: ${creature.pattern}
            </div>
        `;
    } else {
        description = `
            <div style="text-align: center;">
                <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                    <!-- Dinosaur body -->
                    <ellipse cx="55" cy="70" rx="25" ry="20" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <!-- Legs -->
                    <rect x="45" y="85" width="6" height="12" fill="${creature.bodyColor}" stroke="#000" stroke-width="0.5"/>
                    <rect x="60" y="85" width="6" height="12" fill="${creature.bodyColor}" stroke="#000" stroke-width="0.5"/>
                    <!-- Tail -->
                    <path d="M 75,75 Q 90,70 85,60" stroke="${creature.bodyColor}" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <!-- Neck and head -->
                    <ellipse cx="40" cy="60" rx="10" ry="15" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <ellipse cx="35" cy="45" rx="12" ry="10" fill="${creature.bodyColor}" stroke="#000" stroke-width="1"/>
                    <!-- Spikes -->
                    <polygon points="40,45 42,40 44,45" fill="${creature.maneColor}"/>
                    <polygon points="45,50 47,45 49,50" fill="${creature.maneColor}"/>
                    <polygon points="50,55 52,50 54,55" fill="${creature.maneColor}"/>
                    <polygon points="55,60 57,55 59,60" fill="${creature.maneColor}"/>
                    <polygon points="60,65 62,60 64,65" fill="${creature.maneColor}"/>
                    <!-- Eye -->
                    <circle cx="33" cy="43" r="3" fill="#000"/>
                    <circle cx="34" cy="42" r="1" fill="#FFF"/>
                    <!-- Nostril -->
                    <circle cx="28" cy="47" r="1.5" fill="#000"/>
                    <!-- Pattern: ${creature.pattern} -->
                    ${getPatternSVG(creature.pattern, creature.bodyColor, 55, 70)}
                </svg>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 1.2em;">
                <strong>Your Awesome Dinosaur!</strong><br>
                Body: <span style="color: ${creature.bodyColor};">●</span>
                Spikes: <span style="color: ${creature.maneColor};">●</span><br>
                Style: ${creature.hornStyle} | Pattern: ${creature.pattern}
            </div>
        `;
    }
    
    display.innerHTML = description;
}

function getPatternSVG(pattern, baseColor, cx = 50, cy = 60) {
    switch(pattern) {
        case 'Spots':
            return `
                <circle cx="${cx-10}" cy="${cy-5}" r="3" fill="#FFF" opacity="0.7"/>
                <circle cx="${cx+8}" cy="${cy}" r="2.5" fill="#FFF" opacity="0.7"/>
                <circle cx="${cx}" cy="${cy+8}" r="2" fill="#FFF" opacity="0.7"/>
            `;
        case 'Stripes':
            return `
                <line x1="${cx-15}" y1="${cy-10}" x2="${cx+15}" y2="${cy-10}" stroke="#FFF" stroke-width="2" opacity="0.6"/>
                <line x1="${cx-15}" y1="${cy}" x2="${cx+15}" y2="${cy}" stroke="#FFF" stroke-width="2" opacity="0.6"/>
                <line x1="${cx-15}" y1="${cy+10}" x2="${cx+15}" y2="${cy+10}" stroke="#FFF" stroke-width="2" opacity="0.6"/>
            `;
        case 'Stars':
            return `
                <polygon points="${cx-8},${cy-5} ${cx-9},${cy-2} ${cx-12},${cy-2} ${cx-10},${cy} ${cx-11},${cy+3} ${cx-8},${cy+1} ${cx-5},${cy+3} ${cx-6},${cy} ${cx-4},${cy-2} ${cx-7},${cy-2}" fill="#FFD700" opacity="0.8"/>
                <polygon points="${cx+8},${cy+5} ${cx+7},${cy+8} ${cx+4},${cy+8} ${cx+6},${cy+10} ${cx+5},${cy+13} ${cx+8},${cy+11} ${cx+11},${cy+13} ${cx+10},${cy+10} ${cx+12},${cy+8} ${cx+9},${cy+8}" fill="#FFD700" opacity="0.8"/>
            `;
        default:
            return '';
    }
}

function getHueRotation(color) {
    // Simple hue rotation based on color (approximate)
    const colorMap = {
        '#FF69B4': 0,
        '#9370DB': 30,
        '#87CEEB': 60,
        '#98FB98': 90,
        '#FFD700': 120,
        '#FF6347': 150
    };
    return colorMap[color] || 0;
}

function getPatternEmoji(pattern) {
    const patterns = {
        'solid': '━━━',
        'spots': '🔴 🔴 🔴',
        'stripes': '〰️ 〰️ 〰️',
        'stars': '⭐ ⭐ ⭐'
    };
    return patterns[pattern] || '';
}

function saveCreature() {
    const creature = {...designer.currentCreature, id: Date.now()};
    designer.savedCreatures.push(creature);
    localStorage.setItem('savedCreatures', JSON.stringify(designer.savedCreatures));
    
    window.app.showMessage('🎉 Creature saved!', 'success');
    window.app.playSound('success');
    displaySavedCreatures();
}

function randomizeCreature() {
    const colors = ['#FF69B4', '#9370DB', '#87CEEB', '#98FB98', '#FFD700', '#FF6347'];
    const styles = ['spiral', 'straight', 'curved'];
    const patterns = ['solid', 'spots', 'stripes', 'stars'];
    
    designer.currentCreature.bodyColor = colors[Math.floor(Math.random() * colors.length)];
    designer.currentCreature.maneColor = colors[Math.floor(Math.random() * colors.length)];
    designer.currentCreature.hornStyle = styles[Math.floor(Math.random() * styles.length)];
    designer.currentCreature.pattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    updateCreatureDisplay();
    window.app.playSound('success');
    window.app.showMessage('✨ Random creature created!', 'success');
}

function loadSavedCreatures() {
    const saved = localStorage.getItem('savedCreatures');
    if (saved) {
        designer.savedCreatures = JSON.parse(saved);
        displaySavedCreatures();
    }
}

function displaySavedCreatures() {
    const grid = document.getElementById('savedCreaturesGrid');
    
    if (designer.savedCreatures.length === 0) {
        grid.innerHTML = '<p class="empty-message">You haven\'t saved any creatures yet!</p>';
        return;
    }
    
    grid.innerHTML = designer.savedCreatures.map(creature => `
        <div class="saved-creature-card" style="
            background: white;
            border: 3px solid ${creature.bodyColor};
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
        ">
            <div style="font-size: 3em;">
                ${creature.type === 'unicorn' ? '🦄' : '🦕'}
            </div>
            <div style="font-size: 0.9em; margin-top: 10px;">
                <div style="color: ${creature.bodyColor};">● ${creature.bodyColor}</div>
                <div>${creature.pattern}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to load creatures
    grid.querySelectorAll('.saved-creature-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            designer.currentCreature = {...designer.savedCreatures[index]};
            updateCreatureDisplay();
            window.app.showMessage('Creature loaded!', 'success');
        });
    });
}
