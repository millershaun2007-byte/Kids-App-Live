const recordButton = document.getElementById('record-button');
const stopButton = document.getElementById('stop-button');
const recordingStatus = document.getElementById('recording-status');
const recordingsList = document.getElementById('recordings-list');

let mediaRecorder;
let audioChunks = [];
let recordingCounter = 1;

recordButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            const recordingItem = document.createElement('div');
            recordingItem.classList.add('recording-item');

            const audio = new Audio(audioUrl);
            audio.controls = true;

            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = `recording_${recordingCounter++}.wav`;
            downloadLink.textContent = 'Download';
            downloadLink.classList.add('download-link');
            
            recordingItem.appendChild(audio);
            recordingItem.appendChild(downloadLink);
            recordingsList.appendChild(recordingItem);

            audioChunks = [];
        };

        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
        recordingStatus.textContent = 'Recording...';

    } catch (error) {
        console.error('Error accessing microphone:', error);
        recordingStatus.textContent = 'Could not access microphone. Please allow permission.';
    }
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
    recordingStatus.textContent = 'Recording stopped. Ready to record again.';
});
