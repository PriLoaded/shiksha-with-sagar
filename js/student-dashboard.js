/* =====================================================
   SHIKSHA WITH SAGAR — STUDENT DASHBOARD LOGIC
   ===================================================== */

var currentUser = null;
var currentAssignment = null;
var assignedSubjects = [];

// 📜 Motivational Quotes List
var MOTIVATIONAL_QUOTES = [
    "Success comes from consistent effort.",
    "Small progress every day leads to big results.",
    "Learning today builds your future.",
    "The expert in anything was once a beginner.",
    "Education is the most powerful weapon to change the world.",
    "Don't stop until you're proud.",
    "Your only limit is your mind.",
    "Hard work beats talent when talent doesn't work hard.",
    "Focus on being productive, not busy.",
    "Push yourself, because no one else is going to do it for you."
];

/* ─── INITIALIZE ─── */
function initStudentDashboard() {
    currentUser = getLoggedInUser();
    
    if (!currentUser || currentUser.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    currentAssignment = getStudentAssignment(currentUser.email);

    if (!currentAssignment) {
        showNoAssignment();
        return;
    }

    // Resolve assigned subjects from app-data.js
    assignedSubjects = [];
    var classData = findById(MASTER_DATA.classes, currentAssignment.classId);
    if (classData) {
        var streamData = findById(classData.streams, currentAssignment.streamId);
        if (streamData) {
            currentAssignment.subjects.forEach(subId => {
                var sub = findById(streamData.subjects, subId);
                if (sub) assignedSubjects.push(sub);
            });
            
            // Set Class/Stream UI
            setText('dash-class-name', classData.name);
            setText('dash-stream-name', streamData.name);
        }
    }

    renderGreeting();
    renderRandomQuote();
    renderSubjectCards();
    updateStats();
}

/* ─── PERSONALIZED GREETING ─── */
function renderGreeting() {
    var hour = new Date().getHours();
    var timeGreet = '';
    if (hour >= 5 && hour < 12)       timeGreet = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) timeGreet = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) timeGreet = 'Good Evening 🌙';
    else                               timeGreet = 'Happy Studying 🌟';

    // Extract first name (e.g., "Rahul Sharma" -> "Rahul")
    var firstName = (currentUser.name || 'Student').split(' ')[0];

    setText('dash-greeting', timeGreet);
    setText('dash-student-name', firstName);
    setText('dash-avatar', firstName.charAt(0).toUpperCase());
}

/* ─── RANDOM QUOTE ─── */
function renderRandomQuote() {
    var randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    var quote = MOTIVATIONAL_QUOTES[randomIndex];
    setText('motivational-quote', quote);
}

/* ─── SUBJECT CARDS ─── */
function renderSubjectCards() {
    var container = document.getElementById('subjects-grid');
    if (!container) return;

    var html = '';
    assignedSubjects.forEach((sub, index) => {
        var totalCh = sub.chapters ? sub.chapters.length : 0;
        
        html += `
            <a href="subject-page.html?id=${sub.id}" class="subject-card" 
               style="--card-color:${sub.color}; --card-color-light:${sub.colorLight}; animation-delay:${index * 0.1}s">
                <div class="subject-card-top">
                    <div class="subject-icon-box">${sub.icon}</div>
                    <div class="subject-chapter-count">${totalCh} Ch</div>
                </div>
                <h3 class="subject-card-title">${sub.name}</h3>
                <div class="subject-card-bar">
                    <div class="subject-bar-fill" style="width: 10%"></div>
                </div>
            </a>
        `;
    });
    container.innerHTML = html;
}

/* ─── STATS ─── */
function updateStats() {
    var totalChapters = 0;
    var totalVideos = 0;
    var totalNotes = 0;

    assignedSubjects.forEach(sub => {
        if (sub.chapters) {
            totalChapters += sub.chapters.length;
            sub.chapters.forEach(ch => {
                var content = CHAPTER_CONTENT[ch.id];
                if (content) {
                    totalVideos += (content.videos ? content.videos.length : 0);
                    totalNotes += (content.studyMaterial ? content.studyMaterial.length : 0);
                }
            });
        }
    });

    setText('stat-subjects', assignedSubjects.length);
    setText('stat-chapters', totalChapters);
    setText('stat-total-videos', totalVideos);
    setText('stat-total-notes', totalNotes);
}

/* ─── LOGOUT ─── */
function studentLogout() {
    localStorage.removeItem('sws_user');
    sessionStorage.clear();
    window.location.replace('login.html');
}

/* ─── HELPERS ─── */
function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

function showNoAssignment() {
    document.getElementById('subjects-grid').innerHTML = `
        <div class="empty-state-dash">
            <p>No subjects assigned. Contact Sagar Sir.</p>
        </div>
    `;
}/* =====================================================
   SHIKSHA WITH SAGAR — STUDENT DASHBOARD LOGIC
   ===================================================== */

var currentUser = null;
var currentAssignment = null;
var assignedSubjects = [];

// 📜 Motivational Quotes List
var MOTIVATIONAL_QUOTES = [
    "Success comes from consistent effort.",
    "Small progress every day leads to big results.",
    "Learning today builds your future.",
    "The expert in anything was once a beginner.",
    "Education is the most powerful weapon to change the world.",
    "Don't stop until you're proud.",
    "Your only limit is your mind.",
    "Hard work beats talent when talent doesn't work hard.",
    "Focus on being productive, not busy.",
    "Push yourself, because no one else is going to do it for you."
];

/* ─── INITIALIZE ─── */
function initStudentDashboard() {
    currentUser = getLoggedInUser();
    
    if (!currentUser || currentUser.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    currentAssignment = getStudentAssignment(currentUser.email);

    if (!currentAssignment) {
        showNoAssignment();
        return;
    }

    // Resolve assigned subjects from app-data.js
    assignedSubjects = [];
    var classData = findById(MASTER_DATA.classes, currentAssignment.classId);
    if (classData) {
        var streamData = findById(classData.streams, currentAssignment.streamId);
        if (streamData) {
            currentAssignment.subjects.forEach(subId => {
                var sub = findById(streamData.subjects, subId);
                if (sub) assignedSubjects.push(sub);
            });
            
            // Set Class/Stream UI
            setText('dash-class-name', classData.name);
            setText('dash-stream-name', streamData.name);
        }
    }

    renderGreeting();
    renderRandomQuote();
    renderSubjectCards();
    updateStats();
}

/* ─── PERSONALIZED GREETING ─── */
function renderGreeting() {
    var hour = new Date().getHours();
    var timeGreet = '';
    if (hour >= 5 && hour < 12)       timeGreet = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) timeGreet = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) timeGreet = 'Good Evening 🌙';
    else                               timeGreet = 'Happy Studying 🌟';

    // Extract first name (e.g., "Rahul Sharma" -> "Rahul")
    var firstName = (currentUser.name || 'Student').split(' ')[0];

    setText('dash-greeting', timeGreet);
    setText('dash-student-name', firstName);
    setText('dash-avatar', firstName.charAt(0).toUpperCase());
}

/* ─── RANDOM QUOTE ─── */
function renderRandomQuote() {
    var randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    var quote = MOTIVATIONAL_QUOTES[randomIndex];
    setText('motivational-quote', quote);
}

/* ─── SUBJECT CARDS ─── */
function renderSubjectCards() {
    var container = document.getElementById('subjects-grid');
    if (!container) return;

    var html = '';
    assignedSubjects.forEach((sub, index) => {
        var totalCh = sub.chapters ? sub.chapters.length : 0;
        
        html += `
            <a href="subject-page.html?id=${sub.id}" class="subject-card" 
               style="--card-color:${sub.color}; --card-color-light:${sub.colorLight}; animation-delay:${index * 0.1}s">
                <div class="subject-card-top">
                    <div class="subject-icon-box">${sub.icon}</div>
                    <div class="subject-chapter-count">${totalCh} Ch</div>
                </div>
                <h3 class="subject-card-title">${sub.name}</h3>
                <div class="subject-card-bar">
                    <div class="subject-bar-fill" style="width: 10%"></div>
                </div>
            </a>
        `;
    });
    container.innerHTML = html;
}

/* ─── STATS ─── */
function updateStats() {
    var totalChapters = 0;
    var totalVideos = 0;
    var totalNotes = 0;

    assignedSubjects.forEach(sub => {
        if (sub.chapters) {
            totalChapters += sub.chapters.length;
            sub.chapters.forEach(ch => {
                var content = CHAPTER_CONTENT[ch.id];
                if (content) {
                    totalVideos += (content.videos ? content.videos.length : 0);
                    totalNotes += (content.studyMaterial ? content.studyMaterial.length : 0);
                }
            });
        }
    });

    setText('stat-subjects', assignedSubjects.length);
    setText('stat-chapters', totalChapters);
    setText('stat-total-videos', totalVideos);
    setText('stat-total-notes', totalNotes);
}

/* ─── LOGOUT ─── */
function studentLogout() {
    localStorage.removeItem('sws_user');
    sessionStorage.clear();
    window.location.replace('login.html');
}

/* ─── HELPERS ─── */
function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

function showNoAssignment() {
    document.getElementById('subjects-grid').innerHTML = `
        <div class="empty-state-dash">
            <p>No subjects assigned. Contact Sagar Sir.</p>
        </div>
    `;
}