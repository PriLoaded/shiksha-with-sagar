/* =====================================================
   SHIKSHA WITH SAGAR — ADMIN PANEL LOGIC
   Complete CRUD for Classes → Streams → Subjects →
   Chapters → Videos / Live / PDFs
   ===================================================== */

/* ═══════════════════════════════════════════════════════
   DATA LAYER — Load / Save from localStorage
   ═══════════════════════════════════════════════════════ */

var adminData = { classes: [] };
var contentData = {};
var assignmentData = {};

function loadAdminData() {
    try {
        var saved = localStorage.getItem('sws_master_data');
        if (saved) {
            adminData = JSON.parse(saved);
        } else if (typeof MASTER_DATA !== 'undefined') {
            adminData = JSON.parse(JSON.stringify(MASTER_DATA));
            saveAdminData();
        }
    } catch (e) {
        adminData = { classes: [] };
    }

    try {
        var savedContent = localStorage.getItem('sws_chapter_content');
        if (savedContent) {
            contentData = JSON.parse(savedContent);
        } else if (typeof CHAPTER_CONTENT !== 'undefined') {
            contentData = JSON.parse(JSON.stringify(CHAPTER_CONTENT));
            saveContentData();
        }
    } catch (e) {
        contentData = {};
    }

    try {
        var savedAssign = localStorage.getItem('sws_student_assignments');
        if (savedAssign) {
            assignmentData = JSON.parse(savedAssign);
        } else if (typeof STUDENT_ASSIGNMENTS !== 'undefined') {
            assignmentData = JSON.parse(JSON.stringify(STUDENT_ASSIGNMENTS));
            saveAssignmentData();
        }
    } catch (e) {
        assignmentData = {};
    }
}

function saveAdminData() {
    localStorage.setItem('sws_master_data', JSON.stringify(adminData));
}

function saveContentData() {
    localStorage.setItem('sws_chapter_content', JSON.stringify(contentData));
}

function saveAssignmentData() {
    localStorage.setItem('sws_student_assignments', JSON.stringify(assignmentData));
}

function generateId(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}


/* ═══════════════════════════════════════════════════════
   NAVIGATION STATE
   ═══════════════════════════════════════════════════════ */

var nav = {
    view: 'overview',
    classId: null,
    streamId: null,
    subjectId: null,
    chapterId: null,
    contentTab: 'videos'
};

function getClass(id) {
    return adminData.classes.find(function(c) { return c.id === id; }) || null;
}
function getStream(classId, streamId) {
    var cls = getClass(classId);
    if (!cls || !cls.streams) return null;
    return cls.streams.find(function(s) { return s.id === streamId; }) || null;
}
function getSubject(classId, streamId, subjectId) {
    var stream = getStream(classId, streamId);
    if (!stream || !stream.subjects) return null;
    return stream.subjects.find(function(s) { return s.id === subjectId; }) || null;
}
function getChapter(classId, streamId, subjectId, chapterId) {
    var subject = getSubject(classId, streamId, subjectId);
    if (!subject || !subject.chapters) return null;
    return subject.chapters.find(function(c) { return c.id === chapterId; }) || null;
}
function getChapterContent(chapterId) {
    if (!contentData[chapterId]) {
        contentData[chapterId] = { videos: [], liveStreams: [], studyMaterial: [] };
    }
    return contentData[chapterId];
}


/* ═══════════════════════════════════════════════════════
   INITIALIZE ADMIN PANEL
   ═══════════════════════════════════════════════════════ */

function initAdminPanel() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('sws_user')); } catch(e) {}
    if (!user || user.role !== 'admin') {
        window.location.replace('../login.html');
        return;
    }

    loadAdminData();
    navigateTo('overview');
}


/* ═══════════════════════════════════════════════════════
   VIEW NAVIGATION
   ═══════════════════════════════════════════════════════ */

function navigateTo(view, ids) {
    nav.view = view;
    if (ids) {
        if (ids.classId !== undefined) nav.classId = ids.classId;
        if (ids.streamId !== undefined) nav.streamId = ids.streamId;
        if (ids.subjectId !== undefined) nav.subjectId = ids.subjectId;
        if (ids.chapterId !== undefined) nav.chapterId = ids.chapterId;
    }

    document.querySelectorAll('.admin-view').forEach(function(v) {
        v.classList.remove('active');
    });

    closeAllForms();
    renderBreadcrumb();

    switch (view) {
        case 'overview':
            renderOverview();
            break;
        case 'classes':
            renderClasses();
            break;
        case 'streams':
            renderStreams();
            break;
        case 'subjects':
            renderSubjects();
            break;
        case 'chapters':
            renderChapters();
            break;
        case 'content':
            renderChapterContent_admin();
            break;
    }

    document.getElementById('view-' + view).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ═══════════════════════════════════════════════════════
   BREADCRUMB
   ═══════════════════════════════════════════════════════ */

function renderBreadcrumb() {
    var bc = document.getElementById('breadcrumb');
    if (!bc) return;

    var html = '<span class="bc-item" onclick="navigateTo(\'overview\')">🏠 Home</span>';

    if (nav.view === 'overview') {
        bc.innerHTML = html;
        return;
    }

    html += '<span class="bc-sep">›</span>';
    html += '<span class="bc-item" onclick="navigateTo(\'classes\')">Classes</span>';

    if (nav.classId && nav.view !== 'classes') {
        var cls = getClass(nav.classId);
        html += '<span class="bc-sep">›</span>';
        html += '<span class="bc-item" onclick="navigateTo(\'streams\',{classId:\'' + nav.classId + '\'})">' + (cls ? cls.name : '...') + '</span>';
    }

    if (nav.streamId && (nav.view === 'subjects' || nav.view === 'chapters' || nav.view === 'content')) {
        var str = getStream(nav.classId, nav.streamId);
        html += '<span class="bc-sep">›</span>';
        html += '<span class="bc-item" onclick="navigateTo(\'subjects\',{classId:\'' + nav.classId + '\',streamId:\'' + nav.streamId + '\'})">' + (str ? str.name : '...') + '</span>';
    }

    if (nav.subjectId && (nav.view === 'chapters' || nav.view === 'content')) {
        var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
        html += '<span class="bc-sep">›</span>';
        html += '<span class="bc-item" onclick="navigateTo(\'chapters\',{classId:\'' + nav.classId + '\',streamId:\'' + nav.streamId + '\',subjectId:\'' + nav.subjectId + '\'})">' + (sub ? sub.name : '...') + '</span>';
    }

    if (nav.chapterId && nav.view === 'content') {
        var ch = getChapter(nav.classId, nav.streamId, nav.subjectId, nav.chapterId);
        html += '<span class="bc-sep">›</span>';
        html += '<span class="bc-item bc-current">' + (ch ? ch.name : '...') + '</span>';
    }

    bc.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════════════════ */

function renderOverview() {
    var totalClasses = adminData.classes.length;
    var totalStreams = 0, totalSubjects = 0, totalChapters = 0;
    var totalVideos = 0, totalLive = 0, totalPdfs = 0;

    adminData.classes.forEach(function(cls) {
        if (cls.streams) {
            totalStreams += cls.streams.length;
            cls.streams.forEach(function(str) {
                if (str.subjects) {
                    totalSubjects += str.subjects.length;
                    str.subjects.forEach(function(sub) {
                        if (sub.chapters) {
                            totalChapters += sub.chapters.length;
                            sub.chapters.forEach(function(ch) {
                                var c = contentData[ch.id];
                                if (c) {
                                    totalVideos += (c.videos ? c.videos.length : 0);
                                    totalLive += (c.liveStreams ? c.liveStreams.length : 0);
                                    totalPdfs += (c.studyMaterial ? c.studyMaterial.length : 0);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    setText('ov-classes', totalClasses);
    setText('ov-streams', totalStreams);
    setText('ov-subjects', totalSubjects);
    setText('ov-chapters', totalChapters);
    setText('ov-videos', totalVideos);
    setText('ov-live', totalLive);
    setText('ov-pdfs', totalPdfs);
    setText('ov-students', Object.keys(assignmentData).length);
}


/* ═══════════════════════════════════════════════════════
   CLASSES CRUD
   ═══════════════════════════════════════════════════════ */

function renderClasses() {
    var list = document.getElementById('classes-list');
    if (!list) return;

    if (adminData.classes.length === 0) {
        list.innerHTML = emptyAdmin('No classes created yet', 'Click "Add Class" to create your first class');
        return;
    }

    var html = '';
    adminData.classes.forEach(function(cls) {
        var streamCount = cls.streams ? cls.streams.length : 0;
        html +=
            '<div class="admin-list-item" onclick="navigateTo(\'streams\',{classId:\'' + cls.id + '\'})">' +
            '  <div class="ali-icon" style="background:#e8f0fe">🏫</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + cls.name + '</div>' +
            '    <div class="ali-meta">' + streamCount + ' stream' + (streamCount !== 1 ? 's' : '') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-edit" onclick="event.stopPropagation(); editClass(\'' + cls.id + '\')">✏️</button>' +
            '    <button class="btn-icon btn-del" onclick="event.stopPropagation(); deleteClass(\'' + cls.id + '\')">🗑</button>' +
            '  </div>' +
            '  <div class="ali-arrow">›</div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function addClass() {
    var name = prompt('Enter class name (e.g. Class 11):');
    if (!name || !name.trim()) return;

    var id = generateId('class');
    adminData.classes.push({
        id: id,
        name: name.trim(),
        streams: []
    });
    saveAdminData();
    renderClasses();
    showToast('Class "' + name.trim() + '" created!');
}

function editClass(id) {
    var cls = getClass(id);
    if (!cls) return;
    var name = prompt('Edit class name:', cls.name);
    if (!name || !name.trim()) return;
    cls.name = name.trim();
    saveAdminData();
    renderClasses();
    showToast('Class updated!');
}

function deleteClass(id) {
    var cls = getClass(id);
    if (!cls) return;
    if (!confirm('Delete "' + cls.name + '" and ALL its streams, subjects, chapters and content?\n\nThis cannot be undone!')) return;

    // Remove chapter content
    if (cls.streams) {
        cls.streams.forEach(function(str) {
            if (str.subjects) {
                str.subjects.forEach(function(sub) {
                    if (sub.chapters) {
                        sub.chapters.forEach(function(ch) {
                            delete contentData[ch.id];
                        });
                    }
                });
            }
        });
    }

    adminData.classes = adminData.classes.filter(function(c) { return c.id !== id; });
    saveAdminData();
    saveContentData();
    renderClasses();
    showToast('Class deleted!', 'error');
}


/* ═══════════════════════════════════════════════════════
   STREAMS CRUD
   ═══════════════════════════════════════════════════════ */

function renderStreams() {
    var cls = getClass(nav.classId);
    var list = document.getElementById('streams-list');
    if (!list || !cls) return;

    setText('streams-class-name', cls.name);

    if (!cls.streams || cls.streams.length === 0) {
        list.innerHTML = emptyAdmin('No streams yet', 'Add a stream like "Science" or "Commerce"');
        return;
    }

    var html = '';
    cls.streams.forEach(function(str) {
        var subCount = str.subjects ? str.subjects.length : 0;
        html +=
            '<div class="admin-list-item" onclick="navigateTo(\'subjects\',{classId:\'' + nav.classId + '\',streamId:\'' + str.id + '\'})">' +
            '  <div class="ali-icon" style="background:#e0f5ef">📋</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + str.name + '</div>' +
            '    <div class="ali-meta">' + subCount + ' subject' + (subCount !== 1 ? 's' : '') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-edit" onclick="event.stopPropagation(); editStream(\'' + str.id + '\')">✏️</button>' +
            '    <button class="btn-icon btn-del" onclick="event.stopPropagation(); deleteStream(\'' + str.id + '\')">🗑</button>' +
            '  </div>' +
            '  <div class="ali-arrow">›</div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function addStream() {
    var cls = getClass(nav.classId);
    if (!cls) return;
    var name = prompt('Enter stream name (e.g. Science Stream):');
    if (!name || !name.trim()) return;

    if (!cls.streams) cls.streams = [];
    cls.streams.push({ id: generateId('stream'), name: name.trim(), subjects: [] });
    saveAdminData();
    renderStreams();
    showToast('Stream "' + name.trim() + '" created!');
}

function editStream(id) {
    var str = getStream(nav.classId, id);
    if (!str) return;
    var name = prompt('Edit stream name:', str.name);
    if (!name || !name.trim()) return;
    str.name = name.trim();
    saveAdminData();
    renderStreams();
    showToast('Stream updated!');
}

function deleteStream(id) {
    var cls = getClass(nav.classId);
    var str = getStream(nav.classId, id);
    if (!cls || !str) return;
    if (!confirm('Delete "' + str.name + '" and ALL its subjects, chapters, content?')) return;

    if (str.subjects) {
        str.subjects.forEach(function(sub) {
            if (sub.chapters) {
                sub.chapters.forEach(function(ch) { delete contentData[ch.id]; });
            }
        });
    }
    cls.streams = cls.streams.filter(function(s) { return s.id !== id; });
    saveAdminData(); saveContentData();
    renderStreams();
    showToast('Stream deleted!', 'error');
}


/* ═══════════════════════════════════════════════════════
   SUBJECTS CRUD
   ═══════════════════════════════════════════════════════ */

var ICON_OPTIONS = ['⚛️','🧪','📐','🧬','📊','💼','📝','🌍','💻','🎨','🏃','📖','🔬','💡','🎵','🗣️','🧮','🌱','⚡','🔭'];
var COLOR_OPTIONS = [
    { color: '#4361ee', light: '#e8f0fe', name: 'Blue' },
    { color: '#06a77d', light: '#e0f5ef', name: 'Green' },
    { color: '#e85d04', light: '#fff0e5', name: 'Orange' },
    { color: '#d62246', light: '#fce8ef', name: 'Red' },
    { color: '#7209b7', light: '#f0e6fa', name: 'Purple' },
    { color: '#2196f3', light: '#e3f2fd', name: 'Sky Blue' },
    { color: '#00897b', light: '#e0f2f1', name: 'Teal' },
    { color: '#f4511e', light: '#fbe9e7', name: 'Deep Orange' }
];

function renderSubjects() {
    var str = getStream(nav.classId, nav.streamId);
    var list = document.getElementById('subjects-list');
    if (!list || !str) return;

    setText('subjects-stream-name', str.name);
    renderSubjectForm();

    if (!str.subjects || str.subjects.length === 0) {
        list.innerHTML = emptyAdmin('No subjects yet', 'Add subjects like Physics, Chemistry, etc.');
        return;
    }

    var html = '';
    str.subjects.forEach(function(sub) {
        var chCount = sub.chapters ? sub.chapters.length : 0;
        html +=
            '<div class="admin-list-item" onclick="navigateTo(\'chapters\',{classId:\'' + nav.classId + '\',streamId:\'' + nav.streamId + '\',subjectId:\'' + sub.id + '\'})">' +
            '  <div class="ali-icon" style="background:' + (sub.colorLight || '#f0f0f5') + '">' + (sub.icon || '📖') + '</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + sub.name + '</div>' +
            '    <div class="ali-meta">' + chCount + ' chapter' + (chCount !== 1 ? 's' : '') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-del" onclick="event.stopPropagation(); deleteSubject(\'' + sub.id + '\')">🗑</button>' +
            '  </div>' +
            '  <div class="ali-arrow">›</div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function renderSubjectForm() {
    var iconGrid = document.getElementById('icon-grid');
    var colorGrid = document.getElementById('color-grid');
    if (!iconGrid || !colorGrid) return;

    var ih = '';
    ICON_OPTIONS.forEach(function(icon, i) {
        ih += '<button type="button" class="icon-option' + (i === 0 ? ' selected' : '') + '" onclick="selectIcon(this,\'' + icon + '\')">' + icon + '</button>';
    });
    iconGrid.innerHTML = ih;

    var ch = '';
    COLOR_OPTIONS.forEach(function(c, i) {
        ch += '<button type="button" class="color-option' + (i === 0 ? ' selected' : '') + '" style="background:' + c.color + '" onclick="selectColor(this,\'' + c.color + '\',\'' + c.light + '\')" title="' + c.name + '"></button>';
    });
    colorGrid.innerHTML = ch;
}

var selectedIcon = '⚛️';
var selectedColor = '#4361ee';
var selectedColorLight = '#e8f0fe';

function selectIcon(btn, icon) {
    document.querySelectorAll('.icon-option').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    selectedIcon = icon;
}

function selectColor(btn, color, light) {
    document.querySelectorAll('.color-option').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    selectedColor = color;
    selectedColorLight = light;
}

function submitSubject(e) {
    e.preventDefault();
    var str = getStream(nav.classId, nav.streamId);
    if (!str) return;

    var name = document.getElementById('sub-name').value.trim();
    var desc = document.getElementById('sub-desc').value.trim();
    if (!name) { showToast('Enter subject name', 'error'); return; }

    if (!str.subjects) str.subjects = [];
    str.subjects.push({
        id: generateId('sub'),
        name: name,
        icon: selectedIcon,
        color: selectedColor,
        colorLight: selectedColorLight,
        description: desc,
        chapters: []
    });

    saveAdminData();
    document.getElementById('sub-name').value = '';
    document.getElementById('sub-desc').value = '';
    toggleForm('subject-form');
    renderSubjects();
    showToast('Subject "' + name + '" created!');
}

function deleteSubject(id) {
    var str = getStream(nav.classId, nav.streamId);
    if (!str) return;
    var sub = str.subjects.find(function(s) { return s.id === id; });
    if (!sub) return;
    if (!confirm('Delete "' + sub.name + '" and ALL its chapters and content?')) return;

    if (sub.chapters) {
        sub.chapters.forEach(function(ch) { delete contentData[ch.id]; });
    }
    str.subjects = str.subjects.filter(function(s) { return s.id !== id; });
    saveAdminData(); saveContentData();
    renderSubjects();
    showToast('Subject deleted!', 'error');
}


/* ═══════════════════════════════════════════════════════
   CHAPTERS CRUD
   ═══════════════════════════════════════════════════════ */

function renderChapters() {
    var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
    var list = document.getElementById('chapters-list-admin');
    if (!list || !sub) return;

    setText('chapters-subject-name', sub.icon + ' ' + sub.name);

    if (!sub.chapters || sub.chapters.length === 0) {
        list.innerHTML = emptyAdmin('No chapters yet', 'Add chapters for this subject');
        return;
    }

    var html = '';
    sub.chapters.forEach(function(ch, i) {
        var content = contentData[ch.id] || {};
        var vCount = content.videos ? content.videos.length : 0;
        var lCount = content.liveStreams ? content.liveStreams.length : 0;
        var mCount = content.studyMaterial ? content.studyMaterial.length : 0;

        html +=
            '<div class="admin-list-item" onclick="navigateTo(\'content\',{classId:\'' + nav.classId + '\',streamId:\'' + nav.streamId + '\',subjectId:\'' + nav.subjectId + '\',chapterId:\'' + ch.id + '\'})">' +
            '  <div class="ali-icon ali-num" style="background:' + (sub.colorLight || '#f0f0f5') + ';color:' + (sub.color || '#666') + '">' + (i + 1) + '</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + ch.name + '</div>' +
            '    <div class="ali-meta">🎥' + vCount + ' 🔴' + lCount + ' 📄' + mCount + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-edit" onclick="event.stopPropagation(); editChapter(\'' + ch.id + '\')">✏️</button>' +
            '    <button class="btn-icon btn-del" onclick="event.stopPropagation(); deleteChapter(\'' + ch.id + '\')">🗑</button>' +
            '  </div>' +
            '  <div class="ali-arrow">›</div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function submitChapter(e) {
    e.preventDefault();
    var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
    if (!sub) return;

    var name = document.getElementById('ch-name').value.trim();
    var desc = document.getElementById('ch-desc').value.trim();
    if (!name) { showToast('Enter chapter name', 'error'); return; }

    if (!sub.chapters) sub.chapters = [];
    var id = generateId('ch');
    sub.chapters.push({ id: id, name: name, description: desc });
    contentData[id] = { videos: [], liveStreams: [], studyMaterial: [] };

    saveAdminData(); saveContentData();
    document.getElementById('ch-name').value = '';
    document.getElementById('ch-desc').value = '';
    toggleForm('chapter-form');
    renderChapters();
    showToast('Chapter "' + name + '" created!');
}

function editChapter(id) {
    var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
    if (!sub) return;
    var ch = sub.chapters.find(function(c) { return c.id === id; });
    if (!ch) return;
    var name = prompt('Edit chapter name:', ch.name);
    if (!name || !name.trim()) return;
    ch.name = name.trim();
    saveAdminData();
    renderChapters();
    showToast('Chapter updated!');
}

function deleteChapter(id) {
    var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
    if (!sub) return;
    var ch = sub.chapters.find(function(c) { return c.id === id; });
    if (!ch) return;
    if (!confirm('Delete "' + ch.name + '" and ALL its videos, streams, PDFs?')) return;

    delete contentData[id];
    sub.chapters = sub.chapters.filter(function(c) { return c.id !== id; });
    saveAdminData(); saveContentData();
    renderChapters();
    showToast('Chapter deleted!', 'error');
}


/* ═══════════════════════════════════════════════════════
   CHAPTER CONTENT — VIDEOS / LIVE / PDFS
   ═══════════════════════════════════════════════════════ */

function renderChapterContent_admin() {
    var ch = getChapter(nav.classId, nav.streamId, nav.subjectId, nav.chapterId);
    if (!ch) return;

    var sub = getSubject(nav.classId, nav.streamId, nav.subjectId);
    setText('content-chapter-name', (sub ? sub.icon + ' ' : '') + ch.name);

    switchContentTab(nav.contentTab || 'videos');
}

function switchContentTab(tab) {
    nav.contentTab = tab;

    document.querySelectorAll('.ct-tab').forEach(function(t) { t.classList.remove('active'); });
    var activeTab = document.querySelector('.ct-tab[data-tab="' + tab + '"]');
    if (activeTab) activeTab.classList.add('active');

    document.querySelectorAll('.ct-panel').forEach(function(p) { p.classList.remove('active'); });
    var activePanel = document.getElementById('panel-' + tab);
    if (activePanel) activePanel.classList.add('active');

    var content = getChapterContent(nav.chapterId);

    switch (tab) {
        case 'videos': renderVideosList_admin(content.videos || []); break;
        case 'live': renderLiveList_admin(content.liveStreams || []); break;
        case 'pdfs': renderPdfsList_admin(content.studyMaterial || []); break;
    }
}


/* ── VIDEOS ── */
function renderVideosList_admin(videos) {
    var list = document.getElementById('videos-admin-list');
    if (!list) return;

    if (videos.length === 0) {
        list.innerHTML = emptyAdmin('No videos yet', 'Add YouTube video links');
        return;
    }

    var html = '';
    videos.forEach(function(v, i) {
        html +=
            '<div class="admin-list-item">' +
            '  <div class="ali-icon ali-num" style="background:#e8f0fe;color:#4361ee">' + (i + 1) + '</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + (v.title || 'Untitled') + '</div>' +
            '    <div class="ali-meta">⏱ ' + (v.duration || '--') + ' • 📅 ' + (v.date || '--') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-del" onclick="deleteVideo(\'' + v.id + '\')">🗑</button>' +
            '  </div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function submitVideo(e) {
    e.preventDefault();
    var content = getChapterContent(nav.chapterId);
    var title = document.getElementById('vid-title').value.trim();
    var link = document.getElementById('vid-link').value.trim();
    var duration = document.getElementById('vid-duration').value.trim();
    var date = document.getElementById('vid-date').value;

    if (!title || !link) { showToast('Title and YouTube link required', 'error'); return; }

    var videoId = extractYouTubeId(link);
    if (!videoId) { showToast('Invalid YouTube link', 'error'); return; }

    if (!content.videos) content.videos = [];
    content.videos.push({
        id: generateId('vid'),
        title: title,
        videoId: videoId,
        duration: duration || '',
        date: date || new Date().toISOString().split('T')[0]
    });

    saveContentData();
    e.target.reset();
    toggleForm('video-form');
    switchContentTab('videos');
    showToast('Video added!');
}

function deleteVideo(id) {
    if (!confirm('Delete this video?')) return;
    var content = getChapterContent(nav.chapterId);
    content.videos = (content.videos || []).filter(function(v) { return v.id !== id; });
    saveContentData();
    switchContentTab('videos');
    showToast('Video deleted!', 'error');
}


/* ── LIVE STREAMS ── */
function renderLiveList_admin(streams) {
    var list = document.getElementById('live-admin-list');
    if (!list) return;

    if (streams.length === 0) {
        list.innerHTML = emptyAdmin('No live streams yet', 'Add YouTube live stream links');
        return;
    }

    var html = '';
    streams.forEach(function(l) {
        var isLive = (l.isLive === true || l.isLive === 'true' || l.isLive === 'TRUE');
        html +=
            '<div class="admin-list-item">' +
            '  <div class="ali-icon" style="background:' + (isLive ? '#fce8ef' : '#f0f0f5') + '">' + (isLive ? '🟢' : '⚫') + '</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + (l.title || 'Untitled') + '</div>' +
            '    <div class="ali-meta">📅 ' + (l.scheduledTime || '--') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon ' + (isLive ? 'btn-del' : 'btn-edit') + '" onclick="toggleLive(\'' + l.id + '\')">' + (isLive ? '⏹' : '▶️') + '</button>' +
            '    <button class="btn-icon btn-del" onclick="deleteLive(\'' + l.id + '\')">🗑</button>' +
            '  </div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function submitLive(e) {
    e.preventDefault();
    var content = getChapterContent(nav.chapterId);
    var title = document.getElementById('live-title').value.trim();
    var link = document.getElementById('live-link').value.trim();
    var time = document.getElementById('live-time').value;

    if (!title || !link) { showToast('Title and link required', 'error'); return; }

    var videoId = extractYouTubeId(link);
    if (!videoId) { showToast('Invalid YouTube link', 'error'); return; }

    if (!content.liveStreams) content.liveStreams = [];
    content.liveStreams.push({
        id: generateId('live'),
        title: title,
        videoId: videoId,
        scheduledTime: time || '',
        isLive: false
    });

    saveContentData();
    e.target.reset();
    toggleForm('live-form');
    switchContentTab('live');
    showToast('Live stream added!');
}

function toggleLive(id) {
    var content = getChapterContent(nav.chapterId);
    var stream = (content.liveStreams || []).find(function(l) { return l.id === id; });
    if (!stream) return;
    var goLive = !(stream.isLive === true || stream.isLive === 'true');
    stream.isLive = goLive;
    saveContentData();
    switchContentTab('live');
    showToast(goLive ? '🟢 Stream is LIVE!' : '⚫ Stream ended');
}

function deleteLive(id) {
    if (!confirm('Delete this live stream?')) return;
    var content = getChapterContent(nav.chapterId);
    content.liveStreams = (content.liveStreams || []).filter(function(l) { return l.id !== id; });
    saveContentData();
    switchContentTab('live');
    showToast('Live stream deleted!', 'error');
}


/* ── STUDY MATERIAL / PDFs ── */
function renderPdfsList_admin(pdfs) {
    var list = document.getElementById('pdfs-admin-list');
    if (!list) return;

    if (pdfs.length === 0) {
        list.innerHTML = emptyAdmin('No PDFs yet', 'Add Google Drive PDF links');
        return;
    }

    var html = '';
    pdfs.forEach(function(m) {
        html +=
            '<div class="admin-list-item">' +
            '  <div class="ali-icon" style="background:#fff0e5">📄</div>' +
            '  <div class="ali-info">' +
            '    <div class="ali-title">' + (m.title || 'Untitled') + '</div>' +
            '    <div class="ali-meta">' + (m.fileSize || '') + ' • 📅 ' + (m.date || '--') + '</div>' +
            '  </div>' +
            '  <div class="ali-actions">' +
            '    <button class="btn-icon btn-del" onclick="deletePdf(\'' + m.id + '\')">🗑</button>' +
            '  </div>' +
            '</div>';
    });
    list.innerHTML = html;
}

function submitPdf(e) {
    e.preventDefault();
    var content = getChapterContent(nav.chapterId);
    var title = document.getElementById('pdf-title').value.trim();
    var link = document.getElementById('pdf-link').value.trim();
    var size = document.getElementById('pdf-size').value.trim();
    var date = document.getElementById('pdf-date').value;

    if (!title || !link) { showToast('Title and Drive link required', 'error'); return; }

    if (!content.studyMaterial) content.studyMaterial = [];
    content.studyMaterial.push({
        id: generateId('pdf'),
        title: title,
        driveLink: link,
        fileSize: size || '',
        date: date || new Date().toISOString().split('T')[0]
    });

    saveContentData();
    e.target.reset();
    toggleForm('pdf-form');
    switchContentTab('pdfs');
    showToast('PDF added!');
}

function deletePdf(id) {
    if (!confirm('Delete this PDF?')) return;
    var content = getChapterContent(nav.chapterId);
    content.studyMaterial = (content.studyMaterial || []).filter(function(m) { return m.id !== id; });
    saveContentData();
    switchContentTab('pdfs');
    showToast('PDF deleted!', 'error');
}


/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

function extractYouTubeId(url) {
    if (!url) return '';
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([^#&?\s]{11})/);
    if (match) return match[1];
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
    return '';
}

function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

function emptyAdmin(title, sub) {
    return '<div class="admin-empty"><div class="ae-icon">📭</div><p class="ae-title">' + title + '</p><p class="ae-sub">' + sub + '</p></div>';
}

function toggleForm(formId) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.classList.toggle('open');
}

function closeAllForms() {
    document.querySelectorAll('.add-form-panel').forEach(function(f) {
        f.classList.remove('open');
    });
}

/* ── Toast ── */
var toastTimer = null;
function showToast(msg, type) {
    var toast = document.getElementById('admin-toast');
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = (type === 'error' ? '❌ ' : '✅ ') + msg;
    toast.className = 'admin-toast show ' + (type || 'success');
    toastTimer = setTimeout(function() { toast.className = 'admin-toast'; }, 3000);
}

/* ── Logout ── */
function adminLogout() {
    localStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_admin');
    sessionStorage.removeItem('sws_splash_done');
    window.location.replace('../login.html');
}