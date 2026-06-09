const questions = [
  {
    q: "A city is flooding. What do you do?",
    a: [
      { text: "Build defenses", type: "Tank" },
      { text: "Organize action", type: "Warrior" },
      { text: "Analyze data", type: "Archer" },
      { text: "Invent solutions", type: "Mage" },
      { text: "Help people", type: "Healer" }
    ]
  },
  {
    q: "Your strength is:",
    a: [
      { text: "Protection", type: "Tank" },
      { text: "Action", type: "Warrior" },
      { text: "Precision", type: "Archer" },
      { text: "Creativity", type: "Mage" },
      { text: "Empathy", type: "Healer" }
    ]
  },
  {
    q: "In a crisis you:",
    a: [
      { text: "Stay steady", type: "Tank" },
      { text: "Take charge", type: "Warrior" },
      { text: "Observe first", type: "Archer" },
      { text: "Think differently", type: "Mage" },
      { text: "Support others", type: "Healer" }
    ]
  }
];

let current = 0;
let scores = {
  Tank: 0,
  Warrior: 0,
  Archer: 0,
  Mage: 0,
  Healer: 0
};

let selected = null;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.onclick = () => {
      selected = ans.type;
      document.querySelectorAll("#answers button").forEach(b => b.style.background = "#1e293b");
      btn.style.background = "#475569";
    };
    answersDiv.appendChild(btn);
  });
}

function nextQuestion() {
  if (!selected) return;

  scores[selected]++;
  selected = null;
  current++;

  if (current >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  let top = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const desc = {
    Tank: "You are the Guardian of resilience.",
    Warrior: "You are the force of action.",
    Archer: "You are the eye of precision.",
    Mage: "You are the mind of innovation.",
    Healer: "You are the heart of support."
  };

  document.getElementById("result-title").innerText = `You are: ${top}`;
  document.getElementById("result-desc").innerText = desc[top];
}

function restartQuiz() {
  current = 0;
  scores = { Tank:0, Warrior:0, Archer:0, Mage:0, Healer:0 };

  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result-box").classList.add("hidden");

  loadQuestion();
}

loadQuestion();
