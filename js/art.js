// Art Studio Module

const art = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    currentColor: '#FF0000',
    brushSize: 5,
    savedArt: []
};

// ===== Initialize Art Studio =====
document.addEventListener('DOMContentLoaded', () => {
    art.canvas = document.getElementById('drawingCanvas');
    art.ctx = art.canvas.getContext('2d');
    
    loadSavedArt();
    setupCanvas();
    setupTools();
    setupTemplates();
});

function setupCanvas() {
    const canvas = art.canvas;
    const ctx = art.ctx;
    
    // Set white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Drawing event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    art.isDrawing = true;
    const rect = art.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    art.ctx.beginPath();
    art.ctx.moveTo(x, y);
}

function draw(e) {
    if (!art.isDrawing) return;
    
    const rect = art.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    art.ctx.lineTo(x, y);
    art.ctx.strokeStyle = art.currentColor;
    art.ctx.lineWidth = art.brushSize;
    art.ctx.lineCap = 'round';
    art.ctx.lineJoin = 'round';
    art.ctx.stroke();
}

function stopDrawing() {
    art.isDrawing = false;
    art.ctx.beginPath();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    art.canvas.dispatchEvent(mouseEvent);
}

function setupTools() {
    // Brush size
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    
    brushSize.addEventListener('input', (e) => {
        art.brushSize = e.target.value;
        brushSizeValue.textContent = e.target.value;
    });
    
    // Color palette
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            art.currentColor = btn.dataset.color;
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.app.playSound('click');
        });
    });
    
    // Set first color as active
    if (colorBtns[0]) colorBtns[0].classList.add('active');
    
    // Clear canvas
    document.getElementById('clearCanvas').addEventListener('click', () => {
        if (confirm('Clear your drawing?')) {
            art.ctx.fillStyle = '#FFFFFF';
            art.ctx.fillRect(0, 0, art.canvas.width, art.canvas.height);
            window.app.playSound('click');
        }
    });
    
    // Save art
    document.getElementById('saveArt').addEventListener('click', saveArtwork);
}

function setupTemplates() {
    const templateBtns = document.querySelectorAll('.template-btn');
    
    templateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.dataset.template;
            drawTemplate(template);
            window.app.playSound('success');
        });
    });
}

function drawTemplate(template) {
    const ctx = art.ctx;
    const canvas = art.canvas;
    
    // Clear canvas first
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    switch(template) {
        case 'unicorn':
            // Draw unicorn outline
            ctx.beginPath();
            ctx.arc(400, 350, 80, 0, Math.PI * 2); // Body
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(380, 250, 50, 0, Math.PI * 2); // Head
            ctx.stroke();
            // Horn
            ctx.beginPath();
            ctx.moveTo(380, 200);
            ctx.lineTo(370, 230);
            ctx.lineTo(390, 230);
            ctx.closePath();
            ctx.stroke();
            break;
            
        case 'dragon':
            // Draw dragon outline
            ctx.beginPath();
            ctx.arc(400, 350, 100, 0, Math.PI * 2); // Body
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(350, 270, 60, 0, Math.PI * 2); // Head
            ctx.stroke();
            // Wing
            ctx.beginPath();
            ctx.moveTo(450, 300);
            ctx.quadraticCurveTo(550, 250, 500, 350);
            ctx.stroke();
            break;
            
        case 'princess':
            // Draw princess outline
            ctx.beginPath();
            ctx.arc(400, 250, 40, 0, Math.PI * 2); // Head
            ctx.stroke();
            // Crown
            ctx.beginPath();
            ctx.moveTo(370, 220);
            ctx.lineTo(375, 200);
            ctx.lineTo(385, 210);
            ctx.lineTo(400, 195);
            ctx.lineTo(415, 210);
            ctx.lineTo(425, 200);
            ctx.lineTo(430, 220);
            ctx.stroke();
            // Dress
            ctx.beginPath();
            ctx.moveTo(400, 290);
            ctx.lineTo(300, 450);
            ctx.lineTo(500, 450);
            ctx.closePath();
            ctx.stroke();
            break;
            
        case 'castle':
            // Draw castle outline
            ctx.strokeRect(300, 300, 200, 200); // Main building
            ctx.strokeRect(280, 250, 60, 100); // Left tower
            ctx.strokeRect(460, 250, 60, 100); // Right tower
            // Door
            ctx.beginPath();
            ctx.arc(400, 500, 30, Math.PI, 0, true);
            ctx.lineTo(430, 500);
            ctx.lineTo(370, 500);
            ctx.stroke();
            break;
            
        case 'rainbow':
            // Draw rainbow
            const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
            colors.forEach((color, i) => {
                ctx.strokeStyle = color;
                ctx.lineWidth = 20;
                ctx.beginPath();
                ctx.arc(400, 500, 150 - (i * 20), Math.PI, 0, true);
                ctx.stroke();
            });
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            break;
    }
}

function saveArtwork() {
    const dataURL = art.canvas.toDataURL();
    const timestamp = Date.now();
    
    art.savedArt.push({
        id: timestamp,
        image: dataURL,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('savedArt', JSON.stringify(art.savedArt));
    displaySavedArt();
    
    window.app.playSound('success');
    window.app.showMessage('🎨 Artwork saved!');
    
    // Add achievement
    if (typeof achievements !== 'undefined') {
        achievements.data.totalActivitiesCompleted++;
        achievements.addStar();
    }
}

function loadSavedArt() {
    const saved = localStorage.getItem('savedArt');
    if (saved) {
        art.savedArt = JSON.parse(saved);
        displaySavedArt();
    }
}

function displaySavedArt() {
    const grid = document.getElementById('savedArtGrid');
    
    if (art.savedArt.length === 0) {
        grid.innerHTML = '<p class="empty-message">You haven\'t saved any artwork yet!</p>';
        return;
    }
    
    grid.innerHTML = art.savedArt.map(artwork => `
        <div class="art-card" data-id="${artwork.id}">
            <img src="${artwork.image}" alt="Saved artwork">
            <div class="art-info">
                <span>${artwork.date}</span>
                <button class="delete-btn" onclick="deleteArtwork(${artwork.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteArtwork(id) {
    if (confirm('Delete this artwork?')) {
        art.savedArt = art.savedArt.filter(artwork => artwork.id !== id);
        localStorage.setItem('savedArt', JSON.stringify(art.savedArt));
        displaySavedArt();
        window.app.playSound('click');
    }
}
