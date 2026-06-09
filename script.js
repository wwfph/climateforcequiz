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
const questions = [

  // ===================== ACT 1: WARNING SIGNS =====================

  {
    q: "Unusually hot summers now last longer in your city. What is your first concern?",
    a: [
      { text: "Heat stress on hospitals and people.", type: "Tank" },
      { text: "Government preparedness.", type: "Warrior" },
      { text: "Temperature data trends.", type: "Archer" },
      { text: "Cooling system strain.", type: "Mage" },
      { text: "Elderly and vulnerable groups.", type: "Healer" }
    ]
  },
  {
    q: "Rain patterns suddenly become unpredictable. You notice:",
    a: [
      { text: "Emergency readiness gaps.", type: "Tank" },
      { text: "Need for immediate action.", type: "Warrior" },
      { text: "Shifting rainfall data.", type: "Archer" },
      { text: "Urban drainage redesign ideas.", type: "Mage" },
      { text: "Farmers struggling.", type: "Healer" }
    ]
  },
  {
    q: "Sea levels are slowly rising. Your biggest concern is:",
    a: [
      { text: "Coastal protection systems.", type: "Tank" },
      { text: "Policy urgency.", type: "Warrior" },
      { text: "Measurement accuracy.", type: "Archer" },
      { text: "Floating city concepts.", type: "Mage" },
      { text: "Fishing communities losing livelihood.", type: "Healer" }
    ]
  },
  {
    q: "A mild typhoon causes unexpected flooding. You think:",
    a: [
      { text: "Disaster readiness systems.", type: "Tank" },
      { text: "Stronger government response.", type: "Warrior" },
      { text: "Storm pattern analysis.", type: "Archer" },
      { text: "Better infrastructure design.", type: "Mage" },
      { text: "Helping affected families.", type: "Healer" }
    ]
  },
  {
    q: "Urban heat becomes a daily struggle. You respond by:",
    a: [
      { text: "Cooling shelters and safety zones.", type: "Tank" },
      { text: "Public awareness campaigns.", type: "Warrior" },
      { text: "Heat mapping data analysis.", type: "Archer" },
      { text: "Smart cooling innovations.", type: "Mage" },
      { text: "Supporting street workers.", type: "Healer" }
    ]
  },

  // ===================== ACT 2: INTENSIFYING STORMS =====================

  {
    q: "A super typhoon is approaching your region. Your instinct is:",
    a: [
      { text: "Prepare evacuation centers.", type: "Tank" },
      { text: "Mobilize emergency response.", type: "Warrior" },
      { text: "Track storm data closely.", type: "Archer" },
      { text: "Design flood barriers.", type: "Mage" },
      { text: "Check on neighbors.", type: "Healer" }
    ]
  },
  {
    q: "Flooding becomes more frequent in cities. You notice:",
    a: [
      { text: "Weak infrastructure systems.", type: "Tank" },
      { text: "Need for stronger leadership.", type: "Warrior" },
      { text: "Rainfall pattern shifts.", type: "Archer" },
      { text: "Urban redesign opportunities.", type: "Mage" },
      { text: "More displaced families.", type: "Healer" }
    ]
  },
  {
    q: "A blackout happens during extreme weather. You:",
    a: [
      { text: "Ensure safety first.", type: "Tank" },
      { text: "Coordinate response teams.", type: "Warrior" },
      { text: "Analyze grid failure.", type: "Archer" },
      { text: "Think of renewable energy solutions.", type: "Mage" },
      { text: "Help affected households.", type: "Healer" }
    ]
  },
  {
    q: "Evacuation centers are overcrowded. You focus on:",
    a: [
      { text: "Order and safety systems.", type: "Tank" },
      { text: "Fast coordination of resources.", type: "Warrior" },
      { text: "Capacity and logistics data.", type: "Archer" },
      { text: "Better shelter design.", type: "Mage" },
      { text: "Human comfort and dignity.", type: "Healer" }
    ]
  },
  {
    q: "Misinformation spreads during disasters. You:",
    a: [
      { text: "Maintain calm systems.", type: "Tank" },
      { text: "Correct false information.", type: "Warrior" },
      { text: "Verify facts and sources.", type: "Archer" },
      { text: "Improve communication tools.", type: "Mage" },
      { text: "Support confused communities.", type: "Healer" }
    ]
  },

  // ===================== ACT 3: STRUGGLE & ADAPTATION =====================

  {
    q: "Communities begin rebuilding after disasters. You contribute:",
    a: [
      { text: "Rebuilding infrastructure.", type: "Tank" },
      { text: "Organizing recovery efforts.", type: "Warrior" },
      { text: "Assessing damage data.", type: "Archer" },
      { text: "Designing resilient cities.", type: "Mage" },
      { text: "Supporting affected families.", type: "Healer" }
    ]
  },
  {
    q: "Food supply becomes unstable. You focus on:",
    a: [
      { text: "Secure distribution systems.", type: "Tank" },
      { text: "Urgent policy action.", type: "Warrior" },
      { text: "Supply chain data tracking.", type: "Archer" },
      { text: "Urban farming solutions.", type: "Mage" },
      { text: "Helping hungry communities.", type: "Healer" }
    ]
  },
  {
    q: "Climate migration increases. You prioritize:",
    a: [
      { text: "Stable housing systems.", type: "Tank" },
      { text: "National response planning.", type: "Warrior" },
      { text: "Migration pattern analysis.", type: "Archer" },
      { text: "New city development plans.", type: "Mage" },
      { text: "Human dignity and care.", type: "Healer" }
    ]
  },
  {
    q: "Schools are disrupted by climate events. You:",
    a: [
      { text: "Ensure continuity systems.", type: "Tank" },
      { text: "Push education recovery.", type: "Warrior" },
      { text: "Track disruption patterns.", type: "Archer" },
      { text: "Develop remote learning tools.", type: "Mage" },
      { text: "Support students emotionally.", type: "Healer" }
    ]
  },
  {
    q: "Mental health impacts rise after disasters. You:",
    a: [
      { text: "Create safe community spaces.", type: "Tank" },
      { text: "Organize support programs.", type: "Warrior" },
      { text: "Study mental health data.", type: "Archer" },
      { text: "Innovate mental health tools.", type: "Mage" },
      { text: "Provide emotional care.", type: "Healer" }
    ]
  },

  // ===================== ACT 4: NEW FUTURE =====================

  {
    q: "The country invests heavily in climate solutions. You:",
    a: [
      { text: "Build resilient systems.", type: "Tank" },
      { text: "Lead implementation.", type: "Warrior" },
      { text: "Analyze effectiveness.", type: "Archer" },
      { text: "Design innovations.", type: "Mage" },
      { text: "Ensure inclusivity.", type: "Healer" }
    ]
  },
  {
    q: "Renewable energy becomes widespread. You:",
    a: [
      { text: "Support infrastructure.", type: "Tank" },
      { text: "Push adoption.", type: "Warrior" },
      { text: "Monitor energy data.", type: "Archer" },
      { text: "Invent new systems.", type: "Mage" },
      { text: "Help communities adapt.", type: "Healer" }
    ]
  },
  {
    q: "Cities are redesigned for floods and heat. You:",
    a: [
      { text: "Ensure stability.", type: "Tank" },
      { text: "Oversee transformation.", type: "Warrior" },
      { text: "Evaluate models.", type: "Archer" },
      { text: "Reimagine urban design.", type: "Mage" },
      { text: "Protect people.", type: "Healer" }
    ]
  },
  {
    q: "Climate education becomes mandatory. You:",
    a: [
      { text: "Support implementation.", type: "Tank" },
      { text: "Advocate strongly.", type: "Warrior" },
      { text: "Improve curriculum data.", type: "Archer" },
      { text: "Create learning tools.", type: "Mage" },
      { text: "Teach empathy and care.", type: "Healer" }
    ]
  },
  {
    q: "You look at the future Philippines. You feel:",
    a: [
      { text: "Prepared and steady.", type: "Tank" },
      { text: "Ready to lead change.", type: "Warrior" },
      { text: "Analytical and aware.", type: "Archer" },
      { text: "Inspired and creative.", type: "Mage" },
      { text: "Hopeful for people.", type: "Healer" }
    ]
  }

];

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
