// main.js
// Central utilities, question bank, mapping S1-S4, navigation helpers

// ------------------------------
// Helpers
// ------------------------------
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setLocation(page, params = {}) {
  const url = new URL(window.location.href);
  url.pathname = page;
  url.search = new URLSearchParams(params).toString();
  window.location.href = url.toString();
}

function showMessage(elId, msg) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? "block" : "none";
}

// ------------------------------
// Mapping S1-S4
// ------------------------------
const CONDITION = {
  "S1": { first: "readA", second: "listenB" },
  "S2": { first: "readB", second: "listenA" },
  "S3": { first: "listenA", second: "readB" },
  "S4": { first: "listenB", second: "readA" }
};

// ------------------------------
// Articles loader
// ------------------------------
async function loadArticle(letter) {
  try {
    const res = await fetch(`/articles/${letter}.html`);
    if (!res.ok) return `<p>ไม่พบบทความ ${letter}</p>`;
    return await res.text();
  } catch (e) {
    return `<p>ไม่สามารถโหลดบทความได้</p>`;
  }
}

// ------------------------------
// Question bank (5 MCQs per article)
// ------------------------------
const QUESTIONS = {
    "A": [
        {
            q: "ตัวอย่างคำถามบทความ A ข้อ 1",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        },
        {
            q: "ตัวอย่างคำถามบทความ A ข้อ 2",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        },
        {
            q: "ตัวอย่างคำถามบทความ A ข้อ 3",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        }
    ],
    "B": [
        {
            q: "ตัวอย่างคำถามบทความ B ข้อ 1",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        },
        {
            q: "ตัวอย่างคำถามบทความ B ข้อ 2",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        },
        {
            q: "ตัวอย่างคำถามบทความ B ข้อ 3",
            choices: ["ตัวเลือกที่ 1","ตัวเลือกที่ 2","ตัวเลือกที่ 3","ตัวเลือกที่ 4","ตัวเลือกที่ 5"],
            correct: 0
        }
    ]
};

// ------------------------------
// Render quiz (5 MCQ) into container id
// ------------------------------
function renderQuiz(articleLetter, containerId) {
  const qs = QUESTIONS[articleLetter];
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  qs.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "form-row";
    const qh = document.createElement("p");
    qh.textContent = `${idx+1}. ${item.q}`;
    div.appendChild(qh);
    item.choices.forEach((c, ci) => {
      const id = `${containerId}_q${idx}_c${ci}`;
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `<input type="radio" name="q${idx}" id="${id}" value="${ci}"> ${c}`;
      div.appendChild(label);
    });
    container.appendChild(div);
  });
}

// ------------------------------
// Validate quiz answers
// ------------------------------
function validateQuizAnswers(containerId) {
  const qs = QUESTIONS;
  const radiosPerQ = 5; // 5 questions
  let allAnswered = true;
  const answers = [];
  for (let i=0;i<5;i++) {
    const sel = document.querySelector(`#${containerId} input[name="q${i}"]:checked`);
    if (!sel) { allAnswered = false; break; }
    answers.push(parseInt(sel.value,10));
  }
  return { ok: allAnswered, answers };
}

// ------------------------------
// Compute score (optional)
// ------------------------------
function computeScore(articleLetter, answers) {
  const qset = QUESTIONS[articleLetter];
  let score = 0;
  for (let i=0;i<qset.length;i++) {
    if (answers[i] === qset[i].correct) score++;
  }
  return score;
}

// ------------------------------
// Send data to Google Sheets
// ------------------------------
const GOOGLE_SCRIPT_URL = "YOUR_EXEC_URL_HERE"; // เปลี่ยนเป็น URL /exec จริงของคุณ

function sendToSheet(data) {
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.ok) console.log("ส่งข้อมูลสำเร็จ");
        else console.error("Error status", res.status);
    })
    .catch(err => console.error("เกิดข้อผิดพลาด", err));
}

// ------------------------------
// Exports for page scripts
// ------------------------------
window.Experiment = {
  getParam,
  setLocation,
  loadArticle,
  CONDITION,
  QUESTIONS,
  renderQuiz,
  validateQuizAnswers,
  computeScore,
  showMessage,
  sendToSheet
};
