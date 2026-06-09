// ====================== SAFE INIT ======================
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("chapter-screen").classList.add("hidden");
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.add("hidden");
});

// ====================== STATE ======================
let current = 0;
let selected = null;

let scores = {
  Tank: 0,
  Warrior: 0,
  Archer: 0,
  Mage: 0,
  Healer: 0
};

// ====================== CHAPTERS ======================
const chapters = [
  {
    title: "ACT 1: Warning Signs",
    desc: "Heat rises, rains shift, and early climate changes begin."
  },
  {
    title: "ACT 2: The Storms Intensify",
    desc: "Stronger typhoons and flooding begin affecting cities."
  },
  {
    title: "ACT 3: Struggle & Adaptation",
    desc: "Communities rebuild and adapt."
  },
  {
    title: "ACT 4: A New Future",
    desc: "A climate-resilient Philippines emerges."
  }
];

// ====================== QUESTIONS ======================
// (keep your full questions array exactly as you already have it)
// IMPORTANT: not repeated here to keep message readable

// ====================== START ======================
function startQuiz() {
  current = 0;
  selected = null;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("chapter-screen").classList.add("hidden");
  document.getElementById("result-box").classList.add("hidden");

  document.getElementById("quiz-box").classList.remove("hidden");

  loadQuestion();
}

// ====================== SHUFFLE ======================
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// ====================== PROGRESS ======================
function updateProgress() {
  const percent = (current / questions.length) * 100;

  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").innerText =
    `Question ${current + 1} of ${questions.length}`;
}

// ====================== LOAD QUESTION ======================
function loadQuestion() {

  if (!questions || questions.length === 0) {
    console.error("Questions array missing!");
    return;
  }

  const q = questions[current];

  if (!q) {
    console.error("Question index invalid:", current);
    return;
  }

  document.getElementById("chapter-screen").classList.add("hidden");

  const questionEl = document.getElementById("question");
  const answersDiv = document.getElementById("answers");

  if (!questionEl || !answersDiv) {
    console.error("Missing HTML elements");
    return;
  }

  questionEl.innerText = q.q;
  answersDiv.innerHTML = "";

  selected = null;

  const shuffled = shuffle(q.a);

  shuffled.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;

    btn.onclick = () => {
      selected = ans.type;

      document.querySelectorAll("#answers button").forEach(b => {
        b.style.background = "#1e293b";
      });

      btn.style.background = "#475569";
    };

    answersDiv.appendChild(btn);
  });

  updateProgress();
}

// ====================== CHAPTER LOGIC (FIXED) ======================
function showChapterIfNeeded() {

  if (current === 0) return false;

  if (current % 5 !== 0) return false;

  if (current >= questions.length) return false;

  const chapterIndex = (current / 5) - 1;

  const chapter = document.getElementById("chapter-screen");

  document.getElementById("quiz-box").classList.add("hidden");
  chapter.classList.remove("hidden");

  document.getElementById("chapter-title").innerText =
    chapters[chapterIndex].title;

  document.getElementById("chapter-desc").innerText =
    chapters[chapterIndex].desc;

  chapter.onclick = () => {
    chapter.onclick = null;
    chapter.classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();
  };

  return true;
}

// ====================== NEXT ======================
function nextQuestion() {

  if (!selected) {
    alert("Please select an answer first!");
    return;
  }

  scores[selected]++;
  selected = null;

  current++;

  if (current >= questions.length) {
    showResult();
    return;
  }

  const chapterShown = showChapterIfNeeded();

  if (!chapterShown) {
    loadQuestion();
  }
}

// ====================== RESULT ======================
function showResult() {

  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  const results = {
    Tank: { title: "🛡️ Climate Guardian", desc: "You protect and stabilize systems." },
    Warrior: { title: "⚔️ Climate Champion", desc: "You lead action and change." },
    Archer: { title: "🏹 Climate Sentinel", desc: "You analyze and observe patterns." },
    Mage: { title: "🔮 Climate Visionary", desc: "You innovate new solutions." },
    Healer: { title: "❤️ Climate Caregiver", desc: "You care for people and communities." }
  };

  document.getElementById("result-title").innerText =
    results[primary].title;

  document.getElementById("result-desc").innerHTML =
    `${results[primary].desc}<br><br>
     <strong>Secondary:</strong> ${results[secondary].title}`;
}

// ====================== RESTART ======================
function restartQuiz() {
  startQuiz();
}
