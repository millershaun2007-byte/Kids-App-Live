// js/flying-unicorns.js
Merge branch 'main' of https://github.com/millershaun2007-byte/Kids-App-Live

// Interactive flying unicorn section with educational storytelling, memory, and dinosaur/zoo tour
// Premium feature: 3D/animated visuals, story prompts, memory challenges
Merge branch 'main' of https://github.com/millershaun2007-byte/Kids-App-Live
git push origin main
git push orignn main
// --- CONFIG ---
const unicornStories = [
  {
    title: "The Lost Dino Egg",
    story: "While flying over the ancient lands, your unicorn finds a mysterious egg. Can you remember the clues to return it to its dinosaur family?",
    memoryQuiz: [
      { q: "What color was the egg?", a: "Blue" },
      { q: "Which dinosaur did you meet first?", a: "Triceratops" }
    ]
  },
  {
    title: "Zoo Rescue Adventure",
    story: "Your unicorn visits a magical zoo. Some animals need help! Can you remember their names and favorite foods?",
    memoryQuiz: [
      { q: "Which animal needed water?", a: "Elephant" },
      { q: "What snack did the monkey want?", a: "Banana" }
    ]
  }
];

let currentStory = 0;
let currentQuiz = 0;
let userAnswers = [];

// --- UI SETUP ---
function showUnicornSection() {
  const section = document.getElementById('flying-unicorns-section');
  if (!section) return;
  section.innerHTML = '';
  const story = unicornStories[currentStory];
  section.innerHTML = `
    <div class="unicorn-3d-canvas" aria-label="3D flying unicorn animation"></div>
    <h2><span class="material-icons">flight_takeoff</span> ${story.title}</h2>
    <p>${story.story}</p>
    <button id="start-memory-quiz">Start Memory Challenge</button>
    <div id="memory-quiz"></div>
    <button id="next-unicorn-story" style="display:none">Next Adventure</button>
  `;
  setupUnicorn3D();
  document.getElementById('start-memory-quiz').onclick = startMemoryQuiz;
  document.getElementById('next-unicorn-story').onclick = nextUnicornStory;
}

function setupUnicorn3D() {
  // Placeholder: Integrate Three.js or animation for unicorn flying
  const canvas = document.querySelector('.unicorn-3d-canvas');
  canvas.innerHTML = '<div style="width:100%;height:200px;background:linear-gradient(to top,#aeefff,#fff);display:flex;align-items:center;justify-content:center;font-size:2em;">🦄✨</div>';
}

function startMemoryQuiz() {
  currentQuiz = 0;
  userAnswers = [];
  showMemoryQuiz();
}

function showMemoryQuiz() {
  const quizDiv = document.getElementById('memory-quiz');
  const story = unicornStories[currentStory];
  if (currentQuiz >= story.memoryQuiz.length) {
    // Show results
    let correct = 0;
    for (let i = 0; i < story.memoryQuiz.length; i++) {
      if (userAnswers[i] && userAnswers[i].toLowerCase() === story.memoryQuiz[i].a.toLowerCase()) correct++;
    }
    quizDiv.innerHTML = `<p>You got ${correct} out of ${story.memoryQuiz.length} correct!</p>`;
    document.getElementById('next-unicorn-story').style.display = 'inline-block';
    return;
  }
  const q = story.memoryQuiz[currentQuiz];
  quizDiv.innerHTML = `
    <label>${q.q}<br>
      <input type="text" id="memory-answer" aria-label="Answer for: ${q.q}" />
    </label>
    <button id="submit-memory-answer">Submit</button>
  `;
  document.getElementById('submit-memory-answer').onclick = () => {
    const val = document.getElementById('memory-answer').value;
    userAnswers.push(val);
    currentQuiz++;
    showMemoryQuiz();
  };
}

function nextUnicornStory() {
  currentStory = (currentStory + 1) % unicornStories.length;
  showUnicornSection();
}

// --- INTEGRATION ---
window.showUnicornSection = showUnicornSection;cd "C:\Users\mille\OneDrive\Desktop\Kids Groovy Hip Hop Happening Unicorn App\CProjectskids_learning_app"

