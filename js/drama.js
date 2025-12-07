document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const recordBtn = document.getElementById('record-btn');
    const stopBtn = document.getElementById('stop-btn');
    const audioPlayback = document.getElementById('audio-playback');
    const saveAudioStoryBtn = document.getElementById('save-audio-story-btn');
    
    const storyText = document.getElementById('story-text');
    const saveTextStoryBtn = document.getElementById('save-text-story-btn');
    
    const storiesGrid = document.getElementById('stories-grid');

    // --- State Variables ---
    let mediaRecorder;
    let audioChunks = [];
    let recordedAudioBlob = null;

    // --- Voice Recording Functionality ---
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        recordBtn.addEventListener('click', () => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    audioChunks = [];
                    recordedAudioBlob = null;

                    mediaRecorder.addEventListener('dataavailable', event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener('stop', () => {
                        recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const audioUrl = URL.createObjectURL(recordedAudioBlob);
                        audioPlayback.src = audioUrl;
                        saveAudioStoryBtn.disabled = false;
                    });

                    recordBtn.disabled = true;
                    stopBtn.disabled = false;
                    saveAudioStoryBtn.disabled = true;
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                    alert('Could not access the microphone. Please check your browser permissions.');
                });
        });

        stopBtn.addEventListener('click', () => {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                recordBtn.disabled = false;
                stopBtn.disabled = true;
            }
        });
    } else {
        document.getElementById('record-story-box').innerHTML = '<h3>Audio recording is not supported in your browser.</h3>';
    }

    // --- Story Saving Functionality ---
    saveTextStoryBtn.addEventListener('click', () => {
        const text = storyText.value.trim();
        if (text) {
            const story = { type: 'text', content: text, timestamp: new Date().toISOString() };
            saveStory(story);
            storyText.value = '';
        } else {
            alert('Please write a story before saving.');
        }
    });

    saveAudioStoryBtn.addEventListener('click', () => {
        if (recordedAudioBlob) {
            // We need to convert the Blob to a Base64 string to store it in localStorage
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64Audio = reader.result;
                const story = { type: 'audio', content: base64Audio, timestamp: new Date().toISOString() };
                saveStory(story);
                // Reset audio elements
                recordedAudioBlob = null;
                audioPlayback.src = '';
                saveAudioStoryBtn.disabled = true;
            };
            reader.readAsDataURL(recordedAudioBlob);
        } else {
            alert('Please record a story before saving.');
        }
    });

    function saveStory(story) {
        const stories = getStories();
        stories.push(story);
        // Sort stories by timestamp, newest first
        stories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        localStorage.setItem('dramaStories', JSON.stringify(stories));
        loadStories();
    }

    function getStories() {
        const stories = localStorage.getItem('dramaStories');
        return stories ? JSON.parse(stories) : [];
    }

    // --- Story Loading and Display ---
    function loadStories() {
        const stories = getStories();
        storiesGrid.innerHTML = '';
        if (stories.length === 0) {
            storiesGrid.innerHTML = '<p>You haven\'t saved any stories yet. Try writing or recording one!</p>';
            return;
        }

        stories.forEach(story => {
            const storyElement = createStoryCard(story);
            storiesGrid.appendChild(storyElement);
        });
    }

    function createStoryCard(story) {
        const card = document.createElement('div');
        card.classList.add('story-card');

        const title = document.createElement('h4');
        title.textContent = `Story from ${new Date(story.timestamp).toLocaleString()}`;
        card.appendChild(title);

        if (story.type === 'text') {
            const content = document.createElement('p');
            content.textContent = story.content;
            card.appendChild(content);
        } else if (story.type === 'audio') {
            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = story.content; // The Base64 string works directly as a src
            card.appendChild(audioPlayer);
        }
        return card;
    }

    // --- Initial Load ---
    loadStories();
});
