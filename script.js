document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("start-screen").classList.remove("hidden");

  document.getElementById("chapter-screen").classList.add("hidden");
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.add("hidden");

});

let current = 0;
let selected = null;

let scores = {
  Tank: 0,
  Warrior: 0,
  Archer: 0,
  Mage: 0,
  Healer: 0
};

/* ---------------- CHAPTERS ---------------- */

const chapters = [
  {
    title: "ACT 1: Warning Signs",
    desc: "Heat rises, rains shift, and early climate changes begin to affect daily life in the Philippines."
  },
  {
    title: "ACT 2: The Storms Intensify",
    desc: "Stronger typhoons, flooding, and disruption begin affecting cities and provinces."
  },
  {
    title: "ACT 3: Struggle & Adaptation",
    desc: "Communities start rebuilding, adapting, and learning to survive new climate realities."
  },
  {
    title: "ACT 4: A New Future",
    desc: "The Philippines moves toward resilience, innovation, and climate-ready systems."
  }
];

/* ---------------- QUESTIONS ---------------- */

const questions = [

  /* ---------------- ACT 1: WARNING SIGNS (Q1–Q5) ---------------- */

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
    q: "Scientists warn of rising sea levels. You focus on:",
    a: [
      { text: "Coastal protection systems.", type: "Tank" },
      { text: "Policy urgency.", type: "Warrior" },
      { text: "Measurement accuracy.", type: "Archer" },
      { text: "Floating city concepts.", type: "Mage" },
      { text: "Fishing communities.", type: "Healer" }
    ]
  },
  {
    q: "A mild typhoon causes unexpected damage. You think:",
    a: [
      { text: "Disaster response readiness.", type: "Tank" },
      { text: "Stronger climate policies.", type: "Warrior" },
      { text: "Storm pattern tracking.", type: "Archer" },
      { text: "Better building designs.", type: "Mage" },
      { text: "Affected families' recovery.", type: "Healer" }
    ]
  },
  {
    q: "Urban heat becomes a daily issue. You respond by:",
    a: [
      { text: "Cooling shelters setup.", type: "Tank" },
      { text: "Public pressure for change.", type: "Warrior" },
      { text: "Heat map analysis.", type: "Archer" },
      { text: "Smart cooling innovations.", type: "Mage" },
      { text: "Helping street workers.", type: "Healer" }
    ]
  },

  /* ---------------- ACT 2: STORMS INTENSIFY (Q6–Q10) ---------------- */

  {
    q: "A super typhoon is approaching your region. Your instinct is:",
    a: [
      { text: "Prepare evacuation centers.", type: "Tank" },
      { text: "Mobilize response teams.", type: "Warrior" },
      { text: "Track storm data closely.", type: "Archer" },
      { text: "Design flood barriers.", type: "Mage" },
      { text: "Check on neighbors.", type: "Healer" }
    ]
  },
  {
    q: "Flooding becomes more frequent in your city. You notice:",
    a: [
      { text: "Weak infrastructure systems.", type: "Tank" },
      { text: "Need for stronger leadership.", type: "Warrior" },
      { text: "Rainfall pattern shifts.", type: "Archer" },
      { text: "Urban redesign opportunities.", type: "Mage" },
      { text: "Displaced families increasing.", type: "Healer" }
    ]
  },
  {
    q: "A blackout happens during extreme weather. You:",
    a: [
      { text: "Ensure safety first.", type: "Tank" },
      { text: "Coordinate response.", type: "Warrior" },
      { text: "Analyze grid failure.", type: "Archer" },
      { text: "Think of renewable energy.", type: "Mage" },
      { text: "Help affected households.", type: "Healer" }
    ]
  },
  {
    q: "Evacuation centers are overcrowded. You focus on:",
    a: [
      { text: "Order and safety.", type: "Tank" },
      { text: "Fast coordination.", type: "Warrior" },
      { text: "Capacity data issues.", type: "Archer" },
      { text: "Better shelter design.", type: "Mage" },
      { text: "Human comfort and care.", type: "Healer" }
    ]
  },
  {
    q: "News spreads misinformation during disasters. You:",
    a: [
      { text: "Maintain calm systems.", type: "Tank" },
      { text: "Correct misinformation.", type: "Warrior" },
      { text: "Verify facts.", type: "Archer" },
      { text: "Improve communication tools.", type: "Mage" },
      { text: "Support confused people.", type: "Healer" }
    ]
  },

  /* ---------------- ACT 3: STRUGGLE & ADAPTATION (Q11–Q15) ---------------- */

  {
    q: "Communities begin rebuilding after disasters. You contribute:",
    a: [
      { text: "Rebuilding infrastructure.", type: "Tank" },
      { text: "Organizing recovery efforts.", type: "Warrior" },
      { text: "Assessing damage data.", type: "Archer" },
      { text: "Designing resilient cities.", type: "Mage" },
      { text: "Supporting families.", type: "Healer" }
    ]
  },
  {
    q: "Food supply becomes unstable. You think:",
    a: [
      { text: "Secure distribution systems.", type: "Tank" },
      { text: "Urgent food policies.", type: "Warrior" },
      { text: "Supply chain data.", type: "Archer" },
      { text: "Urban farming ideas.", type: "Mage" },
      { text: "Helping hungry families.", type: "Healer" }
    ]
  },
  {
    q: "Climate migration increases. You focus on:",
    a: [
      { text: "Housing stability.", type: "Tank" },
      { text: "National response planning.", type: "Warrior" },
      { text: "Migration patterns.", type: "Archer" },
      { text: "New city planning.", type: "Mage" },
      { text: "Human dignity.", type: "Healer" }
    ]
  },
  {
    q: "Schools are disrupted by climate events. You:",
    a: [
      { text: "Ensure continuity systems.", type: "Tank" },
      { text: "Push education recovery.", type: "Warrior" },
      { text: "Track disruption patterns.", type: "Archer" },
      { text: "Develop remote learning tech.", type: "Mage" },
      { text: "Support students emotionally.", type: "Healer" }
    ]
  },
  {
    q: "Mental health impacts rise after disasters. You:",
    a: [
      { text: "Create safe spaces.", type: "Tank" },
      { text: "Organize support programs.", type: "Warrior" },
      { text: "Study impact data.", type: "Archer" },
      { text: "Innovate mental health tools.", type: "Mage" },
      { text: "Provide emotional care.", type: "Healer" }
    ]
  },

  /* ---------------- ACT 4: A NEW FUTURE (Q16–Q20) ---------------- */

  {
    q: "The country begins investing in climate solutions. You:",
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
    q: "Cities are redesigned for flooding and heat. You:",
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
/* ---------------- START ---------------- */

function startQuiz() {

  current = 0;
  selected = null;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("chapter-screen").classList.add("hidden");
  document.getElementById("result-box").classList.add("hidden");

  document.getElementById("quiz-box").classList.remove("hidden");

  loadQuestion();
}

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

/* ---------------- LOAD QUESTION ---------------- */

function loadQuestion() {

  document.getElementById("chapter-screen").classList.add("hidden");
  document.getElementById("chapter-screen").onclick = null;

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

      document.querySelectorAll("#answers button").forEach(b => {
        b.style.background = "#1e293b";
      });

      btn.style.background = "#475569";
    };

    answersDiv.appendChild(btn);
  });

  updateProgress();
}

/* ---------------- CHAPTERS ---------------- */

function showChapterIfNeeded() {

  // HARD SAFETY LOCK
  if (current === 0) return false;

  const chapterIndex = Math.floor((current - 1) / 5);

  if (current % 5 === 0 && current < questions.length) {

    const chapter = document.getElementById("chapter-screen");

    document.getElementById("quiz-box").classList.add("hidden");
    chapter.classList.remove("hidden");

    document.getElementById("chapter-title").innerText =
      chapters[chapterIndex].title;

    document.getElementById("chapter-desc").innerText =
      chapters[chapterIndex].desc;

    chapter.onclick = null;

    chapter.onclick = () => {
      chapter.onclick = null;

      chapter.classList.add("hidden");
      document.getElementById("quiz-box").classList.remove("hidden");

      loadQuestion();
    };

    return true;
  }

  return false;
}

/* ---------------- NEXT ---------------- */

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

  // IMPORTANT: chapter check AFTER state update only
  const chapterShown = showChapterIfNeeded();

  if (!chapterShown) {
    loadQuestion();
  }
}

/* ---------------- RESULT ---------------- */

function showResult() {

  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

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

  document.getElementById("result-box").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
}

/* ---------------- START ---------------- */
