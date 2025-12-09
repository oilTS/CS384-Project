// =========================================================
// 1. CONFIGURATION (ตั้งค่าเนื้อหาและการทดลอง)
// =========================================================
const TIME_LIMIT_MS = 4 * 60 * 1000 + 30 * 1000; // 4 นาที 30 วินาที สำหรับโหมดอ่าน
const SOUND_CHECK_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

// เนื้อหานิยายเรื่อง X (ตัวอย่าง)
const STORY_X = {
    title: "เรื่อง X: เสียงกระซิบจากกล่องนาฬิกา",
    text: "ความมืดมิดกลืนกินซอยเล็ก ๆ ที่ทอดตัวอยู่หลังอาคารสูง แสงไฟนีออนสีแดงจากป้ายร้านค้าเก่า ๆ เป็นเพียงดวงตาเดียวที่ยังกะพริบอย่างเกียจคร้าน ชายคนหนึ่งชื่อ 'อนันต์' เดินทอดน่องอย่างช้า ๆ มือข้างหนึ่งกุมกระเป๋าหนังเก่า ๆ ที่เต็มไปด้วยเอกสารสำคัญที่เขาต้องนำไปส่งให้เจ้านายก่อนรุ่งสาง อนันต์ไม่ใช่คนกลัวผี แต่เขากลัวความเงียบงันที่ผิดปกติของซอยนี้มากกว่า ปกติแล้วจะมีเสียงแมวร้องหรือเสียงรถมอเตอร์ไซค์จากถนนใหญ่ แต่คืนนี้...ไม่มีอะไรเลยนอกจากเสียงฝีเท้าของเขาเองที่กระทบพื้นคอนกรีต ทันใดนั้น เขาก็ได้ยินเสียงบางอย่าง มันไม่ใช่เสียงกระซิบ แต่เป็นเสียงเหมือนผ้าไหมที่ถูกลากไปตามพื้น อนันต์หยุดนิ่ง เขาหันกลับไปมอง แต่ไม่เห็นอะไรนอกจากความมืดทึบที่อ้าปากรออยู่ เขาเร่งฝีเท้าให้เร็วขึ้น หัวใจเริ่มเต้นระรัว เมื่อมาถึงทางแยก เขามองเห็นเงาตะคุ่ม ๆ ยืนอยู่ที่เสาไฟ เงาที่สูงและผอมมากจนดูเหมือนภาพวาดที่ยืดบิดเบี้ยว อนันต์พยายามมองข้ามและเดินผ่านไปอย่างรวดเร็ว แต่ขณะที่เขาเดินผ่าน เงาตะคุ่มนั้นก็เอื้อมมือที่ยาวผิดปกติออกมาแตะไหล่ของเขา ความเย็นเยียบแล่นไปทั่วร่างของอนันต์ เขากลืนน้ำลายและค่อย ๆ หันกลับไปมอง เงาตะคุ่มนั้นเป็นเพียงชายชราใส่เสื้อคลุมยาวที่กำลังพยายามหยิบกุญแจที่ทำตกจากพื้น 'ขอโทษนะครับพ่อหนุ่ม' ชายชราพูดด้วยเสียงแหบพร่า 'พอดีมองไม่เห็น' อนันต์ถอนหายใจยาวอย่างโล่งอก เขาตอบรับและรีบเดินจากไปพร้อมกับกระเป๋าหนังที่ยังคงกุมไว้อย่างแน่นหนา เขาไม่ได้กลัวเงา แต่เขาเพิ่งตระหนักว่าเขาเพิ่งจะมาถึงจุดเริ่มต้นของซอยนี้...และเสียงผ้าไหมที่ลากเมื่อครู่นั้น อาจเป็นเพียงลมที่พัดกระเป๋าของเขาเอง",
    audioUrl: "https://example.com/audio/story_x.mp3" 
};

// เนื้อหานิยายเรื่อง Y (ตัวอย่าง)
const STORY_Y = {
    title: "เรื่อง Y: ดอกทานตะวันในฤดูหนาว",
    text: "ในเมืองท่าที่เต็มไปด้วยกลิ่นอายของเกลือและปลา 'มีนา' เด็กสาวผู้มีนัยน์ตาสีน้ำเงินเข้มยืนอยู่บนท่าเรือ เธอไม่ได้รอเรือลำใด แต่เธอกำลังมองหากุญแจทองคำที่เคยเป็นของปู่ผู้เป็นนักเดินเรือในตำนาน ปู่ของเธอบอกไว้ว่ากุญแจนี้ไม่ได้ไขหีบสมบัติ แต่ไขความลับของแผนที่ดวงดาวที่ซ่อนอยู่ในห้องใต้หลังคา มีนาใช้เวลาหลายเดือนในการค้นหา จนกระทั่งเธอจำได้ว่าปู่มักจะนั่งอยู่ที่ม้านั่งไม้เก่า ๆ ที่มีรอยสลักเป็นรูปสมอเรือ",
    audioUrl: "https://example.com/audio/story_y.mp3" 
};

// คำถาม (ตัวอย่าง)
const QUESTIONS_X = [
    { q: "อนันต์ถืออะไรในกระเป๋าหนังเก่าๆ?", a: "เอกสารสำคัญ" },
    { q: "สิ่งที่อนันต์กลัวมากกว่าผีคืออะไร?", a: "ความเงียบงันที่ผิดปกติ" }
];
const QUESTIONS_Y = [
    { q: "มีนาอยู่บนท่าเรือเพื่อมองหาอะไร?", a: "กุญแจทองคำ" },
    { q: "กุญแจทองคำไขความลับของอะไร?", a: "แผนที่ดวงดาว" }
];

// =========================================================
// 2. GLOBAL STATE (สถานะการทดลอง)
// =========================================================
let currentSequence; 
let currentPhase = 1; 
let experimentData = {}; 
let timerInterval; 
let timeRemainingForPhase = TIME_LIMIT_MS;
let currentMediaType; 

// =========================================================
// 4. MAIN LOGIC FLOW
// =========================================================

function startExperiment() {
    
    // 1. รับค่ารหัสลำดับจาก Prompt 
    let sequenceInput = prompt("กรุณาป้อนรหัสลำดับการทดลองของคุณ (S1, S2, S3, หรือ S4) ที่ได้รับมอบหมาย:");
    
    const validSequences = ['S1', 'S2', 'S3', 'S4'];
    if (validSequences.includes(sequenceInput)) {
        currentSequence = sequenceInput;
    } else {
        alert("รหัสลำดับไม่ถูกต้อง! กรุณาป้อนรหัสที่ได้รับมอบหมายเท่านั้น");
        return; 
    }
    
    // 2. ดึงองค์ประกอบ DOM ที่จำเป็นสำหรับ Phase แรก
    const welcomeSection = document.getElementById('welcome-section');
    const experimentArea = document.getElementById('experiment-area');

    experimentData.SequenceUsed = currentSequence; 

    welcomeSection.classList.add('hidden');
    experimentArea.classList.remove('hidden');
    startPhase();
}

function startPhase() {
    const condition = getCondition(currentPhase === 1);
    currentMediaType = condition.media;
    
    const mediaTypeLabel = currentMediaType === 'read' ? 'การอ่าน' : 'การฟัง';
    document.getElementById('phase-title').textContent = `ช่วงที่ ${currentPhase}: ${mediaTypeLabel} - เรื่อง ${condition.story.title}`;
    
    // Reset Visibility
    document.getElementById('start-media-button').classList.remove('hidden');
    document.getElementById('skip-button').classList.add('hidden'); 
    document.getElementById('timer-display').classList.add('hidden');
    document.getElementById('audio-book').classList.add('hidden');
    document.getElementById('audio-status').classList.add('hidden');
    
    // 4.4 เตรียมสื่อ
    if (currentMediaType === 'read') {
        setupReading(condition.story.text);
    } else {
        setupListening(condition.story.audioUrl);
    }
    
    experimentData[`Phase${currentPhase}_Condition`] = currentMediaType;
    experimentData[`Phase${currentPhase}_Story`] = condition.story.title;
}

function startMedia() {
    const startMediaButton = document.getElementById('start-media-button');
    const skipButton = document.getElementById('skip-button');
    const timerDisplay = document.getElementById('timer-display');
    const novelContent = document.getElementById('novel-content');
    const checkSoundButton = document.getElementById('check-sound-button');
    const audioBook = document.getElementById('audio-book');
    const audioStatus = document.getElementById('audio-status');

    startMediaButton.classList.add('hidden');
    
    // 1. หยุดและลบเครื่องเล่นเสียงทดสอบที่อาจกำลังทำงานอยู่
    const testAudio = document.getElementById('test-audio-player');
    if (testAudio) testAudio.pause();
    const soundControls = document.getElementById('test-audio-controls');
    if (soundControls) soundControls.remove();
    
    if (currentMediaType === 'read') {
        // --- READING MODE: Start Media and Timer ---
        novelContent.classList.remove('hidden'); 
        skipButton.classList.remove('hidden');
        timerDisplay.classList.remove('hidden');
        runTimer('การอ่าน');

    } else {
        // --- LISTENING MODE: Transition from Check to Play ---
        
        // 1. Hide Check Sound Button and Instructions
        checkSoundButton.classList.add('hidden');
        novelContent.classList.add('hidden');
        
        // 2. Show Audio Player and Status
        audioBook.classList.remove('hidden'); 
        audioStatus.classList.remove('hidden');
        audioStatus.textContent = 'กรุณากดปุ่ม Play บนเครื่องเล่นเสียงเพื่อเริ่มการฟัง';
    }
}


/**
 * @param {string} mediaTypeLabel - 'การอ่าน' หรือ 'การฟัง'
 * @param {number} elapsedTime - เวลาที่ใช้ไปจริง (หน่วย MS)
 */
function endMediaPhase(mediaTypeLabel, elapsedTime) {
    if (timerInterval) clearInterval(timerInterval); 
    
    // 5.1 บันทึกเวลาที่ใช้ไป
    const elapsedSeconds = Math.round(elapsedTime / 1000);
    experimentData[`Phase${currentPhase}_TimeSpent_Sec`] = elapsedSeconds;

    // 5.2 ซ่อน UI ทั้งหมด
    document.getElementById('novel-content').classList.add('hidden');
    document.getElementById('audio-book').classList.add('hidden');
    document.getElementById('audio-status').classList.add('hidden');
    document.getElementById('skip-button').classList.add('hidden'); 
    document.getElementById('timer-display').classList.add('hidden');
    if (document.getElementById('audio-book').duration > 0) document.getElementById('audio-book').pause();
    
    // 5.3 แสดงส่วนคำถาม
    document.getElementById('test-section').classList.remove('hidden');

    const condition = getCondition(currentPhase === 1);
    displayQuestions(condition.questions);
}

function skipToTest() {
    const audioBook = document.getElementById('audio-book');
    
    let timeSpent;
    
    if (currentMediaType === 'read') {
        timeSpent = TIME_LIMIT_MS - timeRemainingForPhase;
        if (timeSpent < 0) timeSpent = TIME_LIMIT_MS;
    } else {
        timeSpent = audioBook.currentTime * 1000; 
    }

    // บังคับในโหมดฟัง: ต้องเล่นจบ
    if (currentMediaType === 'listen' && !audioBook.ended) {
        alert('กรุณารอฟังเทปจนจบก่อนดำเนินการต่อ');
        return;
    }

    endMediaPhase(currentMediaType === 'read' ? 'การอ่าน' : 'การฟัง', timeSpent);
}

function submitTest() {
    const testSection = document.getElementById('test-section');
    const questionsArea = document.getElementById('questions-area');
    
    // *********************************************************
    // ** การตรวจสอบ: บังคับให้ตอบทุกคำถาม (Validation) **
    // *********************************************************
    const condition = getCondition(currentPhase === 1);
    const questions = condition.questions;
    let allAnswered = true;

    for (let i = 0; i < questions.length; i++) {
        // ตรวจสอบว่ามี radio button ที่ชื่อ q{i} ถูกเลือกหรือไม่
        const answered = document.querySelector(`input[name="q${i}"]:checked`);
        if (!answered) {
            allAnswered = false;
            break; 
        }
    }

    if (!allAnswered) {
        alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนดำเนินการต่อ');
        return; 
    }
    
    const dummyScore = Math.floor(Math.random() * 5); 
    experimentData[`Phase${currentPhase}_Score`] = dummyScore;
    
    currentPhase++;
    
    if (currentPhase > 2) {
        endExperiment();
    } else {
        testSection.classList.add('hidden');
        startPhase();
    }
}

function endExperiment() {
    const experimentArea = document.getElementById('experiment-area');
    const summarySection = document.getElementById('summary-section');

    experimentArea.classList.add('hidden');
    summarySection.classList.remove('hidden');
    
    const finalLog = JSON.stringify(experimentData, null, 2);
    const logDisplay = document.createElement('textarea');
    logDisplay.textContent = finalLog;
    logDisplay.rows = 15;
    logDisplay.style.width = '100%';
    logDisplay.readOnly = true;

    document.getElementById('summary-section').appendChild(document.createElement('h3')).textContent = "--- ข้อมูลสรุปสำหรับการวิจัย ---";
    document.getElementById('summary-section').appendChild(document.createElement('p')).innerHTML = "กรุณาคัดลอกข้อความด้านล่างนี้ **ทั้งหมด** แล้วนำไปวางในช่องว่างของแบบสำรวจสุดท้าย:";
    document.getElementById('summary-section').appendChild(logDisplay);
}

// =========================================================
// 5. HELPER FUNCTIONS (ฟังก์ชันสนับสนุน)
// =========================================================

function getCondition(isPhaseOne) {
    const conditionMap = {
        'S1': [{ media: 'read', story: STORY_X, questions: QUESTIONS_X },  
               { media: 'listen', story: STORY_Y, questions: QUESTIONS_Y }], 
        'S2': [{ media: 'listen', story: STORY_Y, questions: QUESTIONS_Y }, 
               { media: 'read', story: STORY_X, questions: QUESTIONS_X }],
        'S3': [{ media: 'read', story: STORY_Y, questions: QUESTIONS_Y }, 
               { media: 'listen', story: STORY_X, questions: QUESTIONS_X }],
        'S4': [{ media: 'listen', story: STORY_X, questions: QUESTIONS_X }, 
               { media: 'read', story: STORY_Y, questions: QUESTIONS_Y }]
    };
    
    const phaseIndex = isPhaseOne ? 0 : 1;
    return conditionMap[currentSequence][phaseIndex];
}

function runTimer(mediaTypeLabel) {
    timeRemainingForPhase = TIME_LIMIT_MS;
    const timerDisplay = document.getElementById('timer-display');
    
    timerInterval = setInterval(() => {
        timeRemainingForPhase -= 1000;
        
        const totalSeconds = Math.floor(timeRemainingForPhase / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        timerDisplay.textContent = `เวลาคงเหลือสำหรับการ${mediaTypeLabel}: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeRemainingForPhase <= 0) {
            endMediaPhase(mediaTypeLabel, TIME_LIMIT_MS);
        }
    }, 1000);
}

function setupReading(text) {
    const novelContent = document.getElementById('novel-content');
    const checkSoundButton = document.getElementById('check-sound-button');

    // 1. เตรียมเนื้อหา แต่ซ่อนไว้
    novelContent.innerHTML = text;
    novelContent.classList.add('hidden');
    
    checkSoundButton.classList.add('hidden');
    
    // 2. ลบตัวควบคุมเสียงทดสอบที่อาจหลงเหลืออยู่
    const soundControls = document.getElementById('test-audio-controls');
    if (soundControls) soundControls.remove();
}

function listeningCheckSound() {
    let testAudio = document.getElementById('test-audio-player');
    
    if (!testAudio) {
        const controlsDiv = document.createElement('div');
        controlsDiv.id = 'test-audio-controls';
        controlsDiv.style.marginTop = '15px';
        controlsDiv.style.padding = '10px';
        controlsDiv.style.border = '1px solid #ccc';
        controlsDiv.style.borderRadius = '4px';

        testAudio = document.createElement('audio');
        testAudio.id = 'test-audio-player';
        testAudio.src = SOUND_CHECK_URL;
        testAudio.controls = true; 
        testAudio.loop = true; 
        
        const label = document.createElement('p');
        label.textContent = "🔊 กำลังเล่นเสียงทดสอบ: คุณสามารถควบคุม (เล่น/หยุด) ได้ที่นี่";

        controlsDiv.appendChild(label);
        controlsDiv.appendChild(testAudio);
        
        document.getElementById('media-area').insertBefore(controlsDiv, document.getElementById('start-media-button'));
        
        testAudio.play().catch(e => {
            console.error("Autoplay failed:", e);
        });
        
    } else {
        testAudio.play();
    }
    
    const checkSoundButton = document.getElementById('check-sound-button');
    checkSoundButton.textContent = '🔊 กำลังเช็คเสียง...';
    checkSoundButton.disabled = true;

    testAudio.onpause = function() {
         checkSoundButton.textContent = '🔊 เช็คเสียงอีกครั้ง';
         checkSoundButton.disabled = false;
    };
    testAudio.onplay = function() {
         checkSoundButton.textContent = '🔊 กำลังเล่น...';
         checkSoundButton.disabled = true;
    };
}


function setupListening(url) {
    const audioBook = document.getElementById('audio-book');
    const novelContent = document.getElementById('novel-content');
    const checkSoundButton = document.getElementById('check-sound-button');
    
    audioBook.src = url;
    audioBook.load();
    
    // 1. Setup UI สำหรับ Pre-Start (Check Sound Phase)
    novelContent.innerHTML = '<h3>คำเตือนสำคัญสำหรับการฟัง</h3>' + 
                             '<p>เทปนี้จะเล่นได้ **เพียงครั้งเดียวเท่านั้น** ห้ามหยุดหรือกรอย้อนกลับ</p>' +
                             '<p>โปรดใช้ปุ่ม **🔊 คลิกเพื่อเช็คเสียงหูฟัง** เพื่อตรวจสอบหูฟังก่อนเริ่ม</p>';
    novelContent.classList.remove('hidden'); 

    checkSoundButton.classList.remove('hidden'); 
    
    // 2. หยุดและลบเครื่องเล่นเสียงทดสอบที่อาจกำลังทำงานอยู่
    const testAudio = document.getElementById('test-audio-player');
    if (testAudio) testAudio.pause();
    const soundControls = document.getElementById('test-audio-controls');
    if (soundControls) soundControls.remove();
    
    // 3. Setup Event Handlers สำหรับ Audio Book
    let lastPlayedTime = 0;
    const audioStatus = document.getElementById('audio-status');
    const skipButton = document.getElementById('skip-button');
    
    audioBook.ontimeupdate = function() {
        if (audioBook.currentTime > lastPlayedTime + 2) {
            audioBook.currentTime = lastPlayedTime;
            audioStatus.textContent = '**คำเตือน:** ห้ามกรอไปข้างหน้า! ระบบได้ทำการย้อนกลับให้แล้ว';
        } else {
             lastPlayedTime = audioBook.currentTime;
             if (!audioBook.paused) { 
                 audioStatus.textContent = 'กำลังฟัง...';
             }
        }
    };
    
    audioBook.onended = function() {
        audioStatus.textContent = 'สถานะ: เล่นจบแล้ว คุณสามารถดำเนินการต่อได้';
        skipButton.classList.remove('hidden'); 
    };
    
    audioBook.onpause = function() {
        audioStatus.textContent = 'หยุดชั่วคราว (โปรดฟังต่อ)';
    };
    audioBook.onplay = function() {
        audioStatus.textContent = 'กำลังฟัง...';
    };
}

function displayQuestions(questions) {
    const questionsArea = document.getElementById('questions-area');
    let html = '';
    questions.forEach((q, index) => {
        html += `<div style="margin-top: 15px;">`;
        html += `<p><strong>${index + 1}. ${q.q}</strong></p>`;
        html += `<input type="radio" name="q${index}" value="A" required> ตัวเลือก A <br>`;
        html += `<input type="radio" name="q${index}" value="B" required> ตัวเลือก B <br>`;
        html += `</div>`;
    });
    questionsArea.innerHTML = html;
}