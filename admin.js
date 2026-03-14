/* =====================================================
   SHIKSHA WITH SAGAR — ADMIN PANEL SCRIPT
   ===================================================== */

/* ─── AUTH CHECK ────────────────────────────────────── */
function getAdminPassword() {
    return sessionStorage.getItem('sws_admin') || '';
}

function adminLogout() {
    sessionStorage.removeItem('sws_admin');
    window.location.href = 'login.html';
}


/* ─── TOAST NOTIFICATIONS ───────────────────────────── */
function showToast(message, type) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + (type || 'success');
    toast.classList.remove('hidden');

    setTimeout(function() {
        toast.classList.add('hidden');
    }, 3500);
}


/* ─── TAB SWITCHING ─────────────────────────────────── */
function switchAdminTab(tabName, btn) {
    document.querySelectorAll('.admin-section').forEach(function(s) {
        s.classList.remove('active');
    });
    document.querySelectorAll('.admin-tab').forEach(function(t) {
        t.classList.remove('active');
    });

    document.getElementById('tab-' + tabName).classList.add('active');
    if (btn) btn.classList.add('active');

    loadAdminData(tabName);
}


/* ─── LOAD ADMIN DATA ───────────────────────────────── */
function loadAdminData(tabName) {
    var sheetMap = {
        'videos': 'Videos',
        'live': 'LiveStreams',
        'materials': 'StudyMaterial',
        'announcements': 'Announcements'
    };

    var listId = 'admin-' + tabName + '-list';
    var listEl = document.getElementById(listId);
    if (!listEl) return;

    listEl.innerHTML = '<div class="loader"><div class="spinner"></div><p>Loading...</p></div>';

    apiGet({ action: 'get', sheet: sheetMap[tabName] })
        .then(function(res) {
            if (res.status === 'success') {
                renderAdminList(tabName, listEl, res.data || []);
            } else {
                listEl.innerHTML = '<div class="error-state"><p>' + res.message + '</p></div>';
            }
        })
        .catch(function(err) {
            listEl.innerHTML = '<div class="error-state"><p>Network error: ' + err.message + '</p></div>';
        });
}


/* ─── RENDER ADMIN LIST ─────────────────────────────── */
function renderAdminList(tabName, container, data) {
    if (data.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>No items yet</p></div>';
        return;
    }

    var html = '';

    data.forEach(function(item) {
        var title = item.title || 'Untitled';
        var meta = '';
        var extraBtns = '';

        switch (tabName) {
            case 'videos':
                meta = (item.subject || '') + ' · ' + formatDate(item.date);
                break;
            case 'live':
                var isLive = (item.isLive === true || item.isLive === 'TRUE' || item.isLive === 'true');
                meta = (item.subject || '') + ' · ' + formatDateTime(item.scheduledTime) + ' · ' + (isLive ? '🟢 LIVE' : '⚫ Offline');
                if (isLive) {
                    extraBtns = '<button class="btn-toggle-live btn-end-live" onclick="toggleLiveStream(\'' + item.id + '\', false)">End Live</button>';
                } else {
                    extraBtns = '<button class="btn-toggle-live btn-go-live" onclick="toggleLiveStream(\'' + item.id + '\', true)">Go Live</button>';
                }
                break;
            case 'materials':
                meta = (item.subject || '') + ' · ' + (item.fileSize || '') + ' · ' + formatDate(item.date);
                break;
            case 'announcements':
                var isImp = (item.important === true || item.important === 'TRUE' || item.important === 'true');
                meta = formatDate(item.date || item.timestamp) + (isImp ? ' · ⚠️ Important' : '');
                break;
        }

        var sheetMap = {
            'videos': 'Videos',
            'live': 'LiveStreams',
            'materials': 'StudyMaterial',
            'announcements': 'Announcements'
        };

        html +=
            '<div class="admin-item">' +
            '  <div class="admin-item-info">' +
            '    <div class="admin-item-title">' + title + '</div>' +
            '    <div class="admin-item-meta">' + meta + '</div>' +
            '  </div>' +
            '  <div class="admin-item-actions">' +
            '    ' + extraBtns +
            '    <button class="btn-delete" onclick="deleteItem(\'' + sheetMap[tabName] + '\', \'' + item.id + '\', \'' + tabName + '\')">🗑 Delete</button>' +
            '  </div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   ADD FUNCTIONS
   ═══════════════════════════════════════════════════════ */

/* ─── ADD VIDEO ─────────────────────────────────────── */
function addVideo(e) {
    e.preventDefault();
    var btn = document.getElementById('v-btn');
    btn.disabled = true; btn.textContent = 'Adding...';

    var videoId = extractVideoId(document.getElementById('v-link').value);
    var dateVal = document.getElementById('v-date').value;

    apiPost({
        action: 'add',
        password: getAdminPassword(),
        sheet: 'Videos',
        rowData: {
            title: document.getElementById('v-title').value,
            subject: document.getElementById('v-subject').value,
            videoId: videoId,
            date: dateVal || new Date().toISOString().split('T')[0]
        }
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast('✅ Video added successfully!', 'success');
            e.target.reset();
            loadAdminData('videos');
        } else {
            showToast('❌ ' + res.message, 'error');
        }
        btn.disabled = false; btn.textContent = 'Add Video';
    })
    .catch(function(err) {
        showToast('❌ Network error: ' + err.message, 'error');
        btn.disabled = false; btn.textContent = 'Add Video';
    });
}


/* ─── ADD LIVE STREAM ───────────────────────────────── */
function addLiveStream(e) {
    e.preventDefault();
    var btn = document.getElementById('l-btn');
    btn.disabled = true; btn.textContent = 'Adding...';

    var videoId = extractVideoId(document.getElementById('l-link').value);

    apiPost({
        action: 'add',
        password: getAdminPassword(),
        sheet: 'LiveStreams',
        rowData: {
            title: document.getElementById('l-title').value,
            subject: document.getElementById('l-subject').value,
            videoId: videoId,
            scheduledTime: document.getElementById('l-time').value,
            isLive: 'FALSE'
        }
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast('✅ Live stream added!', 'success');
            e.target.reset();
            loadAdminData('live');
        } else {
            showToast('❌ ' + res.message, 'error');
        }
        btn.disabled = false; btn.textContent = 'Add Live Stream';
    })
    .catch(function(err) {
        showToast('❌ Network error', 'error');
        btn.disabled = false; btn.textContent = 'Add Live Stream';
    });
}


/* ─── ADD MATERIAL ──────────────────────────────────── */
function addMaterial(e) {
    e.preventDefault();
    var btn = document.getElementById('m-btn');
    btn.disabled = true; btn.textContent = 'Adding...';

    var dateVal = document.getElementById('m-date').value;

    apiPost({
        action: 'add',
        password: getAdminPassword(),
        sheet: 'StudyMaterial',
        rowData: {
            title: document.getElementById('m-title').value,
            subject: document.getElementById('m-subject').value,
            driveLink: document.getElementById('m-link').value,
            fileSize: document.getElementById('m-size').value || '',
            date: dateVal || new Date().toISOString().split('T')[0]
        }
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast('✅ Material added!', 'success');
            e.target.reset();
            loadAdminData('materials');
        } else {
            showToast('❌ ' + res.message, 'error');
        }
        btn.disabled = false; btn.textContent = 'Add Material';
    })
    .catch(function(err) {
        showToast('❌ Network error', 'error');
        btn.disabled = false; btn.textContent = 'Add Material';
    });
}


/* ─── ADD ANNOUNCEMENT ──────────────────────────────── */
function addAnnouncement(e) {
    e.preventDefault();
    var btn = document.getElementById('a-btn');
    btn.disabled = true; btn.textContent = 'Posting...';

    apiPost({
        action: 'add',
        password: getAdminPassword(),
        sheet: 'Announcements',
        rowData: {
            title: document.getElementById('a-title').value,
            message: document.getElementById('a-message').value,
            date: new Date().toISOString().split('T')[0],
            important: document.getElementById('a-important').checked ? 'TRUE' : 'FALSE'
        }
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast('✅ Announcement posted!', 'success');
            e.target.reset();
            loadAdminData('announcements');
        } else {
            showToast('❌ ' + res.message, 'error');
        }
        btn.disabled = false; btn.textContent = 'Post Announcement';
    })
    .catch(function(err) {
        showToast('❌ Network error', 'error');
        btn.disabled = false; btn.textContent = 'Post Announcement';
    });
}


/* ═══════════════════════════════════════════════════════
   DELETE FUNCTION
   ═══════════════════════════════════════════════════════ */
function deleteItem(sheetName, id, tabName) {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) {
        return;
    }

    apiPost({
        action: 'delete',
        password: getAdminPassword(),
        sheet: sheetName,
        id: id
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast('🗑 Deleted successfully!', 'success');
            loadAdminData(tabName);
        } else {
            showToast('❌ ' + res.message, 'error');
        }
    })
    .catch(function(err) {
        showToast('❌ Network error', 'error');
    });
}


/* ═══════════════════════════════════════════════════════
   TOGGLE LIVE
   ═══════════════════════════════════════════════════════ */
function toggleLiveStream(id, goLive) {
    var msg = goLive
        ? 'Start this live stream? Students will see it as LIVE.'
        : 'End this live stream?';

    if (!confirm(msg)) return;

    apiPost({
        action: 'toggleLive',
        password: getAdminPassword(),
        id: id,
        isLive: goLive ? 'TRUE' : 'FALSE'
    })
    .then(function(res) {
        if (res.status === 'success') {
            showToast(goLive ? '🟢 Stream is LIVE!' : '⚫ Stream ended', 'success');
            loadAdminData('live');
        } else {
            showToast('❌ ' + res.message, 'error');
        }
    })
    .catch(function(err) {
        showToast('❌ Network error', 'error');
    });
}


/* ═══════════════════════════════════════════════════════
   INIT ADMIN PANEL
   ═══════════════════════════════════════════════════════ */
function initAdminPanel() {
    // Auth check
    if (!getAdminPassword()) {
        window.location.href = 'login.html';
        return;
    }

    // Load initial tab (Videos)
    loadAdminData('videos');
}