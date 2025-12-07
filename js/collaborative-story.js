document.addEventListener('DOMContentLoaded', () => {
    const storyPromptEl = document.getElementById('story-prompt');
    const newPromptBtn = document.getElementById('new-prompt-btn');
    const storyDisplay = document.getElementById('story-display');
    const currentPlayerEl = document.getElementById('current-player');
    const storyInput = document.getElementById('story-input');
    const addToStoryBtn = document.getElementById('add-to-story-btn');
    const saveStoryBtn = document.getElementById('save-story-btn');
    const newStoryBtn = document.getElementById('new-story-btn');

    const players = ['Player 1', 'Player 2'];
    let currentPlayerIndex = 0;
    let story = [];
    const prompts = [
        "A brave knight and a friendly dragon...",
        "A magical unicorn who lost its sparkle...",
        "A group of animals starting a rock band...",
        "A child who discovers a secret door in their bedroom...",
        "A pirate who is afraid of water...",
        "A robot who wants to learn how to paint..."
    ];

    function startNewStory() {
        story = [];
        currentPlayerIndex = 0;
        updateStoryDisplay();
        updateTurnIndicator();
        getNewPrompt();
    }

    function getNewPrompt() {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        storyPromptEl.textContent = prompts[randomIndex];
    }

    function updateTurnIndicator() {
        currentPlayerEl.textContent = players[currentPlayerIndex];
    }

    function updateStoryDisplay() {
        storyDisplay.innerHTML = '';
        story.forEach(part => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${part.player}:</strong> ${part.text}`;
            p.classList.add(part.player.replace(' ', '-').toLowerCase());
            storyDisplay.appendChild(p);
        });
        storyDisplay.scrollTop = storyDisplay.scrollHeight;
    }

    function addToStory() {
        const text = storyInput.value.trim();
        if (text) {
            story.push({
                player: players[currentPlayerIndex],
                text: text
            });
            storyInput.value = '';
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            updateStoryDisplay();
            updateTurnIndicator();
        }
    }

    newPromptBtn.addEventListener('click', getNewPrompt);
    addToStoryBtn.addEventListener('click', addToStory);
    newStoryBtn.addEventListener('click', startNewStory);

    saveStoryBtn.addEventListener('click', () => {
        if (story.length > 0) {
            const fullStory = story.map(part => `${part.player}: ${part.text}`).join('\n');
            // For now, we'll just log it. We can enhance this later to save to a file or local storage.
            console.log("Story Saved:\n", fullStory);
            alert('Story saved! Check the console for the full story.');
        } else {
            alert('There is no story to save yet!');
        }
    });

    // Initialize
    startNewStory();
});
