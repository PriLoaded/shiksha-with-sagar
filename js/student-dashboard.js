/* =====================================================
   SHIKSHA WITH SAGAR — STUDENT DASHBOARD
   Uses shared data from js/app-data.js
   ===================================================== */

var currentUser = null;
var currentAssignment = null;
var currentClassData = null;
var currentStreamData = null;
var assignedSubjects = [];


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

    currentClassData = findById(MASTER_DATA.classes, currentAssignment.classId);
    if (currentClassData) {
        currentStreamData = findById(currentClassData.streams, currentAssignment.streamId);
    }

    assignedSubjects = [];
    if (currentStreamData && currentAssignment.subjects) {
        currentAssignment.subjects.forEach(function (subId) {
            var found = findById(currentStreamData.subjects, subId);
            if (found) assignedSubjects.push(found);
        });
    }

    renderDashboardHeader();
    renderSubjectCards();
    updateStats();
}


function renderDashboardHeader() {
    var hour = new Date().getHours();
    var greet = '';
    if (hour >= 5 && hour < 12)       greet = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) greet = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) greet = 'Good Evening 🌙';
    else                               greet = 'Happy Studying 🌟';

    var firstName = (currentUser.name || 'Student').split(' ')[0];

    setTextSafe('dash-greeting', greet);
    setTextSafe('dash-student-name', firstName);
    setTextSafe('dash-avatar', firstName.charAt(0).toUpperCase());
    setTextSafe('topbar-name', currentUser.name || 'Student');
    setTextSafe('topbar-avatar', firstName.charAt(0).toUpperCase());

    if (currentClassData) setTextSafe('dash-class-name', currentClassData.name);
    if (currentStreamData) setTextSafe('dash-stream-name', currentStreamData.name);
}


function renderSubjectCards() {
    var container = document.getElementById('subjects-grid');
    if (!container) return;

    if (assignedSubjects.length === 0) {
        container.innerHTML =
            '<div class="empty-state-dash">' +
            '  <div class="empty-icon-dash">📭</div>' +
            '  <p>No subjects assigned yet.</p>' +
            '  <p class="empty-sub">Contact Sagar Sir to get access.</p>' +
            '</div>';
        return;
    }

    setTextSafe('subject-count-label', assignedSubjects.length + ' subjects');

    var html = '';
    assignedSubjects.forEach(function (sub, index) {
        var totalChapters = sub.chapters ? sub.chapters.length : 0;
        var totalVideos = 0;
        var totalNotes = 0;

        if (sub.chapters) {
            sub.chapters.forEach(function (ch) {
                var content = CHAPTER_CONTENT[ch.id];
                if (content) {
                    totalVideos += (content.videos ? content.videos.length : 0);
                    totalNotes += (content.studyMaterial ? content.studyMaterial.length : 0);
                }
            });
        }

        html +=
            '<a href="subject-page.html?id=' + sub.id + '" ' +
            '   class="subject-card" ' +
            '   style="--card-color:' + sub.color + '; --card-color-light:' + sub.colorLight + '; animation-delay:' + (index * 0.08) + 's">' +
            '  <div class="subject-card-top">' +
            '    <div class="subject-icon-box">' + sub.icon + '</div>' +
            '    <div class="subject-chapter-count">' + totalChapters + ' Ch</div>' +
            '  </div>' +
            '  <h3 class="subject-card-title">' + sub.name + '</h3>' +
            '  <div class="subject-card-stats">' +
            '    <span>🎥 ' + totalVideos + '</span>' +
            '    <span>📄 ' + totalNotes + '</span>' +
            '  </div>' +
            '  <div class="subject-card-bar">' +
            '    <div class="subject-bar-fill" style="width:0%"></div>' +
            '  </div>' +
            '</a>';
    });

    container.innerHTML = html;
}


function updateStats() {
    var totalSubjects = assignedSubjects.length;
    var totalChapters = 0;
    var totalVideos = 0;
    var totalNotes = 0;

    assignedSubjects.forEach(function (sub) {
        if (sub.chapters) {
            totalChapters += sub.chapters.length;
            sub.chapters.forEach(function (ch) {
                var content = CHAPTER_CONTENT[ch.id];
                if (content) {
                    totalVideos += (content.videos ? content.videos.length : 0);
                    totalNotes += (content.studyMaterial ? content.studyMaterial.length : 0);
                }
            });
        }
    });

    setTextSafe('stat-subjects', totalSubjects);
    setTextSafe('stat-chapters', totalChapters);
    setTextSafe('stat-total-videos', totalVideos);
    setTextSafe('stat-total-notes', totalNotes);
}


function showNoAssignment() {
    renderDashboardHeader();
    var container = document.getElementById('subjects-grid');
    if (container) {
        container.innerHTML =
            '<div class="empty-state-dash">' +
            '  <div class="empty-icon-dash">🔒</div>' +
            '  <p>No class or subjects assigned yet.</p>' +
            '  <p class="empty-sub">Contact Sagar Sir to get access.</p>' +
            '</div>';
    }
}


function studentLogout() {
    localStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_splash_done');
    window.location.replace('login.html');
}


function setTextSafe(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}