/* =====================================================
   SHIKSHA WITH SAGAR — CONTENT PAGES LOGIC
   Handles subject-page.html and chapter-page.html
   ===================================================== */


/* ═══════════════════════════════════════════════════════
   SUBJECT PAGE
   URL: subject-page.html?id=physics-11
   ═══════════════════════════════════════════════════════ */

function initSubjectPage() {

    var subjectId = getUrlParam('id');
    if (!subjectId) {
        window.location.replace('student-dashboard.html');
        return;
    }

    // Auth check
    var user = getLoggedInUser();
    if (!user || user.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    // Access check
    if (!checkStudentAccess(subjectId)) {
        document.getElementById('page-body').innerHTML =
            '<div class="access-denied">' +
            '  <div class="denied-icon">🔒</div>' +
            '  <h3>Access Denied</h3>' +
            '  <p>You do not have access to this subject.<br>Contact Sagar Sir for access.</p>' +
            '  <a href="student-dashboard.html" class="back-btn-link">← Back to Dashboard</a>' +
            '</div>';
        return;
    }

    // Resolve data
    var resolved = resolveSubject(subjectId);
    if (!resolved) {
        window.location.replace('student-dashboard.html');
        return;
    }

    var subject = resolved.subjectData;
    var classData = resolved.classData;
    var streamData = resolved.streamData;

    // Set page colors
    document.documentElement.style.setProperty('--page-color', subject.color);
    document.documentElement.style.setProperty('--page-color-light', subject.colorLight);
    document.documentElement.style.setProperty('--page-color-dark', darkenColor(subject.color));

    // Set header
    var header = document.getElementById('subject-header');
    if (header) {
        header.style.background = 'linear-gradient(155deg, ' + subject.color + ' 0%, ' + darkenColor(subject.color) + ' 100%)';
    }

    // Set info
    setText('subject-icon', subject.icon);
    setText('subject-name', subject.name);
    setText('subject-class-name', classData.name + ' • ' + streamData.name);
    setText('subject-desc', subject.description || '');

    // Counts
    var totalChapters = subject.chapters ? subject.chapters.length : 0;
    var totalVideos = 0;
    var totalNotes = 0;

    if (subject.chapters) {
        subject.chapters.forEach(function (ch) {
            var content = getChapterContent(ch.id);
            totalVideos += content.videos.length;
            totalNotes += content.studyMaterial.length;
        });
    }

    setText('total-chapters', totalChapters);
    setText('total-videos', totalVideos);
    setText('total-notes', totalNotes);

    // Render chapters
    renderSubjectChapters(subject);
}


function renderSubjectChapters(subject) {
    var container = document.getElementById('chapters-container');
    if (!container) return;

    if (!subject.chapters || subject.chapters.length === 0) {
        container.innerHTML =
            '<div class="empty-box">' +
            '  <span class="empty-big-icon">📭</span>' +
            '  <p class="empty-text">No chapters added yet.</p>' +
            '  <p class="empty-sub-text">Sagar Sir will add them soon!</p>' +
            '</div>';
        return;
    }

    var html = '';
    subject.chapters.forEach(function (ch, index) {
        var content = getChapterContent(ch.id);
        var videoCount = content.videos.length;
        var noteCount = content.studyMaterial.length;
        var liveCount = content.liveStreams.length;
        var hasLive = content.liveStreams.some(function (l) {
            return l.isLive === true || l.isLive === 'true' || l.isLive === 'TRUE';
        });

        html +=
            '<a href="chapter-page.html?subject=' + subject.id + '&chapter=' + ch.id + '" ' +
            '   class="ch-card" style="animation-delay:' + (index * 0.06) + 's">' +
            '  <div class="ch-card-left">' +
            '    <div class="ch-number"><span>' + (index + 1) + '</span></div>' +
            '  </div>' +
            '  <div class="ch-card-middle">' +
            '    <h4 class="ch-title">' + ch.name + '</h4>' +
            '    <p class="ch-desc">' + (ch.description || '') + '</p>' +
            '    <div class="ch-tags">' +
            '      <span class="ch-tag">🎥 ' + videoCount + '</span>' +
            '      <span class="ch-tag">📄 ' + noteCount + '</span>' +
            (liveCount > 0 ? '<span class="ch-tag tag-live">' + (hasLive ? '🟢 LIVE' : '📅 ' + liveCount) + '</span>' : '') +
            '    </div>' +
            '  </div>' +
            '  <div class="ch-card-right">›</div>' +
            '</a>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   CHAPTER PAGE
   URL: chapter-page.html?subject=physics-11&chapter=phy-11-ch1
   ═══════════════════════════════════════════════════════ */

var currentTab = 'videos';

function initChapterPage() {

    var subjectId = getUrlParam('subject');
    var chapterId = getUrlParam('chapter');

    if (!subjectId || !chapterId) {
        window.location.replace('student-dashboard.html');
        return;
    }

    var user = getLoggedInUser();
    if (!user || user.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    if (!checkStudentAccess(subjectId)) {
        document.getElementById('page-body').innerHTML =
            '<div class="access-denied">' +
            '  <div class="denied-icon">🔒</div>' +
            '  <h3>Access Denied</h3>' +
            '  <p>You do not have access to this chapter.</p>' +
            '  <a href="student-dashboard.html" class="back-btn-link">← Back to Dashboard</a>' +
            '</div>';
        return;
    }

    var resolved = resolveChapter(subjectId, chapterId);
    if (!resolved) {
        window.location.replace('subject-page.html?id=' + subjectId);
        return;
    }

    var subject = resolved.subjectData;
    var chapter = resolved.chapterData;
    var content = getChapterContent(chapterId);

    // Set page color
    document.documentElement.style.setProperty('--page-color', subject.color);
    document.documentElement.style.setProperty('--page-color-light', subject.colorLight);
    document.documentElement.style.setProperty('--page-color-dark', darkenColor(subject.color));

    // Header
    var header = document.getElementById('chapter-header');
    if (header) {
        header.style.background = 'linear-gradient(155deg, ' + subject.color + ' 0%, ' + darkenColor(subject.color) + ' 100%)';
    }

    // Set back link
    var backLink = document.getElementById('back-link');
    if (backLink) {
        backLink.href = 'subject-page.html?id=' + subjectId;
    }

    // Info
    setText('ch-icon', subject.icon);
    setText('ch-name', chapter.name);
    setText('ch-subject-name', subject.name + ' • ' + resolved.classData.name);
    setText('ch-description', chapter.description || '');

    // Tab counts
    setText('tab-videos-count', content.videos.length);
    setText('tab-live-count', content.liveStreams.length);
    setText('tab-notes-count', content.studyMaterial.length);

    // Stats
    setText('ch-stat-videos', content.videos.length);
    setText('ch-stat-live', content.liveStreams.length);
    setText('ch-stat-notes', content.studyMaterial.length);

    // Check for live indicator
    var hasLive = content.liveStreams.some(function (l) {
        return l.isLive === true || l.isLive === 'true';
    });
    var liveDot = document.getElementById('live-dot');
    if (liveDot && hasLive) {
        liveDot.classList.remove('hidden');
    }

    // Store content globally
    window._chapterContent = content;
    window._subjectData = subject;

    // Show default tab
    switchTab('videos');
}


/* ─── TAB SWITCHING ──────────────────────────── */
function switchTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.content-tab').forEach(function (t) {
        t.classList.remove('active');
    });
    var activeTab = document.querySelector('.content-tab[data-tab="' + tabName + '"]');
    if (activeTab) activeTab.classList.add('active');

    // Render content
    var container = document.getElementById('tab-content');
    var content = window._chapterContent || { videos: [], liveStreams: [], studyMaterial: [] };

    switch (tabName) {
        case 'videos':
            renderVideosList(container, content.videos);
            break;
        case 'live':
            renderLiveList(container, content.liveStreams);
            break;
        case 'notes':
            renderNotesList(container, content.studyMaterial);
            break;
    }
}


/* ─── RENDER VIDEOS ──────────────────────────── */
function renderVideosList(container, videos) {
    if (!videos || videos.length === 0) {
        container.innerHTML = emptyState('🎬', 'No videos uploaded yet', 'Videos will appear here once Sagar Sir uploads them.');
        return;
    }

    var html = '';
    videos.forEach(function (v, i) {
        var vid = extractVideoId(v.videoId || '');
        var thumb = 'https://img.youtube.com/vi/' + vid + '/hqdefault.jpg';
        var ytLink = 'https://www.youtube.com/watch?v=' + vid;

        html +=
            '<a href="' + ytLink + '" target="_blank" rel="noopener" ' +
            '   class="video-item" style="animation-delay:' + (i * 0.05) + 's">' +
            '  <div class="video-thumb">' +
            '    <img src="' + thumb + '" alt="' + (v.title || '') + '" loading="lazy">' +
            '    <div class="video-play"><div class="play-circle">▶</div></div>' +
            '    <div class="video-duration">' + (v.duration || '') + '</div>' +
            '  </div>' +
            '  <div class="video-details">' +
            '    <h4 class="video-title">' + (v.title || 'Untitled Video') + '</h4>' +
            '    <p class="video-meta">📅 ' + formatDate(v.date) + '</p>' +
            '  </div>' +
            '</a>';
    });

    container.innerHTML = html;
}


/* ─── RENDER LIVE STREAMS ────────────────────── */
function renderLiveList(container, streams) {
    if (!streams || streams.length === 0) {
        container.innerHTML = emptyState('📡', 'No live classes scheduled', 'Live sessions will appear here when Sagar Sir schedules them.');
        return;
    }

    var html = '';
    streams.forEach(function (l, i) {
        var vid = extractVideoId(l.videoId || '');
        var ytLink = 'https://www.youtube.com/watch?v=' + vid;
        var isLive = (l.isLive === true || l.isLive === 'true' || l.isLive === 'TRUE');

        html +=
            '<div class="live-item ' + (isLive ? 'live-now' : '') + '" style="animation-delay:' + (i * 0.06) + 's">' +
            '  <div class="live-status-badge ' + (isLive ? 'badge-live' : 'badge-upcoming') + '">' +
            '    <span class="status-dot"></span>' +
            '    ' + (isLive ? 'LIVE NOW' : 'UPCOMING') +
            '  </div>' +
            '  <h4 class="live-title">' + (l.title || 'Live Class') + '</h4>' +
            '  <p class="live-time">📅 ' + formatDateTime(l.scheduledTime) + '</p>' +
            (isLive
                ? '<a href="' + ytLink + '" target="_blank" class="join-live-btn">▶ Join Live Class</a>'
                : '<button class="join-live-btn btn-disabled" disabled>Not Started Yet</button>'
            ) +
            '</div>';
    });

    container.innerHTML = html;
}


/* ─── RENDER NOTES ───────────────────────────── */
function renderNotesList(container, notes) {
    if (!notes || notes.length === 0) {
        container.innerHTML = emptyState('📝', 'No notes uploaded yet', 'PDF notes will appear here once Sagar Sir uploads them.');
        return;
    }

    var html = '';
    notes.forEach(function (n, i) {
        html +=
            '<a href="' + (n.driveLink || '#') + '" target="_blank" rel="noopener" ' +
            '   class="note-item" style="animation-delay:' + (i * 0.05) + 's">' +
            '  <div class="note-icon-box">📄</div>' +
            '  <div class="note-details">' +
            '    <h4 class="note-title">' + (n.title || 'Untitled') + '</h4>' +
            '    <p class="note-meta">' +
            (n.fileSize ? n.fileSize + ' • ' : '') +
            formatDate(n.date) +
            '    </p>' +
            '  </div>' +
            '  <div class="note-download">⬇</div>' +
            '</a>';
    });

    container.innerHTML = html;
}


/* ─── EMPTY STATE BUILDER ────────────────────── */
function emptyState(icon, title, sub) {
    return '<div class="empty-box">' +
        '<span class="empty-big-icon">' + icon + '</span>' +
        '<p class="empty-text">' + title + '</p>' +
        '<p class="empty-sub-text">' + sub + '</p>' +
        '</div>';
}


/* ─── SET TEXT HELPER ────────────────────────── */
function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}