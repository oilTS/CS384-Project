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
// Data Storage Helpers (UPDATED)
// ------------------------------
const DATA_KEY = 'cs384_exp_data';

function loadExperimentData() {
  const data = localStorage.getItem(DATA_KEY);
  return data ? JSON.parse(data) : {};
}

function saveExperimentData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function clearExperimentData() {
  localStorage.removeItem(DATA_KEY);
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
// Validate quiz answers & Compute score (UPDATED)
// ------------------------------
function validateQuizAnswers(articleLetter, containerId) {
  const qset = QUESTIONS[articleLetter];
  let score = 0;
  let allAnswered = true;
  const answers = [];
  
  // NOTE: Assuming 3 questions based on QUESTIONS structure. Adjust loop for 5
  for (let i = 0; i < qset.length; i++) {
    const sel = document.querySelector(`#${containerId} input[name="q${i}"]:checked`);
    
    if (!sel) { 
      allAnswered = false; 
      answers.push(null); 
    } else {
      const answerIndex = parseInt(sel.value, 10);
      answers.push(answerIndex);
      if (answerIndex === qset[i].correct) score++;
    }
  }
  
  return { ok: allAnswered, score: score, answers: answers };
}

// ------------------------------
// Send data to Google Sheets
// ------------------------------
const GOOGLE_SCRIPT_URL = "YOUR_EXEC_URL_HERE"; // เปลี่ยนเป็น URL /exec จริงของคุณ

function sendToSheet(data) {
    // ใช้ mode: 'no-cors' เพื่อหลีกเลี่ยง CORS error
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log("พยายามส่งข้อมูลไป Google Sheets แล้ว...");
    })
    .catch(err => console.error("เกิดข้อผิดพลาดในการส่งข้อมูล", err));
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
  validateQuizAnswers, // Use this for scoring now
  showMessage,
  sendToSheet,
  loadExperimentData, 
  saveExperimentData,
  clearExperimentData
};