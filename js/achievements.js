// Achievements and Rewards System

const achievements = {
    data: {
        totalStars: 0,
        totalActivitiesCompleted: 0,
        streak: 0,
        lastVisit: null,
        badges: [],
        level: 1,
        xp: 0,
        unlocks: [], // e.g. ['avatar-unicorn', 'bg-space']
        rewardChests: 0 // Number of unopened chests
    },
    badges: [
            unlockables: [
                { id: 'avatar-unicorn', name: 'Unicorn Avatar', desc: 'A magical unicorn to use as your profile!', type: 'avatar', requirement: 5 },
                { id: 'avatar-dragon', name: 'Dragon Avatar', desc: 'A fierce dragon to use as your profile!', type: 'avatar', requirement: 15 },
                { id: 'bg-space', name: 'Space Background', desc: 'Unlock a cosmic background!', type: 'background', requirement: 20 },
                { id: 'mini-game-balloons', name: 'Balloon Pop Mini-Game', desc: 'Unlock a silly balloon popping game!', type: 'mini-game', requirement: 25 }
            ],
        // Fun animated reward popup
        function showRewardPopup(reward) {
            const popup = document.createElement('div');
            popup.className = 'reward-popup';
            popup.innerHTML = `
                <div style="font-size: 3em;">🎁</div>
                <div style="font-size: 1.3em; font-weight: bold; margin: 10px 0;">You unlocked:</div>
                <div style="font-size: 1.1em; color: #9370DB;">${reward.name}</div>
                <div style="font-size: 0.9em; margin-top: 5px;">${reward.desc}</div>
            `;
            popup.style.cssText = `
                position: fixed; left: 50%; top: 20%; transform: translate(-50%, 0);
                background: #fff; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                padding: 30px 40px; z-index: 99999; text-align: center;
                border: 3px solid #9370DB; animation: popIn 0.7s cubic-bezier(.68,-0.55,.27,1.55);
            `;
            document.body.appendChild(popup);
            setTimeout(() => popup.remove(), 2500);
        }

        // Reward chest popup (for streaks or milestones)
        function showRewardChest() {
            const chest = document.createElement('div');
            chest.className = 'reward-chest-popup';
            chest.innerHTML = `
                <div style="font-size: 4em;">🪙</div>
                <div style="font-size: 1.2em; font-weight: bold; margin: 10px 0;">Reward Chest!</div>
                <div style="font-size: 1em; color: #9370DB;">Open for a surprise reward!</div>
            `;
            chest.style.cssText = `
                position: fixed; left: 50%; top: 25%; transform: translate(-50%, 0);
                background: #fffbe7; border-radius: 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                padding: 28px 36px; z-index: 99999; text-align: center;
                border: 3px solid #FFD700; animation: popIn 0.7s cubic-bezier(.68,-0.55,.27,1.55);
                cursor: pointer;
            `;
            chest.onclick = () => {
                chest.remove();
                // Pick a random unlockable or bonus
                const locked = achievements.unlockables.filter(u => !achievements.data.unlocks.includes(u.id));
                let reward;
                if (locked.length > 0) {
                    reward = locked[Math.floor(Math.random() * locked.length)];
                    achievements.data.unlocks.push(reward.id);
                    showRewardPopup(reward);
                } else {
                    reward = { name: 'Bonus Stars!', desc: 'You got 5 bonus stars!' };
                    achievements.data.totalStars += 5;
                    showRewardPopup(reward);
                }
                saveAchievements();
            };
            document.body.appendChild(chest);
        }

        // Add popIn animation to stylesheet if not present
        if (!document.getElementById('popInKeyframes')) {
            const style = document.createElement('style');
            style.id = 'popInKeyframes';
            style.innerHTML = `@keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 80% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }`;
            document.head.appendChild(style);
        }
        { id: 'first-star', name: 'First Star!', desc: 'Earn your first star', icon: 'star', requirement: 1 },
        { id: 'math-whiz', name: 'Math Whiz', desc: 'Complete 10 math activities', icon: 'math', requirement: 10 },
        { id: 'word-master', name: 'Word Master', desc: 'Complete 10 literacy activities', icon: 'book', requirement: 10 },
        { id: 'creative-writer', name: 'Creative Writer', desc: 'Write 5 stories', icon: 'quill', requirement: 5 },
        { id: 'designer-pro', name: 'Designer Pro', desc: 'Save 10 creatures', icon: 'palette', requirement: 10 },
        { id: 'streak-3', name: '3 Day Streak!', desc: 'Learn 3 days in a row', icon: 'fire', requirement: 3 },
        { id: 'streak-7', name: 'Week Warrior!', desc: 'Learn 7 days in a row', icon: 'muscle', requirement: 7 },
        { id: 'century-club', name: 'Century Club', desc: 'Earn 100 stars', icon: 'hundred', requirement: 100 },
        { id: 'explorer', name: 'Explorer', desc: 'Try all activity types', icon: 'compass', requirement: 'all' },
        { id: 'super-learner', name: 'Super Learner', desc: 'Reach Level 10', icon: 'superhero', requirement: 10 }
    ]
};

// ===== Initialize Achievements =====
document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
    checkStreak();
    updateLevel();
});

function loadAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
        Object.assign(achievements.data, JSON.parse(saved));
    }
}

function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements.data));
}

function addStar() {
    achievements.data.totalStars++;
    achievements.data.xp += 10;
    achievements.data.totalActivitiesCompleted++;
    
    updateLevel();
    checkBadges();
    saveAchievements();
    
    showStarAnimation();
}

function updateLevel() {
    const newLevel = Math.floor(achievements.data.xp / 100) + 1;
    if (newLevel > achievements.data.level) {
        achievements.data.level = newLevel;
        showLevelUpAnimation(newLevel);
    }
}

function checkStreak() {
    const today = new Date().toDateString();
    const lastVisit = achievements.data.lastVisit;
    
    if (lastVisit) {
        const lastDate = new Date(lastVisit).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastDate === yesterday) {
            achievements.data.streak++;
        } else if (lastDate !== today) {
            achievements.data.streak = 1;
        }
    } else {
        achievements.data.streak = 1;
    }
    
    achievements.data.lastVisit = new Date().toISOString();
    saveAchievements();
    checkBadges();
}

function checkBadges() {
    achievements.badges.forEach(badge => {
        if (achievements.data.badges.includes(badge.id)) return;
        
        let earned = false;
        
        switch(badge.id) {
            case 'first-star':
                earned = achievements.data.totalStars >= 1;
                break;
            case 'math-whiz':
            case 'word-master':
                earned = achievements.data.totalActivitiesCompleted >= badge.requirement;
                break;
            case 'streak-3':
            case 'streak-7':
                earned = achievements.data.streak >= badge.requirement;
                break;
            case 'century-club':
                earned = achievements.data.totalStars >= 100;
                break;
            case 'super-learner':
                earned = achievements.data.level >= 10;
                break;
        }
        
        if (earned) {
            earnBadge(badge);
        }
    });
}

function earnBadge(badge) {
    achievements.data.badges.push(badge.id);
    saveAchievements();
    showBadgeNotification(badge);
}

function showStarAnimation() {
    const star = document.createElement('div');
    star.innerHTML = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="starGrad">
                    <stop offset="0%" style="stop-color:#FFD700"/>
                    <stop offset="100%" style="stop-color:#FFA500"/>
                </radialGradient>
            </defs>
            <polygon points="50,10 61,35 88,35 67,52 75,78 50,62 25,78 33,52 12,35 39,35" 
                     fill="url(#starGrad)" stroke="#FF8C00" stroke-width="2"/>
            <polygon points="50,15 58,35 75,35 62,45 67,62 50,50 33,62 38,45 25,35 42,35" 
                     fill="#FFEC8B" opacity="0.7"/>
        </svg>
    `;
    star.style.cssText = `
        position: fixed;
        font-size: 3em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        animation: starPop 1s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 1000);
}

function showLevelUpAnimation(level) {
    const levelUp = document.createElement('div');
    levelUp.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 2em;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        text-align: center;
        animation: bounceIn 0.6s ease-out;
    `;
    levelUp.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 10px;">🎉</div>
        <div>LEVEL UP!</div>
        <div style="font-size: 2.5em; color: #FFD700;">Level ${level}</div>
    `;
    
    document.body.appendChild(levelUp);
    
    setTimeout(() => {
        levelUp.style.opacity = '0';
        levelUp.style.transition = 'opacity 0.5s';
        setTimeout(() => levelUp.remove(), 500);
    }, 3000);
}

function showBadgeNotification(badge) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        border: 3px solid var(--accent-color);
        max-width: 300px;
    `;
    notification.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px;">${getBadgeSVG(badge.icon)}</div>
        <div style="font-weight: bold; font-size: 1.2em; text-align: center; color: var(--primary-color);">
            ${badge.name}
        </div>
        <div style="text-align: center; margin-top: 5px; font-size: 0.9em;">
            ${badge.desc}
        </div>
        <div style="text-align: center; margin-top: 15px; font-size: 1em; font-weight: bold; color: var(--accent-color);">
            🎉 Badge Unlocked! 🎉
        </div>
    `;
    
    document.body.appendChild(notification);
    window.app.playSound('success');
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function getBadgeSVG(iconType) {
    const svgs = {
        star: `<svg width="60" height="60" viewBox="0 0 100 100"><polygon points="50,10 61,35 88,35 67,52 75,78 50,62 25,78 33,52 12,35 39,35" fill="#FFD700" stroke="#FFA500" stroke-width="2"/></svg>`,
        math: `<svg width="60" height="60" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" rx="5" fill="#9370DB" stroke="#6A4BC4" stroke-width="2"/><text x="50" y="60" text-anchor="middle" font-size="30" fill="#FFF" font-weight="bold">123</text></svg>`,
        book: `<svg width="60" height="60" viewBox="0 0 100 100"><rect x="25" y="20" width="50" height="60" rx="3" fill="#8B4513" stroke="#654321" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="80" stroke="#654321" stroke-width="2"/><rect x="30" y="35" width="15" height="2" fill="#FFF"/><rect x="30" y="45" width="15" height="2" fill="#FFF"/></svg>`,
        quill: `<svg width="60" height="60" viewBox="0 0 100 100"><line x1="30" y1="70" x2="60" y2="30" stroke="#8B4513" stroke-width="3"/><path d="M 60,30 Q 65,28 63,25 Q 61,28 60,30" fill="#FFF" stroke="#000" stroke-width="1"/><path d="M 25,75 L 30,70 L 35,75 Z" fill="#000"/></svg>`,
        palette: `<svg width="60" height="60" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="30" ry="25" fill="#8B4513" stroke="#654321" stroke-width="2"/><circle cx="40" cy="45" r="5" fill="#FF0000"/><circle cx="55" cy="45" r="5" fill="#0000FF"/><circle cx="50" cy="60" r="5" fill="#FFFF00"/><circle cx="65" cy="55" r="8" fill="#FFF"/></svg>`,
        fire: `<svg width="60" height="60" viewBox="0 0 100 100"><path d="M 50,20 Q 40,40 45,55 Q 35,60 40,75 Q 45,85 50,85 Q 55,85 60,75 Q 65,60 55,55 Q 60,40 50,20" fill="#FF4500" stroke="#FF0000" stroke-width="1"/><path d="M 50,30 Q 47,45 50,55 Q 48,60 50,70 Q 52,60 50,55 Q 53,45 50,30" fill="#FFD700" opacity="0.8"/></svg>`,
        muscle: `<svg width="60" height="60" viewBox="0 0 100 100"><ellipse cx="35" cy="50" rx="15" ry="20" fill="#FFE4C4" stroke="#D2B48C" stroke-width="2"/><ellipse cx="65" cy="50" rx="15" ry="20" fill="#FFE4C4" stroke="#D2B48C" stroke-width="2"/><path d="M 30,35 Q 50,25 70,35" stroke="#D2B48C" stroke-width="3" fill="none"/></svg>`,
        hundred: `<svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#FF1493" stroke="#C71585" stroke-width="3"/><text x="50" y="60" text-anchor="middle" font-size="25" fill="#FFF" font-weight="bold">100</text></svg>`,
        compass: `<svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="#87CEEB" stroke="#4682B4" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="#000"/><polygon points="50,20 48,48 52,48" fill="#FF0000"/><polygon points="50,80 48,52 52,52" fill="#FFF"/></svg>`,
        superhero: `<svg width="60" height="60" viewBox="0 0 100 100"><ellipse cx="50" cy="60" rx="20" ry="25" fill="#FF0000"/><circle cx="50" cy="35" r="12" fill="#FFE4C4"/><polygon points="35,50 30,70 35,70" fill="#FF0000"/><polygon points="65,50 70,70 65,70" fill="#FF0000"/><path d="M 40,25 L 35,30 L 40,30 Z" fill="#FFD700"/><path d="M 60,25 L 65,30 L 60,30 Z" fill="#FFD700"/><rect x="45" y="60" width="10" height="3" fill="#FFD700"/></svg>`
    };
    return svgs[iconType] || svgs.star;
}

// Add animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes starPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); }
        100% { transform: translate(-50%, -50%) scale(0) translateY(-100px); opacity: 0; }
    }
    
    @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Export
window.achievements = {
    addStar: addStar,
    getData: () => achievements.data,
    getBadges: () => achievements.data.badges
};
