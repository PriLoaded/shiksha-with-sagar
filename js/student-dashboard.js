/* =====================================================
   SHIKSHA WITH SAGAR — STUDENT DASHBOARD
   
   Data Structure + Dashboard Logic
   
   ★ ADMIN will later manage this data via Google Sheets.
   ★ For now, we use sample JSON data below.
   ===================================================== */


/* ═══════════════════════════════════════════════════════
   🔧 MASTER DATA — ALL CLASSES, STREAMS, SUBJECTS, CHAPTERS
   
   This is the COMPLETE course catalog.
   Later the admin will manage this from the admin panel.
   For now, edit it here to add/remove content.
   ═══════════════════════════════════════════════════════ */

var MASTER_DATA = {
    classes: [

        // ─────────────────────────────────────────
        //  CLASS 11
        // ─────────────────────────────────────────
        {
            id: 'class-11',
            name: 'Class 11',
            streams: [
                {
                    id: 'science-11',
                    name: 'Science Stream',
                    subjects: [
                        {
                            id: 'physics-11',
                            name: 'Physics',
                            icon: '⚛️',
                            color: '#4361ee',
                            colorLight: '#e8f0fe',
                            chapters: [
                                {
                                    id: 'phy-11-ch1',
                                    name: 'Physical World',
                                    description: 'Introduction to physics, scope and excitement',
                                    totalVideos: 4,
                                    totalNotes: 2
                                },
                                {
                                    id: 'phy-11-ch2',
                                    name: 'Units and Measurements',
                                    description: 'SI units, dimensional analysis, significant figures',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'phy-11-ch3',
                                    name: 'Motion in a Straight Line',
                                    description: 'Position, velocity, acceleration, kinematic equations',
                                    totalVideos: 8,
                                    totalNotes: 4
                                },
                                {
                                    id: 'phy-11-ch4',
                                    name: 'Motion in a Plane',
                                    description: 'Vectors, projectile motion, circular motion',
                                    totalVideos: 7,
                                    totalNotes: 3
                                },
                                {
                                    id: 'phy-11-ch5',
                                    name: 'Laws of Motion',
                                    description: "Newton's three laws, friction, circular motion dynamics",
                                    totalVideos: 10,
                                    totalNotes: 5
                                },
                                {
                                    id: 'phy-11-ch6',
                                    name: 'Work, Energy and Power',
                                    description: 'Work-energy theorem, conservation of energy, power',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'phy-11-ch7',
                                    name: 'System of Particles and Rotational Motion',
                                    description: 'Centre of mass, torque, angular momentum',
                                    totalVideos: 9,
                                    totalNotes: 4
                                },
                                {
                                    id: 'phy-11-ch8',
                                    name: 'Gravitation',
                                    description: "Kepler's laws, gravitational potential, satellites",
                                    totalVideos: 5,
                                    totalNotes: 2
                                }
                            ]
                        },
                        {
                            id: 'chemistry-11',
                            name: 'Chemistry',
                            icon: '🧪',
                            color: '#06a77d',
                            colorLight: '#e0f5ef',
                            chapters: [
                                {
                                    id: 'chem-11-ch1',
                                    name: 'Some Basic Concepts of Chemistry',
                                    description: 'Atomic mass, mole concept, stoichiometry',
                                    totalVideos: 5,
                                    totalNotes: 3
                                },
                                {
                                    id: 'chem-11-ch2',
                                    name: 'Structure of Atom',
                                    description: 'Bohr model, quantum numbers, electron configuration',
                                    totalVideos: 7,
                                    totalNotes: 4
                                },
                                {
                                    id: 'chem-11-ch3',
                                    name: 'Classification of Elements',
                                    description: 'Periodic table, periodic properties, trends',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'chem-11-ch4',
                                    name: 'Chemical Bonding and Molecular Structure',
                                    description: 'Ionic, covalent, VSEPR theory, hybridization',
                                    totalVideos: 8,
                                    totalNotes: 4
                                },
                                {
                                    id: 'chem-11-ch5',
                                    name: 'Thermodynamics',
                                    description: 'Enthalpy, entropy, Gibbs free energy',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'chem-11-ch6',
                                    name: 'Equilibrium',
                                    description: 'Chemical equilibrium, ionic equilibrium, pH',
                                    totalVideos: 7,
                                    totalNotes: 3
                                }
                            ]
                        },
                        {
                            id: 'mathematics-11',
                            name: 'Mathematics',
                            icon: '📐',
                            color: '#e85d04',
                            colorLight: '#fff0e5',
                            chapters: [
                                {
                                    id: 'math-11-ch1',
                                    name: 'Sets',
                                    description: 'Types of sets, Venn diagrams, operations',
                                    totalVideos: 4,
                                    totalNotes: 2
                                },
                                {
                                    id: 'math-11-ch2',
                                    name: 'Relations and Functions',
                                    description: 'Cartesian product, types of relations, functions',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'math-11-ch3',
                                    name: 'Trigonometric Functions',
                                    description: 'Trigonometric ratios, identities, equations',
                                    totalVideos: 8,
                                    totalNotes: 4
                                },
                                {
                                    id: 'math-11-ch4',
                                    name: 'Complex Numbers',
                                    description: 'Algebra of complex numbers, Argand plane',
                                    totalVideos: 5,
                                    totalNotes: 2
                                },
                                {
                                    id: 'math-11-ch5',
                                    name: 'Linear Inequalities',
                                    description: 'Algebraic and graphical solution of inequalities',
                                    totalVideos: 4,
                                    totalNotes: 2
                                },
                                {
                                    id: 'math-11-ch6',
                                    name: 'Permutations and Combinations',
                                    description: 'Fundamental principle, permutations, combinations',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'math-11-ch7',
                                    name: 'Straight Lines',
                                    description: 'Slope, equations of lines, distance formula',
                                    totalVideos: 5,
                                    totalNotes: 3
                                }
                            ]
                        },
                        {
                            id: 'biology-11',
                            name: 'Biology',
                            icon: '🧬',
                            color: '#d62246',
                            colorLight: '#fce8ef',
                            chapters: [
                                {
                                    id: 'bio-11-ch1',
                                    name: 'The Living World',
                                    description: 'Biodiversity, taxonomy, nomenclature',
                                    totalVideos: 3,
                                    totalNotes: 2
                                },
                                {
                                    id: 'bio-11-ch2',
                                    name: 'Biological Classification',
                                    description: 'Five kingdom classification, features',
                                    totalVideos: 5,
                                    totalNotes: 3
                                },
                                {
                                    id: 'bio-11-ch3',
                                    name: 'Plant Kingdom',
                                    description: 'Algae, bryophytes, pteridophytes, gymnosperms',
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'bio-11-ch4',
                                    name: 'Animal Kingdom',
                                    description: 'Phylum classification, characteristics',
                                    totalVideos: 7,
                                    totalNotes: 4
                                },
                                {
                                    id: 'bio-11-ch5',
                                    name: 'Cell: The Unit of Life',
                                    description: 'Cell theory, prokaryotic and eukaryotic cells',
                                    totalVideos: 6,
                                    totalNotes: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'commerce-11',
                    name: 'Commerce Stream',
                    subjects: [
                        {
                            id: 'accountancy-11',
                            name: 'Accountancy',
                            icon: '📊',
                            color: '#7209b7',
                            colorLight: '#f0e6fa',
                            chapters: [
                                {
                                    id: 'acc-11-ch1',
                                    name: 'Introduction to Accounting',
                                    description: 'Meaning, objectives, and accounting terms',
                                    totalVideos: 3,
                                    totalNotes: 2
                                },
                                {
                                    id: 'acc-11-ch2',
                                    name: 'Theory Base of Accounting',
                                    description: 'GAAP, accounting principles, concepts',
                                    totalVideos: 4,
                                    totalNotes: 2
                                },
                                {
                                    id: 'acc-11-ch3',
                                    name: 'Recording of Transactions',
                                    description: 'Journal, ledger, trial balance',
                                    totalVideos: 6,
                                    totalNotes: 3
                                }
                            ]
                        },
                        {
                            id: 'business-studies-11',
                            name: 'Business Studies',
                            icon: '💼',
                            color: '#2196f3',
                            colorLight: '#e3f2fd',
                            chapters: [
                                {
                                    id: 'bs-11-ch1',
                                    name: 'Nature and Purpose of Business',
                                    description: 'Business, profession, employment',
                                    totalVideos: 3,
                                    totalNotes: 2
                                },
                                {
                                    id: 'bs-11-ch2',
                                    name: 'Forms of Business Organisation',
                                    description: 'Sole proprietorship, partnership, company',
                                    totalVideos: 5,
                                    totalNotes: 3
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // ─────────────────────────────────────────
        //  CLASS 12
        // ─────────────────────────────────────────
        {
            id: 'class-12',
            name: 'Class 12',
            streams: [
                {
                    id: 'science-12',
                    name: 'Science Stream',
                    subjects: [
                        {
                            id: 'physics-12',
                            name: 'Physics',
                            icon: '⚛️',
                            color: '#4361ee',
                            colorLight: '#e8f0fe',
                            chapters: [
                                {
                                    id: 'phy-12-ch1',
                                    name: 'Electric Charges and Fields',
                                    description: "Coulomb's law, electric field, Gauss theorem",
                                    totalVideos: 6,
                                    totalNotes: 3
                                },
                                {
                                    id: 'phy-12-ch2',
                                    name: 'Electrostatic Potential and Capacitance',
                                    description: 'Potential, capacitors, energy stored',
                                    totalVideos: 7,
                                    totalNotes: 4
                                },
                                {
                                    id: 'phy-12-ch3',
                                    name: 'Current Electricity',
                                    description: "Ohm's law, Kirchhoff's rules, Wheatstone bridge",
                                    totalVideos: 8,
                                    totalNotes: 4
                                }
                            ]
                        },
                        {
                            id: 'chemistry-12',
                            name: 'Chemistry',
                            icon: '🧪',
                            color: '#06a77d',
                            colorLight: '#e0f5ef',
                            chapters: [
                                {
                                    id: 'chem-12-ch1',
                                    name: 'The Solid State',
                                    description: 'Crystal lattice, unit cell, defects',
                                    totalVideos: 5,
                                    totalNotes: 3
                                },
                                {
                                    id: 'chem-12-ch2',
                                    name: 'Solutions',
                                    description: "Concentration, Raoult's law, colligative properties",
                                    totalVideos: 6,
                                    totalNotes: 3
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};


/* ═══════════════════════════════════════════════════════
   🔧 STUDENT ASSIGNMENTS
   
   This defines what each student can access.
   Admin will manage this later from admin panel.
   
   KEY = student email
   VALUE = class, stream, and list of subject IDs
   ═══════════════════════════════════════════════════════ */

var STUDENT_ASSIGNMENTS = {

    'student@sws.com': {
        classId: 'class-11',
        streamId: 'science-11',
        subjects: ['physics-11', 'chemistry-11', 'mathematics-11']
    },

    'rahul@sws.com': {
        classId: 'class-11',
        streamId: 'science-11',
        subjects: ['physics-11', 'chemistry-11']
    },

    'priya@sws.com': {
        classId: 'class-12',
        streamId: 'science-12',
        subjects: ['physics-12', 'chemistry-12']
    }

    // ➕ Add more student assignments:
    // 'email@sws.com': {
    //     classId: 'class-11',
    //     streamId: 'science-11',
    //     subjects: ['physics-11']
    // },
};


/* ═══════════════════════════════════════════════════════
   ⛔ DO NOT EDIT BELOW — Dashboard Logic
   ═══════════════════════════════════════════════════════ */


/* ─── GLOBAL STATE ───────────────────────────────── */
var currentUser = null;
var currentAssignment = null;
var currentClassData = null;
var currentStreamData = null;
var assignedSubjects = [];
var currentView = 'dashboard'; // dashboard | chapters | chapter-detail


/* ─── INITIALIZE DASHBOARD ───────────────────────── */
function initStudentDashboard() {

    // 1. Get logged-in user
    try {
        currentUser = JSON.parse(localStorage.getItem('sws_user'));
    } catch (e) {
        currentUser = null;
    }

    if (!currentUser || currentUser.role !== 'student') {
        window.location.replace('login.html');
        return;
    }

    // 2. Get student assignment
    currentAssignment = STUDENT_ASSIGNMENTS[currentUser.email] || null;

    if (!currentAssignment) {
        showNoAssignment();
        return;
    }

    // 3. Resolve class and stream data
    currentClassData = findById(MASTER_DATA.classes, currentAssignment.classId);

    if (currentClassData) {
        currentStreamData = findById(currentClassData.streams, currentAssignment.streamId);
    }

    // 4. Resolve assigned subjects
    assignedSubjects = [];
    if (currentStreamData && currentAssignment.subjects) {
        currentAssignment.subjects.forEach(function (subId) {
            var found = findById(currentStreamData.subjects, subId);
            if (found) assignedSubjects.push(found);
        });
    }

    // 5. Render the UI
    renderDashboardHeader();
    renderSubjectCards();
    updateStats();
}


/* ─── FIND BY ID HELPER ──────────────────────────── */
function findById(arr, id) {
    if (!arr) return null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return arr[i];
    }
    return null;
}


/* ─── RENDER DASHBOARD HEADER ────────────────────── */
function renderDashboardHeader() {

    // Greeting
    var hour = new Date().getHours();
    var greet = '';
    if (hour >= 5 && hour < 12)       greet = 'Good Morning ☀️';
    else if (hour >= 12 && hour < 17) greet = 'Good Afternoon 🌤️';
    else if (hour >= 17 && hour < 21) greet = 'Good Evening 🌙';
    else                               greet = 'Happy Studying 🌟';

    var firstName = (currentUser.name || 'Student').split(' ')[0];

    var greetEl = document.getElementById('dash-greeting');
    if (greetEl) greetEl.textContent = greet;

    var nameEl = document.getElementById('dash-student-name');
    if (nameEl) nameEl.textContent = firstName;

    // Avatar
    var avatarEl = document.getElementById('dash-avatar');
    if (avatarEl) {
        avatarEl.textContent = firstName.charAt(0).toUpperCase();
    }

    // Topbar name
    var topNameEl = document.getElementById('topbar-name');
    if (topNameEl) topNameEl.textContent = currentUser.name || 'Student';

    var topAvatarEl = document.getElementById('topbar-avatar');
    if (topAvatarEl) {
        topAvatarEl.textContent = firstName.charAt(0).toUpperCase();
    }

    // Class and stream badges
    var classNameEl = document.getElementById('dash-class-name');
    if (classNameEl && currentClassData) {
        classNameEl.textContent = currentClassData.name;
    }

    var streamNameEl = document.getElementById('dash-stream-name');
    if (streamNameEl && currentStreamData) {
        streamNameEl.textContent = currentStreamData.name;
    }
}


/* ─── RENDER SUBJECT CARDS ───────────────────────── */
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

    var html = '';
    assignedSubjects.forEach(function (sub, index) {

        var totalChapters = sub.chapters ? sub.chapters.length : 0;
        var totalVideos = 0;
        var totalNotes = 0;

        if (sub.chapters) {
            sub.chapters.forEach(function (ch) {
                totalVideos += (ch.totalVideos || 0);
                totalNotes += (ch.totalNotes || 0);
            });
        }

        html +=
            '<div class="subject-card" ' +
            '     style="--card-color:' + sub.color + '; --card-color-light:' + sub.colorLight + '; animation-delay:' + (index * 0.08) + 's"' +
            '     onclick="openSubject(\'' + sub.id + '\')">' +
            '  <div class="subject-card-top">' +
            '    <div class="subject-icon-box">' + sub.icon + '</div>' +
            '    <div class="subject-chapter-count">' + totalChapters + ' Chapters</div>' +
            '  </div>' +
            '  <h3 class="subject-card-title">' + sub.name + '</h3>' +
            '  <div class="subject-card-stats">' +
            '    <span>🎥 ' + totalVideos + ' Videos</span>' +
            '    <span>📄 ' + totalNotes + ' Notes</span>' +
            '  </div>' +
            '  <div class="subject-card-bar">' +
            '    <div class="subject-bar-fill" style="width: 0%"></div>' +
            '  </div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ─── UPDATE STATS ───────────────────────────────── */
function updateStats() {
    var totalSubjects = assignedSubjects.length;
    var totalChapters = 0;
    var totalVideos = 0;
    var totalNotes = 0;

    assignedSubjects.forEach(function (sub) {
        if (sub.chapters) {
            totalChapters += sub.chapters.length;
            sub.chapters.forEach(function (ch) {
                totalVideos += (ch.totalVideos || 0);
                totalNotes += (ch.totalNotes || 0);
            });
        }
    });

    setText('stat-subjects', totalSubjects);
    setText('stat-chapters', totalChapters);
    setText('stat-total-videos', totalVideos);
    setText('stat-total-notes', totalNotes);
}

function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}


/* ═══════════════════════════════════════════════════════
   SUBJECT → CHAPTERS VIEW
   ═══════════════════════════════════════════════════════ */

function openSubject(subjectId) {
    var subject = null;
    for (var i = 0; i < assignedSubjects.length; i++) {
        if (assignedSubjects[i].id === subjectId) {
            subject = assignedSubjects[i];
            break;
        }
    }

    if (!subject) return;

    currentView = 'chapters';

    // Hide dashboard view
    document.getElementById('view-dashboard').classList.remove('active');
    document.getElementById('view-dashboard').classList.add('hidden');

    // Show chapters view
    var chaptersView = document.getElementById('view-chapters');
    chaptersView.classList.remove('hidden');
    chaptersView.classList.add('active');

    // Render chapters header
    document.getElementById('chapters-subject-icon').textContent = subject.icon;
    document.getElementById('chapters-subject-name').textContent = subject.name;
    document.getElementById('chapters-subject-count').textContent =
        (subject.chapters ? subject.chapters.length : 0) + ' Chapters';

    // Set header color
    var chapHeader = document.getElementById('chapters-header');
    if (chapHeader) {
        chapHeader.style.background = 'linear-gradient(145deg, ' + subject.color + ', ' + darkenColor(subject.color) + ')';
    }

    // Render chapter cards
    renderChapterCards(subject);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function renderChapterCards(subject) {
    var container = document.getElementById('chapters-list');
    if (!container) return;

    if (!subject.chapters || subject.chapters.length === 0) {
        container.innerHTML =
            '<div class="empty-state-dash">' +
            '  <div class="empty-icon-dash">📭</div>' +
            '  <p>No chapters added yet.</p>' +
            '  <p class="empty-sub">Sagar Sir will add them soon!</p>' +
            '</div>';
        return;
    }

    var html = '';
    subject.chapters.forEach(function (ch, index) {
        html +=
            '<div class="chapter-card" style="animation-delay:' + (index * 0.06) + 's" onclick="openChapterDetail(\'' + subject.id + '\', \'' + ch.id + '\')">' +
            '  <div class="chapter-number">' +
            '    <span>' + (index + 1) + '</span>' +
            '  </div>' +
            '  <div class="chapter-info">' +
            '    <h4 class="chapter-title">' + ch.name + '</h4>' +
            '    <p class="chapter-desc">' + (ch.description || '') + '</p>' +
            '    <div class="chapter-meta">' +
            '      <span class="chapter-meta-item">🎥 ' + (ch.totalVideos || 0) + ' Videos</span>' +
            '      <span class="chapter-meta-item">📄 ' + (ch.totalNotes || 0) + ' Notes</span>' +
            '    </div>' +
            '  </div>' +
            '  <div class="chapter-arrow">›</div>' +
            '</div>';
    });

    container.innerHTML = html;
}


/* ─── BACK TO DASHBOARD ──────────────────────────── */
function backToDashboard() {
    currentView = 'dashboard';

    document.getElementById('view-chapters').classList.remove('active');
    document.getElementById('view-chapters').classList.add('hidden');

    document.getElementById('view-chapter-detail').classList.remove('active');
    document.getElementById('view-chapter-detail').classList.add('hidden');

    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('view-dashboard').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToChapters() {
    currentView = 'chapters';

    document.getElementById('view-chapter-detail').classList.remove('active');
    document.getElementById('view-chapter-detail').classList.add('hidden');

    document.getElementById('view-chapters').classList.remove('hidden');
    document.getElementById('view-chapters').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ═══════════════════════════════════════════════════════
   CHAPTER DETAIL VIEW
   ═══════════════════════════════════════════════════════ */

function openChapterDetail(subjectId, chapterId) {
    var subject = findById(assignedSubjects, subjectId);
    if (!subject) return;

    var chapter = findById(subject.chapters, chapterId);
    if (!chapter) return;

    currentView = 'chapter-detail';

    // Hide chapters view
    document.getElementById('view-chapters').classList.remove('active');
    document.getElementById('view-chapters').classList.add('hidden');

    // Show detail view
    var detailView = document.getElementById('view-chapter-detail');
    detailView.classList.remove('hidden');
    detailView.classList.add('active');

    // Set header
    var detailHeader = document.getElementById('detail-header');
    if (detailHeader) {
        detailHeader.style.background = 'linear-gradient(145deg, ' + subject.color + ', ' + darkenColor(subject.color) + ')';
    }

    document.getElementById('detail-subject-icon').textContent = subject.icon;
    document.getElementById('detail-chapter-name').textContent = chapter.name;
    document.getElementById('detail-subject-name').textContent = subject.name;

    // Render content tabs
    renderChapterContent(subject, chapter);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function renderChapterContent(subject, chapter) {
    var container = document.getElementById('chapter-content-area');
    if (!container) return;

    container.innerHTML =
        '<div class="detail-info-card">' +
        '  <h4>' + chapter.name + '</h4>' +
        '  <p>' + (chapter.description || '') + '</p>' +
        '  <div class="detail-stats-row">' +
        '    <div class="detail-stat">' +
        '      <span class="detail-stat-num">' + (chapter.totalVideos || 0) + '</span>' +
        '      <span class="detail-stat-label">Videos</span>' +
        '    </div>' +
        '    <div class="detail-stat-divider"></div>' +
        '    <div class="detail-stat">' +
        '      <span class="detail-stat-num">' + (chapter.totalNotes || 0) + '</span>' +
        '      <span class="detail-stat-label">Notes</span>' +
        '    </div>' +
        '  </div>' +
        '</div>' +

        '<div class="content-section">' +
        '  <h3 class="content-section-title">🎥 Video Lectures</h3>' +
        '  <div class="coming-soon-box">' +
        '    <span class="coming-icon">🎬</span>' +
        '    <p>Video lectures will appear here.</p>' +
        '    <p class="coming-sub">Content will load from Google Sheets API.</p>' +
        '  </div>' +
        '</div>' +

        '<div class="content-section">' +
        '  <h3 class="content-section-title">📄 Study Notes</h3>' +
        '  <div class="coming-soon-box">' +
        '    <span class="coming-icon">📝</span>' +
        '    <p>PDF notes will appear here.</p>' +
        '    <p class="coming-sub">Content will load from Google Sheets API.</p>' +
        '  </div>' +
        '</div>' +

        '<div class="content-section">' +
        '  <h3 class="content-section-title">📝 Practice / Quiz</h3>' +
        '  <div class="coming-soon-box">' +
        '    <span class="coming-icon">✍️</span>' +
        '    <p>Practice questions coming soon.</p>' +
        '    <p class="coming-sub">This feature is under development.</p>' +
        '  </div>' +
        '</div>';
}


/* ─── NO ASSIGNMENT STATE ────────────────────────── */
function showNoAssignment() {
    renderDashboardHeader();
    var container = document.getElementById('subjects-grid');
    if (container) {
        container.innerHTML =
            '<div class="empty-state-dash">' +
            '  <div class="empty-icon-dash">🔒</div>' +
            '  <p>No class or subjects assigned yet.</p>' +
            '  <p class="empty-sub">Please contact Sagar Sir to get your<br>class and subject access.</p>' +
            '</div>';
    }
}


/* ─── LOGOUT ─────────────────────────────────────── */
function studentLogout() {
    localStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_user');
    sessionStorage.removeItem('sws_splash_done');
    window.location.replace('login.html');
}


/* ─── HANDLE BACK BUTTON ─────────────────────────── */
window.addEventListener('popstate', function () {
    if (currentView === 'chapter-detail') {
        backToChapters();
    } else if (currentView === 'chapters') {
        backToDashboard();
    }
});


/* ─── COLOR HELPER ───────────────────────────────── */
function darkenColor(hex) {
    var num = parseInt(hex.replace('#', ''), 16);
    var r = Math.max((num >> 16) - 40, 0);
    var g = Math.max(((num >> 8) & 0x00FF) - 40, 0);
    var b = Math.max((num & 0x0000FF) - 40, 0);
    return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}