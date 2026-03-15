/* =====================================================
   SHIKSHA WITH SAGAR — VIDEO PLAYER PAGE
   
   URL format:
   video-player.html?subject=physics-11&chapter=phy-11-ch1&video=v1
   
   Reads data from app-data.js (must be loaded first)
   ===================================================== */


/* ─── GLOBAL STATE ───────────────────────────────── */
var playerSubject = null;
var playerChapter = null;
var playerContent = null;
var currentVideoData = null;
var currentVideoIndex = -1;


/* ═══════════════════════════════════════════════════════
   INITIALIZE VIDEO PLAYER
   ═══════════════════════════════════════════════════════ */
function initVideoPlayer() {

    // 1. Get URL parameters
    var subjectId = getUrlParam('subject');
    var chapterId = getUrlParam('chapter');
    var videoId   = getUrlParam('video');

    if (!subjectId || !chapterId || !videoId) {
        showPlayerError();
        return;
    }

    // 2. Auth check
    var user = getLoggedInUser();
    if (!user || user.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    // 3. Access check
    if (!checkStudentAccess(subjectId)) {
        showPlayerError();
        return;
    }

    // 4. Resolve data
    var resolved = resolveChapter(subjectId, chapterId);
    if (!resolved) {
        showPlayerError();
        return;
    }

    playerSubject = resolved.subjectData;
    playerChapter = resolved.chapterData;
    playerContent = getChapterContent(chapterId);

    // 5. Find the specific video
    var videos = playerContent.videos || [];
    currentVideoIndex = -1;

    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === videoId) {
            currentVideoData = videos[i];
            currentVideoIndex = i;
            break;
        }
    }

    if (!currentVideoData) {
        showPlayerError();
        return;
    }

    // 6. Set page color from subject
    document.documentElement.style.setProperty('--page-color', playerSubject.color);
    document.documentElement.style.setProperty('--page-color-light', playerSubject.colorLight);

    // 7. Render everything
    loadVideoPlayer();
    renderVideoInfo();
    renderChapterBar();
    renderRelatedNotes();
    renderVideoNavigation();
    renderMoreVideos();
    setupBackButton();
}


/* ═══════════════════════════════════════════════════════
   LOAD YOUTUBE PLAYER
   ═══════════════════════════════════════════════════════ */
function loadVideoPlayer() {
    var iframe = document.getElementById('youtube-player');
    var loading = document.getElementById('player-loading');

    if (!iframe || !currentVideoData) return;

    var vid = extractVideoId(currentVideoData.videoId || '');

    // Build embed URL with parameters
    var embedUrl = 'https://www.youtube.com/embed/' + vid + '?' +
        'autoplay=1' +
        '&rel=0' +                // Don't show unrelated videos at end
        '&modestbranding=1' +     // Minimal YouTube branding
        '&playsinline=1' +        // Play inline on mobile (don't go fullscreen)
        '&enablejsapi=1' +        // Enable JS control
        '&origin=' + encodeURIComponent(window.location.origin);

    iframe.src = embedUrl;

    // Hide loading overlay when iframe loads
    iframe.addEventListener('load', function () {
        if (loading) {
            loading.classList.add('loaded');
        }
    });

    // Fallback: hide loading after 3 seconds anyway
    setTimeout(function () {
        if (loading) {
            loading.classList.add('loaded');
        }
    }, 3000);
}


/* ═══════════════════════════════════════════════════════
   RENDER VIDEO INFO
   ═══════════════════════════════════════════════════════ */
function renderVideoInfo() {
    // Title
    setText('video-title', currentVideoData.title || 'Untitled Video');

    // Duration
    setText('video-duration', currentVideoData.duration || '--:--');

    // Date
    var dateEl = document.getElementById('video-date');
    if (dateEl) {
        dateEl.innerHTML = '<span class="meta-icon">📅</span> ' + formatDate(currentVideoData.date);
    }

    // Subject badge
    var badgeEl = document.getElementById('video-subject-badge');
    if (badgeEl) {
        badgeEl.textContent = playerSubject.name;
        badgeEl.style.background = 'rgba(' + hexToRgb(playerSubject.color) + ', 0.15)';
        badgeEl.style.color = lightenColor(playerSubject.color);
        badgeEl.style.borderColor = 'rgba(' + hexToRgb(playerSubject.color) + ', 0.2)';
    }

    // Topbar
    setText('topbar-icon', playerSubject.icon);
    setText('topbar-subject', playerSubject.name);

    // Page title
    document.title = currentVideoData.title + ' — Shiksha With Sagar';
}


/* ═══════════════════════════════════════════════════════
   RENDER CHAPTER INFO BAR
   ═══════════════════════════════════════════════════════ */
function renderChapterBar() {
    setText('chapter-name', playerChapter.name);

    var viewAllBtn = document.getElementById('view-all-videos-btn');
    if (viewAllBtn) {
        viewAllBtn.href = 'chapter-page.html?subject=' + playerSubject.id + '&chapter=' + playerChapter.id;
    }
}


/* ═══════════════════════════════════════════════════════
   RENDER RELATED NOTES (PDFs for this chapter)
   ═══════════════════════════════════════════════════════ */
function renderRelatedNotes() {
    var container = document.getElementById('notes-list');
    var section = document.getElementById('notes-section');
    if (!container) return;

    var notes = playerContent.studyMaterial || [];

    if (notes.length === 0) {
        container.innerHTML = '<p class="no-notes-msg">No notes available for this chapter yet.</p>';
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
   RENDER PREV / NEXT NAVIGATION
   ═══════════════════════════════════════════════════════ */
function renderVideoNavigation() {
    var videos = playerContent.videos || [];
    var prevBtn = document.getElementById('btn-prev');
    var nextBtn = document.getElementById('btn-next');

    // Previous video
    if (currentVideoIndex > 0) {
        var prevVideo = videos[currentVideoIndex - 1];
        setText('prev-title', prevVideo.title);
        if (prevBtn) prevBtn.disabled = false;
    } else {
        setText('prev-title', '—');
        if (prevBtn) prevBtn.disabled = true;
    }

    // Next video
    if (currentVideoIndex < videos.length - 1) {
        var nextVideo = videos[currentVideoIndex + 1];
        setText('next-title', nextVideo.title);
        if (nextBtn) nextBtn.disabled = false;
    } else {
        setText('next-title', '—');
        if (nextBtn) nextBtn.disabled = true;
    }
}


function goToPrevVideo() {
    var videos = playerContent.videos || [];
    if (currentVideoIndex > 0) {
        navigateToVideo(videos[currentVideoIndex - 1].id);
    }
}

function goToNextVideo() {
    var videos = playerContent.videos || [];
    if (currentVideoIndex < videos.length - 1) {
        navigateToVideo(videos[currentVideoIndex + 1].id);
    }
}


/* ═══════════════════════════════════════════════════════
   RENDER MORE VIDEOS IN THIS CHAPTER
   ═══════════════════════════════════════════════════════ */
function renderMoreVideos() {
    var container = document.getElementById('more-videos-list');
    if (!container) return;

    var videos = playerContent.videos || [];

    if (videos.length <= 1) {
        var section = document.getElementById('more-videos-section');
        if (section) section.classList.add('hidden');
        return;
    }

    var html = '';
    videos.forEach(function (v, i) {
        var isPlaying = (v.id === currentVideoData.id);

        html +=
            '<div class="more-video-item ' + (isPlaying ? 'now-playing' : '') + '" ' +
            '     onclick="navigateToVideo(\'' + v.id + '\')">' +
            '  <div class="more-video-num">' +
            '    <span class="num-text">' + (i + 1) + '</span>' +
            '    <span class="now-playing-icon">' +
            '      <div class="playing-bars"><span></span><span></span><span></span><span></span></div>' +
            '    </span>' +
            '  </div>' +
            '  <div class="more-video-info">' +
            '    <div class="more-video-title">' + (v.title || 'Untitled') + '</div>' +
            '    <div class="more-video-meta">' + (v.duration || '') + ' • ' + formatDate(v.date) + '</div>' +
            '  </div>' +
            '  <div class="more-video-play">' + (isPlaying ? '🔊' : '▶') + '</div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   NAVIGATE TO DIFFERENT VIDEO (without full page reload)
   ═══════════════════════════════════════════════════════ */
function navigateToVideo(videoId) {
    if (videoId === currentVideoData.id) return; // Already playing

    // Update URL without reloading
    var newUrl = 'video-player.html?subject=' + playerSubject.id +
                 '&chapter=' + playerChapter.id +
                 '&video=' + videoId;

    window.history.pushState({}, '', newUrl);

    // Find new video
    var videos = playerContent.videos || [];
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === videoId) {
            currentVideoData = videos[i];
            currentVideoIndex = i;
            break;
        }
    }

    // Show loading again
    var loading = document.getElementById('player-loading');
    if (loading) loading.classList.remove('loaded');

    // Re-render everything
    loadVideoPlayer();
    renderVideoInfo();
    renderVideoNavigation();
    renderMoreVideos();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ═══════════════════════════════════════════════════════
   BACK BUTTON SETUP
   ═══════════════════════════════════════════════════════ */
function setupBackButton() {
    var backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.href = 'chapter-page.html?subject=' + playerSubject.id + '&chapter=' + playerChapter.id;
    }
}

// Handle browser back button
window.addEventListener('popstate', function () {
    // Re-initialize with new URL params
    var videoId = getUrlParam('video');
    if (videoId && playerContent) {
        var videos = playerContent.videos || [];
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].id === videoId) {
                currentVideoData = videos[i];
                currentVideoIndex = i;
                break;
            }
        }
        var loading = document.getElementById('player-loading');
        if (loading) loading.classList.remove('loaded');
        loadVideoPlayer();
        renderVideoInfo();
        renderVideoNavigation();
        renderMoreVideos();
    }
});


/* ═══════════════════════════════════════════════════════
   ERROR STATE
   ═══════════════════════════════════════════════════════ */
function showPlayerError() {
    var container = document.getElementById('player-container');
    var topbar = document.getElementById('player-topbar');
    var error = document.getElementById('player-error');

    if (container) container.classList.add('hidden');
    if (topbar) topbar.classList.add('hidden');
    if (error) error.classList.remove('hidden');
}


/* ═══════════════════════════════════════════════════════
   COLOR HELPERS
   ═══════════════════════════════════════════════════════ */
function hexToRgb(hex) {
    if (!hex) return '67, 97, 238';
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return r + ', ' + g + ', ' + b;
}

function lightenColor(hex) {
    if (!hex) return '#7b9cff';
    var num = parseInt(hex.replace('#', ''), 16);
    var r = Math.min(((num >> 16) & 0xFF) + 80, 255);
    var g = Math.min(((num >> 8) & 0xFF) + 80, 255);
    var b = Math.min((num & 0xFF) + 80, 255);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}


/* ─── KEYBOARD SHORTCUTS ─────────────────────── */
document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            goToPrevVideo();
            break;
        case 'ArrowRight':
            e.preventDefault();
            goToNextVideo();
            break;
        case 'Escape':
            var backBtn = document.getElementById('back-btn');
            if (backBtn) backBtn.click();
            break;
    }
});