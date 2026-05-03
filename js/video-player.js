/* =====================================================
   SHIKSHA WITH SAGAR — VIDEO PLAYER
   Updated with per-video PDF Notes support
   ===================================================== */

var playerSubject  = null;
var playerChapter  = null;
var playerContent  = null;
var currentVideoData  = null;
var currentVideoIndex = -1;


/* ═══════════════════════════════════════════════════════
   INITIALIZE
   ═══════════════════════════════════════════════════════ */
function initVideoPlayer() {

    var subjectId = getUrlParam('subject');
    var chapterId = getUrlParam('chapter');
    var videoId   = getUrlParam('video');

    if (!subjectId || !chapterId || !videoId) { showPlayerError(); return; }

    var user = getLoggedInUser();
    if (!user || user.role !== 'student') { window.location.replace('login.html'); return; }

    if (!checkStudentAccess(subjectId)) { showPlayerError(); return; }

    var resolved = resolveChapter(subjectId, chapterId);
    if (!resolved) { showPlayerError(); return; }

    playerSubject = resolved.subjectData;
    playerChapter = resolved.chapterData;
    playerContent = getChapterContent(chapterId);

    var videos = playerContent.videos || [];
    currentVideoIndex = -1;

    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === videoId) {
            currentVideoData  = videos[i];
            currentVideoIndex = i;
            break;
        }
    }

    if (!currentVideoData) { showPlayerError(); return; }

    document.documentElement.style.setProperty('--page-color',       playerSubject.color);
    document.documentElement.style.setProperty('--page-color-light', playerSubject.colorLight);

    loadVideoPlayer();
    renderVideoInfo();
    renderChapterBar();
    renderNotesButton();         // ← NEW: per-video notes button
    renderRelatedNotes();
    renderVideoNavigation();
    renderMoreVideos();
    setupBackButton();
}


/* ═══════════════════════════════════════════════════════
   LOAD YOUTUBE EMBED
   ═══════════════════════════════════════════════════════ */
function loadVideoPlayer() {
    var iframe  = document.getElementById('youtube-player');
    var loading = document.getElementById('player-loading');
    if (!iframe || !currentVideoData) return;

    var vid = extractVideoId(currentVideoData.videoId || '');

    var embedUrl =
        'https://www.youtube.com/embed/' + vid +
        '?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1' +
        '&origin=' + encodeURIComponent(window.location.origin);

    iframe.src = embedUrl;

    iframe.addEventListener('load', function () {
        if (loading) loading.classList.add('loaded');
    });

    setTimeout(function () {
        if (loading) loading.classList.add('loaded');
    }, 3000);
}


/* ═══════════════════════════════════════════════════════
   RENDER VIDEO INFO
   ═══════════════════════════════════════════════════════ */
function renderVideoInfo() {
    setText('video-title', currentVideoData.title || 'Untitled Video');
    setText('video-duration', currentVideoData.duration || '--:--');

    var dateEl = document.getElementById('video-date');
    if (dateEl) {
        dateEl.innerHTML = '<span class="meta-icon">📅</span> ' + formatDate(currentVideoData.date);
    }

    var badgeEl = document.getElementById('video-subject-badge');
    if (badgeEl) {
        badgeEl.textContent = playerSubject.name;
        badgeEl.style.background   = 'rgba(' + hexToRgb(playerSubject.color) + ', 0.15)';
        badgeEl.style.color        = lightenColor(playerSubject.color);
        badgeEl.style.borderColor  = 'rgba(' + hexToRgb(playerSubject.color) + ', 0.2)';
    }

    setText('topbar-icon',    playerSubject.icon);
    setText('topbar-subject', playerSubject.name);
    document.title = (currentVideoData.title || 'Video') + ' — Shiksha With Sagar';
}


/* ═══════════════════════════════════════════════════════
   CHAPTER BAR
   ═══════════════════════════════════════════════════════ */
function renderChapterBar() {
    setText('chapter-name', playerChapter.name);

    var viewAllBtn = document.getElementById('view-all-videos-btn');
    if (viewAllBtn) {
        viewAllBtn.href =
            'chapter-page.html?subject=' + playerSubject.id +
            '&chapter=' + playerChapter.id;
    }
}


/* ═══════════════════════════════════════════════════════
   ★ NOTES BUTTON — per-video PDF                        
   ═══════════════════════════════════════════════════════ */
function renderNotesButton() {
    var section = document.getElementById('video-notes-btn-section');
    if (!section) return;

    var pdfLink = (currentVideoData.notesPdfLink || '').trim();

    if (!pdfLink) {
        /* No notes for this video — hide the section */
        section.innerHTML = '';
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    /* Convert Drive share link to preview-friendly link */
    var viewLink = convertDriveLink(pdfLink, 'view');
    var embedLink = convertDriveLink(pdfLink, 'preview');

    section.innerHTML =
        '<div class="vnb-card">' +

        /* Header row */
        '  <div class="vnb-header">' +
        '    <div class="vnb-icon">📋</div>' +
        '    <div class="vnb-info">' +
        '      <p class="vnb-label">Smartboard Notes</p>' +
        '      <p class="vnb-title">Notes for this video</p>' +
        '    </div>' +
        '  </div>' +

        /* Action buttons row */
        '  <div class="vnb-actions">' +

        '    <a href="' + viewLink + '" target="_blank" rel="noopener" class="vnb-btn vnb-btn-primary">' +
        '      <span class="vnb-btn-icon">📄</span>' +
        '      <span>View Notes</span>' +
        '    </a>' +

        '    <button class="vnb-btn vnb-btn-secondary" onclick="openPdfPreview(\'' + encodeURIComponent(embedLink) + '\')">' +
        '      <span class="vnb-btn-icon">🔍</span>' +
        '      <span>Preview</span>' +
        '    </button>' +

        '    <a href="' + convertDriveLink(pdfLink, 'download') + '" target="_blank" rel="noopener" class="vnb-btn vnb-btn-ghost">' +
        '      <span class="vnb-btn-icon">⬇</span>' +
        '      <span>Download</span>' +
        '    </a>' +

        '  </div>' +
        '</div>';
}


/* ─── Google Drive link converter ─────────────────── */
function convertDriveLink(url, mode) {
    if (!url) return '#';

    /* Extract file ID from various Drive URL formats */
    var fileId = '';
    var patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /open\?id=([a-zA-Z0-9_-]+)/
    ];

    for (var i = 0; i < patterns.length; i++) {
        var m = url.match(patterns[i]);
        if (m) { fileId = m[1]; break; }
    }

    if (!fileId) return url; /* return original if can't parse */

    switch (mode) {
        case 'view':     return 'https://drive.google.com/file/d/' + fileId + '/view';
        case 'preview':  return 'https://drive.google.com/file/d/' + fileId + '/preview';
        case 'download': return 'https://drive.google.com/uc?export=download&id=' + fileId;
        default:         return 'https://drive.google.com/file/d/' + fileId + '/view';
    }
}


/* ─── In-app PDF preview overlay ─────────────────── */
function openPdfPreview(encodedUrl) {
    var url = decodeURIComponent(encodedUrl);
    var existing = document.getElementById('pdf-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'pdf-overlay';
    overlay.className = 'pdf-overlay';
    overlay.innerHTML =
        '<div class="pdf-overlay-inner">' +
        '  <div class="pdf-overlay-header">' +
        '    <h3>📋 Smartboard Notes</h3>' +
        '    <button class="pdf-close-btn" onclick="closePdfPreview()">✕</button>' +
        '  </div>' +
        '  <div class="pdf-frame-wrapper">' +
        '    <div class="pdf-loading">' +
        '      <div class="pdf-spinner"></div>' +
        '      <p>Loading notes...</p>' +
        '    </div>' +
        '    <iframe' +
        '      src="' + url + '"' +
        '      class="pdf-iframe"' +
        '      frameborder="0"' +
        '      allowfullscreen' +
        '      onload="this.previousElementSibling.style.display=\'none\'"' +
        '    ></iframe>' +
        '  </div>' +
        '  <div class="pdf-overlay-footer">' +
        '    <a href="' + url + '" target="_blank" class="pdf-open-full">Open Full Screen ↗</a>' +
        '  </div>' +
        '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(function () {
        overlay.classList.add('open');
    });
}

function closePdfPreview() {
    var overlay = document.getElementById('pdf-overlay');
    if (overlay) {
        overlay.classList.remove('open');
        setTimeout(function () {
            overlay.remove();
            document.body.style.overflow = '';
        }, 350);
    }
}


/* ═══════════════════════════════════════════════════════
   CHAPTER-LEVEL RELATED NOTES (existing study material)
   ═══════════════════════════════════════════════════════ */
function renderRelatedNotes() {
    var container = document.getElementById('notes-list');
    if (!container) return;

    var notes = playerContent.studyMaterial || [];

    if (notes.length === 0) {
        container.innerHTML = '<p class="no-notes-msg">No additional notes for this chapter.</p>';
        return;
    }

    var html = '';
    notes.forEach(function (n) {
        html +=
            '<a href="' + (n.driveLink || '#') + '" target="_blank" rel="noopener" class="note-card">' +
            '  <div class="note-card-icon">📄</div>' +
            '  <div class="note-card-info">' +
            '    <div class="note-card-title">' + (n.title || 'Untitled') + '</div>' +
            '    <div class="note-card-meta">' +
            (n.fileSize ? n.fileSize : '') +
            (n.date ? ' • ' + formatDate(n.date) : '') +
            '    </div>' +
            '  </div>' +
            '  <div class="note-card-action">⬇</div>' +
            '</a>';
    });
    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   PREV / NEXT NAVIGATION
   ═══════════════════════════════════════════════════════ */
function renderVideoNavigation() {
    var videos  = playerContent.videos || [];
    var prevBtn = document.getElementById('btn-prev');
    var nextBtn = document.getElementById('btn-next');

    if (currentVideoIndex > 0) {
        setText('prev-title', videos[currentVideoIndex - 1].title);
        if (prevBtn) prevBtn.disabled = false;
    } else {
        setText('prev-title', '—');
        if (prevBtn) prevBtn.disabled = true;
    }

    if (currentVideoIndex < videos.length - 1) {
        setText('next-title', videos[currentVideoIndex + 1].title);
        if (nextBtn) nextBtn.disabled = false;
    } else {
        setText('next-title', '—');
        if (nextBtn) nextBtn.disabled = true;
    }
}

function goToPrevVideo() {
    var videos = playerContent.videos || [];
    if (currentVideoIndex > 0) navigateToVideo(videos[currentVideoIndex - 1].id);
}

function goToNextVideo() {
    var videos = playerContent.videos || [];
    if (currentVideoIndex < videos.length - 1) navigateToVideo(videos[currentVideoIndex + 1].id);
}


/* ═══════════════════════════════════════════════════════
   MORE VIDEOS LIST
   ═══════════════════════════════════════════════════════ */
function renderMoreVideos() {
    var container = document.getElementById('more-videos-list');
    if (!container) return;

    var videos = playerContent.videos || [];
    if (videos.length <= 1) {
        var sec = document.getElementById('more-videos-section');
        if (sec) sec.classList.add('hidden');
        return;
    }

    var html = '';
    videos.forEach(function (v, i) {
        var isPlaying = (v.id === currentVideoData.id);
        var hasNotes  = !!(v.notesPdfLink && v.notesPdfLink.trim());

        html +=
            '<div class="more-video-item ' + (isPlaying ? 'now-playing' : '') +
            '" onclick="navigateToVideo(\'' + v.id + '\')">' +
            '  <div class="more-video-num">' +
            '    <span class="num-text">' + (i + 1) + '</span>' +
            '    <span class="now-playing-icon">' +
            '      <div class="playing-bars"><span></span><span></span><span></span><span></span></div>' +
            '    </span>' +
            '  </div>' +
            '  <div class="more-video-info">' +
            '    <div class="more-video-title">' + (v.title || 'Untitled') + '</div>' +
            '    <div class="more-video-meta">' +
            (v.duration || '') +
            ' • ' + formatDate(v.date) +
            (hasNotes ? ' <span class="notes-pill">📋 Notes</span>' : '') +
            '    </div>' +
            '  </div>' +
            '  <div class="more-video-play">' + (isPlaying ? '🔊' : '▶') + '</div>' +
            '</div>';
    });
    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   NAVIGATE TO ANOTHER VIDEO
   ═══════════════════════════════════════════════════════ */
function navigateToVideo(videoId) {
    if (currentVideoData && videoId === currentVideoData.id) return;

    var newUrl =
        'video-player.html?subject=' + playerSubject.id +
        '&chapter=' + playerChapter.id +
        '&video=' + videoId;

    window.history.pushState({}, '', newUrl);

    var videos = playerContent.videos || [];
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === videoId) {
            currentVideoData  = videos[i];
            currentVideoIndex = i;
            break;
        }
    }

    var loading = document.getElementById('player-loading');
    if (loading) loading.classList.remove('loaded');

    loadVideoPlayer();
    renderVideoInfo();
    renderNotesButton();          // ← refresh notes button for new video
    renderVideoNavigation();
    renderMoreVideos();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ═══════════════════════════════════════════════════════
   BACK BUTTON
   ═══════════════════════════════════════════════════════ */
function setupBackButton() {
    var backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.href =
            'chapter-page.html?subject=' + playerSubject.id +
            '&chapter=' + playerChapter.id;
    }
}

window.addEventListener('popstate', function () {
    var videoId = getUrlParam('video');
    if (videoId && playerContent) {
        var videos = playerContent.videos || [];
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].id === videoId) {
                currentVideoData  = videos[i];
                currentVideoIndex = i;
                break;
            }
        }
        var loading = document.getElementById('player-loading');
        if (loading) loading.classList.remove('loaded');
        loadVideoPlayer();
        renderVideoInfo();
        renderNotesButton();
        renderVideoNavigation();
        renderMoreVideos();
    }
});


/* ═══════════════════════════════════════════════════════
   ERROR STATE
   ═══════════════════════════════════════════════════════ */
function showPlayerError() {
    var container = document.getElementById('player-container');
    var topbar    = document.getElementById('player-topbar');
    var error     = document.getElementById('player-error');
    if (container) container.classList.add('hidden');
    if (topbar)    topbar.classList.add('hidden');
    if (error)     error.classList.remove('hidden');
}


/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

function hexToRgb(hex) {
    if (!hex) return '67, 97, 238';
    hex = hex.replace('#', '');
    return parseInt(hex.substring(0,2),16) + ', ' +
           parseInt(hex.substring(2,4),16) + ', ' +
           parseInt(hex.substring(4,6),16);
}

function lightenColor(hex) {
    if (!hex) return '#7b9cff';
    var num = parseInt(hex.replace('#',''), 16);
    var r = Math.min(((num>>16)&0xFF)+80, 255);
    var g = Math.min(((num>>8) &0xFF)+80, 255);
    var b = Math.min(( num     &0xFF)+80, 255);
    return '#' + ((r<<16)|(g<<8)|b).toString(16).padStart(6,'0');
}

/* Keyboard shortcuts */
document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goToPrevVideo(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goToNextVideo(); }
    if (e.key === 'Escape') {
        var overlay = document.getElementById('pdf-overlay');
        if (overlay) { closePdfPreview(); return; }
        var backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.click();
    }
});