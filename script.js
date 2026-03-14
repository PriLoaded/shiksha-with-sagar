/* =====================================================
   SHIKSHA WITH SAGAR — MAIN APP SCRIPT
   =====================================================
   
   ⚠️ IMPORTANT: Replace the API_URL below with your
   Google Apps Script Web App URL after deploying it.
   
   ===================================================== */

// ════════════════════════════════════════════════════════
//  🔧 CONFIGURATION — EDIT THESE
// ════════════════════════════════════════════════════════

var API_URL = 'https://script.google.com/macros/s/AKfycbxn93c2Ti7qX9Tkj3Ucf7WypCY_g8vmr18VeyxtI4N089CfWPQI7oN-vVvUMR5zXb9EfA/exec';

var SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

var SUBJECT_ICONS = {
    'Physics':     '⚛️',
    'Chemistry':   '🧪',
    'Mathematics': '📐',
    'Biology':     '🧬'
};

var SUBJECT_BADGE_CLASS = {
    'Physics':     'badge-physics',
    'Chemistry':   'badge-chemistry',
    'Mathematics': 'badge-mathematics',
    'Biology':     'badge-biology'
};

// ════════════════════════════════════════════════════════
//  ⛔ DO NOT EDIT BELOW THIS LINE
// ════════════════════════════════════════════════════════

var currentData = [];
var currentPageType = '';
var currentSubject = 'All';


/* ─── API HELPER ────────────────────────────────────── */
function apiGet(params) {
    var query = Object.keys(params).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');

    return fetch(API_URL + '?' + query)
        .then(function(r) { return r.json(); });
}

function apiPost(data) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
        redirect: 'follow'
    }).then(function(r) { return r.json(); });
}


/* ─── YOUTUBE HELPER ────────────────────────────────── */
function extractVideoId(url) {
    if (!url) return '';
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?\s]{11})/);
    return match ? match[1] : url.trim();
}

function getThumbUrl(videoId) {
    return 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
}


/* ─── SUBJECT FILTER PILLS ──────────────────────────── */
function buildFilterPills() {
    var container = document.querySelector('.filter-scroll');
    if (!container) return;

    var html = '<button class="filter-pill active" onclick="filterBySubject(\'All\', this)">All</button>';

    SUBJECTS.forEach(function(sub) {
        html += '<button class="filter-pill" data-subject="' + sub + '" ' +
                'onclick="filterBySubject(\'' + sub + '\', this)">' +
                (SUBJECT_ICONS[sub] || '') + ' ' + sub + '</button>';
    });

    container.innerHTML = html;
}

function filterBySubject(subject, btn) {
    currentSubject = subject;

    document.querySelectorAll('.filter-pill').forEach(function(p) {
        p.classList.remove('active');
    });
    if (btn) btn.classList.add('active');

    renderCurrentPage();
}


/* ─── SEARCH ────────────────────────────────────────── */
function searchContent() {
    var query = document.getElementById('search-box');
    if (!query) return;
    var term = query.value.toLowerCase().trim();

    var items = document.querySelectorAll('.content-item');
    items.forEach(function(item) {
        var searchData = (item.getAttribute('data-search') || '').toLowerCase();
        item.style.display = searchData.indexOf(term) !== -1 ? '' : 'none';
    });
}


/* ─── RENDER DISPATCHER ─────────────────────────────── */
function renderCurrentPage() {
    var filtered = currentData;

    if (currentSubject !== 'All') {
        filtered = currentData.filter(function(item) {
            return item.subject && item.subject.toLowerCase() === currentSubject.toLowerCase();
        });
    }

    var container = document.getElementById('content-area');

    switch (currentPageType) {
        case 'videos':
            renderVideos(container, filtered);
            break;
        case 'live':
            renderLiveStreams(container, filtered);
            break;
        case 'materials':
            renderMaterials(container, filtered);
            break;
        case 'announcements':
            renderAnnouncements(container, filtered);
            break;
    }
}


/* ─── LOADING & ERROR STATES ────────────────────────── */
function showLoader(msg) {
    var container = document.getElementById('content-area');
    container.innerHTML = '<div class="loader" id="loader"><div class="spinner"></div><p>' + (msg || 'Loading...') + '</p></div>';
}

function showError(msg) {
    var container = document.getElementById('content-area');
    container.innerHTML =
        '<div class="error-state">' +
        '  <div class="empty-icon">⚠️</div>' +
        '  <p>' + (msg || 'Something went wrong') + '</p>' +
        '  <button class="retry-btn" onclick="location.reload()">Retry</button>' +
        '</div>';
}

function showEmpty(msg) {
    var container = document.getElementById('content-area');
    container.innerHTML =
        '<div class="empty-state">' +
        '  <div class="empty-icon">📭</div>' +
        '  <p>' + (msg || 'Nothing here yet.<br>Check back soon!') + '</p>' +
        '</div>';
}


/* ─── BADGE CLASS HELPER ────────────────────────────── */
function getBadgeClass(subject) {
    return SUBJECT_BADGE_CLASS[subject] || 'badge-default';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch(e) {
        return dateStr;
    }
}

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) +
               ' at ' +
               d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } catch(e) {
        return dateStr;
    }
}


/* ═══════════════════════════════════════════════════════
   RENDER: VIDEOS
   ═══════════════════════════════════════════════════════ */
function renderVideos(container, data) {
    if (!data || data.length === 0) {
        showEmpty('No lectures found for this subject.<br>Check back after class!');
        return;
    }

    var html = '';
    data.forEach(function(v, i) {
        var vid = extractVideoId(v.videoId || '');
        var thumb = getThumbUrl(vid);
        var ytLink = 'https://www.youtube.com/watch?v=' + vid;

        html +=
            '<div class="video-card content-item" data-search="' + (v.title + ' ' + v.subject).toLowerCase() + '" style="animation-delay:' + (i * 0.05) + 's">' +
            '  <a href="' + ytLink + '" target="_blank" rel="noopener" class="video-thumb">' +
            '    <img src="' + thumb + '" alt="' + (v.title || '') + '" loading="lazy">' +
            '    <div class="play-overlay"><div class="play-btn-icon">▶</div></div>' +
            '  </a>' +
            '  <div class="video-info">' +
            '    <span class="video-subject-badge ' + getBadgeClass(v.subject) + '">' + (v.subject || '') + '</span>' +
            '    <div class="video-title">' + (v.title || 'Untitled') + '</div>' +
            '    <div class="video-date">📅 ' + formatDate(v.date) + '</div>' +
            '  </div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   RENDER: LIVE STREAMS
   ═══════════════════════════════════════════════════════ */
function renderLiveStreams(container, data) {
    if (!data || data.length === 0) {
        showEmpty('No live classes scheduled yet.<br>Sagar Sir will add them soon!');
        return;
    }

    var html = '';
    data.forEach(function(l) {
        var vid = extractVideoId(l.videoId || '');
        var ytLink = 'https://www.youtube.com/watch?v=' + vid;
        var isLive = (l.isLive === true || l.isLive === 'TRUE' || l.isLive === 'true' || l.isLive === 'YES');

        html +=
            '<div class="live-card content-item ' + (isLive ? 'is-live-card' : '') + '" data-search="' + (l.title + ' ' + l.subject).toLowerCase() + '">' +
            '  <div class="live-indicator ' + (isLive ? 'is-live' : 'is-offline') + '">' +
            '    <span class="pulse-dot"></span> ' + (isLive ? 'LIVE NOW' : 'UPCOMING') +
            '  </div>' +
            '  <span class="video-subject-badge ' + getBadgeClass(l.subject) + '">' + (l.subject || '') + '</span>' +
            '  <h3 class="live-card-title">' + (l.title || 'Live Class') + '</h3>' +
            '  <p class="live-card-time">📅 ' + formatDateTime(l.scheduledTime) + '</p>';

        if (isLive) {
            html += '  <a href="' + ytLink + '" target="_blank" rel="noopener" class="join-btn">▶ &nbsp;Join Live Class</a>';
        } else {
            html += '  <button class="join-btn disabled" disabled>Not Started Yet</button>';
        }

        html += '</div>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   RENDER: STUDY MATERIALS
   ═══════════════════════════════════════════════════════ */
function renderMaterials(container, data) {
    if (!data || data.length === 0) {
        showEmpty('No study materials found.<br>Notes will appear here after upload!');
        return;
    }

    var html = '';
    data.forEach(function(m) {
        html +=
            '<a href="' + (m.driveLink || '#') + '" target="_blank" rel="noopener" ' +
            '   class="material-card content-item" data-search="' + (m.title + ' ' + m.subject).toLowerCase() + '">' +
            '  <div class="material-icon">📄</div>' +
            '  <div class="material-info">' +
            '    <div class="material-title">' + (m.title || 'Untitled') + '</div>' +
            '    <div class="material-meta">' +
            '      <span class="video-subject-badge ' + getBadgeClass(m.subject) + '" style="font-size:9px;padding:2px 10px;margin:0">' + (m.subject || '') + '</span>' +
            '      ' + (m.fileSize ? ' · ' + m.fileSize : '') +
            '      ' + (m.date ? ' · ' + formatDate(m.date) : '') +
            '    </div>' +
            '  </div>' +
            '  <div class="material-action">↗</div>' +
            '</a>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   RENDER: ANNOUNCEMENTS
   ═══════════════════════════════════════════════════════ */
function renderAnnouncements(container, data) {
    if (!data || data.length === 0) {
        showEmpty('No announcements yet.<br>Check back soon!');
        return;
    }

    var html = '';
    data.forEach(function(a, i) {
        var isImportant = (a.important === true || a.important === 'TRUE' || a.important === 'true' || a.important === 'YES');
        var badge = '';

        if (isImportant) {
            badge = '<span class="announcement-badge badge-important">⚠ Important</span> ';
        } else if (i === 0) {
            badge = '<span class="announcement-badge badge-new">✨ New</span> ';
        }

        html +=
            '<div class="announcement-card content-item ' + (isImportant ? 'important' : '') + '">' +
            '  <div class="announcement-date">' + badge + formatDate(a.date || a.timestamp) + '</div>' +
            '  <div class="announcement-title">' + (a.title || '') + '</div>' +
            '  <div class="announcement-text">' + (a.message || '') + '</div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   FETCH DATA FROM API
   ═══════════════════════════════════════════════════════ */
function fetchAndRender(sheetName, pageType, loadingMsg) {
    currentPageType = pageType;
    currentSubject = 'All';

    showLoader(loadingMsg);

    apiGet({ action: 'get', sheet: sheetName })
        .then(function(res) {
            if (res.status === 'success') {
                currentData = res.data || [];
                renderCurrentPage();
            } else {
                showError(res.message || 'Failed to load data');
            }
        })
        .catch(function(err) {
            showError('Network error. Check your internet connection.<br><small>' + err.message + '</small>');
        });
}


/* ═══════════════════════════════════════════════════════
   PAGE INITIALIZERS
   ═══════════════════════════════════════════════════════ */
function initHomePage() {
    // Set greeting
    var hour = new Date().getHours();
    var greeting = '';
    if (hour >= 5 && hour < 12)       greeting = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌙';
    else                               greeting = 'Happy Studying 🌟';

    var greetEl = document.getElementById('greeting');
    if (greetEl) greetEl.textContent = greeting;

    // Load counts from API
    apiGet({ action: 'counts' })
        .then(function(res) {
            if (res.status === 'success' && res.data) {
                var d = res.data;
                var sv = document.getElementById('stat-videos');
                var sn = document.getElementById('stat-notes');
                var su = document.getElementById('stat-updates');
                if (sv) sv.textContent = d.Videos || 0;
                if (sn) sn.textContent = d.StudyMaterial || 0;
                if (su) su.textContent = d.Announcements || 0;
            }
        })
        .catch(function() {
            /* Silently fail for counts */
        });

    // Check if any live stream is active
    apiGet({ action: 'get', sheet: 'LiveStreams' })
        .then(function(res) {
            if (res.status === 'success' && res.data) {
                var anyLive = res.data.some(function(l) {
                    return l.isLive === true || l.isLive === 'TRUE' || l.isLive === 'true';
                });
                var liveText = document.getElementById('live-home-status');
                if (liveText && anyLive) {
                    liveText.textContent = '🟢 Class is LIVE now!';
                    liveText.classList.add('live-active-text');
                }
            }
        })
        .catch(function() {});
}

function initVideosPage() {
    buildFilterPills();
    fetchAndRender('Videos', 'videos', 'Loading lectures...');
}

function initLivePage() {
    buildFilterPills();
    fetchAndRender('LiveStreams', 'live', 'Loading live classes...');
}

function initMaterialsPage() {
    buildFilterPills();
    fetchAndRender('StudyMaterial', 'materials', 'Loading study materials...');
}

function initAnnouncementsPage() {
    fetchAndRender('Announcements', 'announcements', 'Loading announcements...');
}


/* ═══════════════════════════════════════════════════════
   PWA INSTALL
   ═══════════════════════════════════════════════════════ */
var deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    var banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('hidden');
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function() {
            deferredPrompt = null;
            var banner = document.getElementById('install-banner');
            if (banner) banner.classList.add('hidden');
        });
    }
}


/* ═══════════════════════════════════════════════════════
   SERVICE WORKER
   ═══════════════════════════════════════════════════════ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function() { console.log('✅ SW registered'); })
            .catch(function(e) { console.log('❌ SW failed:', e); });
    });
}