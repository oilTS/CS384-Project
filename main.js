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
// Question bank (Updated for Alice & Happy Prince)
// ------------------------------
const QUESTIONS = {
    "A": [
        {
            q: "ทำไมอลิซถึงตัดสินใจวิ่งตามกระต่ายขาวไป?",
            choices: ["เพราะมันพูดได้", "เพราะมันสวมเสื้อกั๊กและมีนาฬิกาพก", "เพราะเธอยังเก็บดอกไม้ไม่เสร็จ", "เพราะพี่สาวของเธอสั่งให้ตามไป", "เพราะมันเป็นกระต่ายตัวใหญ่"],
            correct: 1
        },
        {
            q: "อลิซหยิบอะไรได้จากชั้นวางขณะที่กำลังตกลงไปในโพรง?",
            choices: ["แผนที่", "หนังสือที่มีรูปภาพ", "กระปุกแยมส้ม", "กุญแจทองคำ", "นาฬิกาพก"],
            correct: 2
        },
        {
            q: "อลิซรู้สึกอย่างไรกับหนังสือที่พี่สาวของเธอกำลังอ่าน?",
            choices: ["ตื่นเต้นเพราะมีเรื่องผจญภัย", "ชอบใจเพราะมีสาระ", "เบื่อเพราะไม่มีรูปภาพหรือบทสนทนา", "กลัวเพราะเป็นเรื่องผี", "สนใจเพราะเกี่ยวกับกระต่าย"],
            correct: 2
        },
        {
            q: "อลิซทำอย่างไรกับกระปุกที่หยิบมาได้?",
            choices: ["กินจนหมดเกลี้ยง", "โยนทิ้งลงไปข้างล่าง", "วางไว้บนตู้เก็บของอีกใบขณะลอยผ่าน", "เก็บใส่กระเป๋าเสื้อ", "ทำหลุดมือแตก"],
            correct: 2
        },
        {
            q: "ลักษณะนิสัยใดของอลิซที่แสดงออกชัดเจนที่สุดในบทความนี้?",
            choices: ["ความขี้ขลาด", "ความอยากรู้อยากเห็น", "ความเกียจคร้าน", "ความโกรธเกรี้ยว", "ความรอบคอบ"],
            correct: 1
        }
    ],
    "B": [
        {
            q: "รูปปั้นเจ้าชายผู้มีความสุขถูกประดับตกแต่งด้วยอะไรบ้าง?",
            choices: ["แผ่นทองคำ, ไพลิน, และทับทิม", "เงินบริสุทธิ์และเพชร", "หินอ่อนแกะสลัก", "ทองแดงและมรกต", "ไม้สักทอง"],
            correct: 0
        },
        {
            q: "ทำไมนกนางแอ่นถึงเลือกเกาะที่รูปปั้นนี้?",
            choices: ["เพราะมันคิดว่าเป็นต้นไม้", "เพราะทำเลดีและอากาศถ่ายเทสะดวก", "เพราะมันต้องการขโมยทองคำ", "เพราะมันรู้จักกับเจ้าชายมาก่อน", "เพราะมันหลงทาง"],
            correct: 1
        },
        {
            q: "เหตุการณ์ใดที่ทำให้นกนางแอ่นรู้สึกแปลกใจก่อนจะเงยหน้าขึ้นมอง?",
            choices: ["รูปปั้นขยับตัวได้", "มีเสียงฟ้าร้องดังสนั่น", "หยดน้ำตกลงมาทั้งที่ท้องฟ้าแจ่มใส", "ลมพายุพัดแรงกะทันหัน", "ไฟในเมืองดับลง"],
            correct: 2
        },
        {
            q: "ใครเป็นคนพูดเปรียบเทียบรูปปั้นว่าสวยเหมือนกังหันลมแต่ไร้ประโยชน์?",
            choices: ["เด็กกำพร้า", "แม่ลูกอ่อน", "นกนางแอ่น", "สมาชิกสภาเมือง", "เจ้าชาย"],
            correct: 3
        },
        {
            q: "ความรู้สึกแรกของนกนางแอ่นเมื่อเห็นใบหน้าเจ้าชายร้องไห้คืออะไร?",
            choices: ["ความหวาดกลัว", "ความสงสารจับใจ", "ความรำคาญ", "ความโกรธเคือง", "ความขบขัน"],
            correct: 1
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
// Validate quiz answers & Compute score
// ------------------------------
function validateQuizAnswers(articleLetter, containerId) {
  const qset = QUESTIONS[articleLetter];
  let score = 0;
  let allAnswered = true;
  const answers = [];
  
  // วนลูปตามจำนวนคำถามจริง (5 ข้อ)
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
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQ8wIg0MK3cXxx3plRQGdevD9mBYhJibg7QYtsy58go4yY1CS2UlEoqMSLcDwBqhVb/exec"; // URL ของคุณ

function sendToSheet(data) {
    // ใช้ mode: 'no-cors' เพื่อหลีกเลี่ยง CORS error และลบ Headers ออก
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        // headers: { "Content-Type": "application/json" }, // ลบออกตามคำแนะนำ
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
  validateQuizAnswers,
  showMessage,
  sendToSheet,
  loadExperimentData, 
  saveExperimentData,
  clearExperimentData
};