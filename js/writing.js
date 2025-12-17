// Creative Writing Module

const writing = {
    savedStories: [],
    currentStory: {
        title: '',
        content: ''
    },
    prompts: [
        {
            text: "A unicorn and a dinosaur became best friends. One day they discovered a magical door in the forest that led to...",
            words: ["adventure", "sparkle", "discover", "magical", "friendship", "explore", "rainbow", "treasure"]
        },
        {
            text: "I woke up one morning and discovered I had superpowers! I could...",
            words: ["fly", "invisible", "strong", "fast", "brave", "hero", "save", "amazing"]
        },
        {
            text: "In a land made entirely of candy, there lived a...",
            words: ["sweet", "colorful", "delicious", "chocolate", "candy", "dream", "yummy", "happy"]
        },
        {
            text: "A tiny robot named Sparkle wanted to learn how to dance. First, Sparkle...",
            words: ["dance", "music", "twirl", "jump", "learn", "practice", "fun", "friends"]
        },
        {
            text: "The dragon wasn't scary at all! Instead, this dragon loved to...",
            words: ["kind", "gentle", "friendly", "help", "smile", "caring", "nice", "share"]
        },
        {
            text: "On a rainy day, I looked out my window and saw something incredible...",
            words: ["wonder", "surprise", "amazing", "beautiful", "special", "magical", "exciting", "incredible"]
        },
        {
            text: "If I could visit any planet in the universe, I would go to...",
            words: ["space", "stars", "explore", "rocket", "adventure", "alien", "planet", "galaxy"]
        },
        {
            text: "My pet could talk! The first thing they said to me was...",
            words: ["talking", "surprise", "funny", "silly", "laugh", "chat", "tell", "story"]
        }
    ],
    currentPrompt: null
};

// ===== Initialize Writing Module =====
document.addEventListener('DOMContentLoaded', () => {
    initializeWriting();
    loadSavedStories();
});

function initializeWriting() {
    // New Prompt Button
    document.getElementById('newPrompt').addEventListener('click', () => {
        generateNewPrompt();
        window.app.playSound('click');
    });

    // Story Title Input
    const titleInput = document.getElementById('storyTitle');
    titleInput.addEventListener('input', (e) => {
        writing.currentStory.title = e.target.value;
    });

    // Story Textarea
    const storyText = document.getElementById('storyText');
    storyText.addEventListener('input', (e) => {
        writing.currentStory.content = e.target.value;
        updateWordCount();
    });

    // Tool Buttons
    document.getElementById('boldBtn').addEventListener('click', () => {
        insertFormatting('**', '**');
    });

    document.getElementById('italicBtn').addEventListener('click', () => {
        insertFormatting('_', '_');
    });

    document.getElementById('emojiBtn').addEventListener('click', () => {
        showEmojiPicker();
    });

    // Save Story Button
    document.getElementById('saveStory').addEventListener('click', () => {
        saveCurrentStory();
    });

    // Clear Story Button
    document.getElementById('clearStory').addEventListener('click', () => {
        if (confirm('Are you sure you want to start a new story?')) {
            clearStory();
        }
    });

    // Generate initial prompt
    generateNewPrompt();
}

// ===== Story Prompts =====
function generateNewPrompt() {
    const prompt = writing.prompts[Math.floor(Math.random() * writing.prompts.length)];
    writing.currentPrompt = prompt;
    
    document.getElementById('storyPrompt').innerHTML = `
        <p style="font-size: 1.2em; line-height: 1.8;">
            ${prompt.text}
        </p>
    `;
    
    // Update word bank
    const wordBank = document.getElementById('wordBankButtons');
    wordBank.innerHTML = prompt.words.map(word => `
        <button class="word-btn" onclick="insertWord('${word}')">${word}</button>
    `).join('');
}

// ===== Text Formatting =====
function insertFormatting(startTag, endTag) {
    const textarea = document.getElementById('storyText');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end) || 'text';
    
    const newText = text.substring(0, start) + startTag + selectedText + endTag + text.substring(end);
    textarea.value = newText;
    writing.currentStory.content = newText;
    
    // Set cursor position
    textarea.selectionStart = textarea.selectionEnd = start + startTag.length + selectedText.length + endTag.length;
    textarea.focus();
    
    updateWordCount();
}

function showEmojiPicker() {
    const emojis = ['😊', '😂', '❤️', '⭐', '🌈', '🦄', '🦕', '🎉', '✨', '🌟', '🎈', '🎨', '📚', '✍️', '🏆', '🎯'];
    
    const picker = document.createElement('div');
    picker.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    `;
    
    emojis.forEach(emoji => {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.style.cssText = `
            font-size: 2em;
            padding: 10px;
            background: white;
            border: 2px solid var(--primary-color);
            border-radius: 10px;
            cursor: pointer;
        `;
        btn.addEventListener('click', () => {
            insertWord(emoji);
            document.body.removeChild(picker);
        });
        picker.appendChild(btn);
    });
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖️';
    closeBtn.style.cssText = `
        grid-column: span 4;
        padding: 10px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1em;
    `;
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(picker);
    });
    picker.appendChild(closeBtn);
    
    document.body.appendChild(picker);
}

// ===== Word Bank =====
window.insertWord = function(word) {
    const textarea = document.getElementById('storyText');
    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    
    // Insert word at cursor position with a space
    const newText = text.substring(0, cursorPos) + word + ' ' + text.substring(cursorPos);
    textarea.value = newText;
    writing.currentStory.content = newText;
    
    // Move cursor after inserted word
    textarea.selectionStart = textarea.selectionEnd = cursorPos + word.length + 1;
    textarea.focus();
    
    updateWordCount();
    window.app.playSound('click');
};

// ===== Word Count =====
function updateWordCount() {
    const content = writing.currentStory.content.trim();
    const words = content ? content.split(/\s+/).length : 0;
    document.getElementById('wordCount').textContent = words;
}

// ===== Save Story =====
function saveCurrentStory() {
    if (!writing.currentStory.title.trim()) {
        window.app.showMessage('Please add a title to your story!', 'error');
        return;
    }
    
    if (!writing.currentStory.content.trim()) {
        window.app.showMessage('Please write something in your story!', 'error');
        return;
    }
    
    const story = {
        id: Date.now(),
        title: writing.currentStory.title,
        content: writing.currentStory.content,
        date: new Date().toLocaleDateString(),
        wordCount: writing.currentStory.content.trim().split(/\s+/).length
    };
    
    writing.savedStories.push(story);
    localStorage.setItem('savedStories', JSON.stringify(writing.savedStories));
    
    window.app.showMessage('📚 Story saved successfully!', 'success');
    window.app.playSound('success');
    
    displaySavedStories();
}

// ===== Clear Story =====
function clearStory() {
    writing.currentStory = { title: '', content: '' };
    document.getElementById('storyTitle').value = '';
    document.getElementById('storyText').value = '';
    updateWordCount();
    generateNewPrompt();
    
    window.app.playSound('click');
}

// ===== Load and Display Saved Stories =====
function loadSavedStories() {
    const saved = localStorage.getItem('savedStories');
    if (saved) {
        writing.savedStories = JSON.parse(saved);
        displaySavedStories();
    }
}

function displaySavedStories() {
    const grid = document.getElementById('savedStoriesGrid');
    
    if (writing.savedStories.length === 0) {
        grid.innerHTML = '<p class="empty-message">You haven\'t saved any stories yet!</p>';
        return;
    }
    
    grid.innerHTML = writing.savedStories.map((story, index) => `
        <div class="saved-story-card" style="
            background: white;
            border: 3px solid var(--primary-color);
            border-radius: 15px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s;
        ">
            <h4 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.2em;">
                ${story.title}
            </h4>
            <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">
                ${story.date}
            </p>
            <p style="font-size: 0.9em; margin-bottom: 10px; 
                overflow: hidden; text-overflow: ellipsis; display: -webkit-box; 
                -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                ${story.content.substring(0, 100)}...
            </p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button onclick="loadStory(${index})" style="
                    flex: 1;
                    padding: 8px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9em;
                ">📖 Read</button>
                <button onclick="deleteStory(${index})" style="
                    flex: 1;
                    padding: 8px;
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9em;
                ">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// ===== Load Story =====
window.loadStory = function(index) {
    const story = writing.savedStories[index];
    writing.currentStory = { title: story.title, content: story.content };
    
    document.getElementById('storyTitle').value = story.title;
    document.getElementById('storyText').value = story.content;
    updateWordCount();
    
    window.app.showMessage('Story loaded!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== Delete Story =====
window.deleteStory = function(index) {
    if (confirm('Are you sure you want to delete this story?')) {
        writing.savedStories.splice(index, 1);
        localStorage.setItem('savedStories', JSON.stringify(writing.savedStories));
        displaySavedStories();
        window.app.showMessage('Story deleted', 'success');
    }
};

// ===== Export Stories =====
function exportStories() {
    if (writing.savedStories.length === 0) {
        window.app.showMessage('No stories to export!', 'error');
        return;
    }
    
    const text = writing.savedStories.map(story => 
        `Title: ${story.title}\nDate: ${story.date}\nWords: ${story.wordCount}\n\n${story.content}\n\n${'='.repeat(50)}\n\n`
    ).join('');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-stories.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    window.app.showMessage('Stories exported!', 'success');
}

// Styling for word bank buttons
const writingStyle = document.createElement('style');
writingStyle.textContent = `
    .saved-story-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(writingStyle);
