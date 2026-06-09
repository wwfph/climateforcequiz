let current = 0;
let selected = null;

let scores = {
  Tank: 0,
  Warrior: 0,
  Archer: 0,
  Mage: 0,
  Healer: 0
};

const chapters = [
  {
    title: "ACT 1: Warning Signs",
    desc: "The Philippines begins to feel the early effects of climate change."
  },
  {
    title: "ACT 2: The Storms Arrive",
    desc: "Extreme weather events begin to disrupt daily life."
  },
  {
    title: "ACT 3: Recovery",
    desc: "Communities begin rebuilding and adapting."
  },
  {
    title: "ACT 4: The Future Philippines",
    desc: "A climate-resilient future is being shaped."
  }
];

const questions = [
  {
    q: "For the past few years, summers have become hotter. What catches your attention first?",
    a: [
      { text: "Hospitals and emergency readiness.", type: "Tank" },
      { text: "Government response speed.", type: "Warrior" },
      { text: "Weather trend data.", type: "Archer" },
      { text: "Cooling system failures.", type: "Mage" },
      { text: "Vulnerable communities.", type: "Healer" }
    ]
  },
  {
    q: "Residents discuss climate change online. You contribute:",
    a: [
      { text: "Preparedness advice.", type: "Tank" },
      { text: "Calls for action.", type: "Warrior" },
      { text: "Scientific data.", type: "Archer" },
      { text: "New ideas.", type: "Mage" },
      { text: "Human stories.", type: "Healer" }
    ]
  },
  {
    q: "Sea levels are rising. Your concern is:",
    a: [
      { text: "Protection systems.", type: "Tank" },
      { text: "Urgent action.", type: "Warrior" },
      { text: "Accuracy of data.", type: "Archer" },
      { text: "Redesigning cities.", type: "Mage" },
      { text: "Displaced families.", type: "Healer" }
    ]
  },
  {
    q: "Neighborhood meeting role:",
    a: [
      { text: "Organizer.", type: "Tank" },
      { text: "Leader.", type: "Warrior" },
      { text: "Questioner.", type: "Archer" },
      { text: "Idea proposer.", type: "Mage" },
      { text: "Mediator.", type: "Healer" }
    ]
  },
  {
    q: "Strong typhoon predicted:",
    a: [
      { text: "Prepare supplies.", type: "Tank" },
      { text: "Mobilize people.", type: "Warrior" },
      { text: "Study forecasts.", type: "Archer" },
      { text: "Find innovations.", type: "Mage" },
      { text: "Check on others.", type: "Healer" }
    ]
  }
];

/* ---------------- SHUFFLE ---------------- */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ---------------- PROGRESS ---------------- */

function updateProgress() {
  const percent = (current / questions.length) * 100;

  document.getElementById("progress-bar").style.width = percent + "%";

  document.getElementById("progress-text").innerText =
    `Question ${current + 1} of ${questions.length}`;
}

/* ---------------- CHAPTERS ---------------- */

function showChapterIfNeeded() {
  if (current % 5 === 0 && current < questions.length) {

    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("chapter-screen").style.display = "block";

    const chapterIndex = Math.floor(current / 5);

    document.getElementById("chapter-title").innerText =
      chapters[chapterIndex].title;

    document.getElementById("chapter-desc").innerText =
      chapters[chapterIndex].desc;

    setTimeout(() => {
      document.getElementById("chapter-screen").style.display = "none";
      document.getElementById("quiz-box").style.display = "block";
      loadQuestion();
    }, 1500);
  }
}

/* ---------------- LOAD QUESTION ---------------- */

function loadQuestion() {

  const q = questions[current];

  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  selected = null;

  const shuffled = shuffle(q.a);

  shuffled.forEach(ans => {

    const btn = document.createElement("button");
    btn.innerText = ans.text;

    btn.onclick = () => {

      selected = ans.type;

      // clear all highlights
      document.querySelectorAll("#answers button").forEach(b => {
        b.style.background = "#1e293b";
      });

      // highlight selected
      btn.style.background = "#475569";
    };

    answersDiv.appendChild(btn);
  });

  updateProgress();
}

/* ---------------- NEXT ---------------- */

function nextQuestion() {

  console.log("Next clicked. Selected:", selected);

  if (!selected) {
    alert("Please select an answer first!");
    return;
  }

  scores[selected]++;

  current++;

  if (current >= questions.length) {
    showResult();
    return;
  }

  showChapterIfNeeded();
}

/* ---------------- RESULT ---------------- */

function showResult() {

  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  const results = {
    Tank: {
      title: "🛡️ Climate Guardian",
      desc: "You focus on resilience and protection. People rely on you for stability."
    },
    Warrior: {
      title: "⚔️ Climate Champion",
      desc: "You drive action and push change forward when it matters most."
    },
    Archer: {
      title: "🏹 Climate Sentinel",
      desc: "You see patterns others miss and guide decisions with insight."
    },
    Mage: {
      title: "🔮 Climate Visionary",
      desc: "You innovate and imagine new solutions for the future."
    },
    Healer: {
      title: "❤️ Climate Caregiver",
      desc: "You prioritize people, healing, and community well-being."
    }
  };

  document.getElementById("result-title").innerText =
    results[primary].title;

  document.getElementById("result-desc").innerHTML =
    `${results[primary].desc}<br><br>
     <strong>Secondary Trait:</strong> ${results[secondary].title}`;
}

/* ---------------- RESTART ---------------- */

function restartQuiz() {
  current = 0;
  selected = null;

  scores = {
    Tank: 0,
    Warrior: 0,
    Archer: 0,
    Mage: 0,
    Healer: 0
  };

  document.getElementById("result-box").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";

  loadQuestion();
}

/* ---------------- START ---------------- */

loadQuestion();
