/* =====================================================
   SHIKSHA WITH SAGAR — SHARED APP DATA
   
   ★ This file is included by ALL content pages.
   ★ It contains:
     1. Master curriculum (classes, streams, subjects, chapters)
     2. Student assignments (who can access what)
     3. Placeholder content (videos, PDFs, live streams per chapter)
   
   ★ Later this data will come from Google Sheets API.
     For now, edit it here.
   ===================================================== */


/* ═══════════════════════════════════════════════════════
   1. MASTER CURRICULUM DATA
   ═══════════════════════════════════════════════════════ */

var MASTER_DATA = {
    classes: [

        // ──── CLASS 11 ────
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
                            description: 'Explore the fundamental laws governing the universe — from mechanics to thermodynamics.',
                            chapters: [
                                { id: 'phy-11-ch1', name: 'Physical World', description: 'Introduction to physics, scope and excitement of physics' },
                                { id: 'phy-11-ch2', name: 'Units and Measurements', description: 'SI units, dimensional analysis, significant figures, errors' },
                                { id: 'phy-11-ch3', name: 'Motion in a Straight Line', description: 'Position, velocity, acceleration, kinematic equations' },
                                { id: 'phy-11-ch4', name: 'Motion in a Plane', description: 'Vectors, projectile motion, uniform circular motion' },
                                { id: 'phy-11-ch5', name: 'Laws of Motion', description: "Newton's three laws, friction, circular motion dynamics" },
                                { id: 'phy-11-ch6', name: 'Work, Energy and Power', description: 'Work-energy theorem, conservation of energy, collisions' },
                                { id: 'phy-11-ch7', name: 'System of Particles', description: 'Centre of mass, torque, angular momentum, rolling' },
                                { id: 'phy-11-ch8', name: 'Gravitation', description: "Kepler's laws, gravitational potential, satellites, escape velocity" }
                            ]
                        },
                        {
                            id: 'chemistry-11',
                            name: 'Chemistry',
                            icon: '🧪',
                            color: '#06a77d',
                            colorLight: '#e0f5ef',
                            description: 'Understand the composition, structure and properties of matter.',
                            chapters: [
                                { id: 'chem-11-ch1', name: 'Some Basic Concepts', description: 'Atomic mass, mole concept, stoichiometry, empirical formula' },
                                { id: 'chem-11-ch2', name: 'Structure of Atom', description: 'Bohr model, quantum numbers, electron configuration' },
                                { id: 'chem-11-ch3', name: 'Classification of Elements', description: 'Periodic table, periodic properties, trends' },
                                { id: 'chem-11-ch4', name: 'Chemical Bonding', description: 'Ionic, covalent, VSEPR theory, hybridization' },
                                { id: 'chem-11-ch5', name: 'Thermodynamics', description: 'Enthalpy, entropy, Gibbs energy, spontaneity' },
                                { id: 'chem-11-ch6', name: 'Equilibrium', description: 'Chemical and ionic equilibrium, pH, buffers' }
                            ]
                        },
                        {
                            id: 'mathematics-11',
                            name: 'Mathematics',
                            icon: '📐',
                            color: '#e85d04',
                            colorLight: '#fff0e5',
                            description: 'Build strong foundations in algebra, trigonometry and coordinate geometry.',
                            chapters: [
                                { id: 'math-11-ch1', name: 'Sets', description: 'Types of sets, Venn diagrams, set operations' },
                                { id: 'math-11-ch2', name: 'Relations and Functions', description: 'Cartesian product, types of relations, functions' },
                                { id: 'math-11-ch3', name: 'Trigonometric Functions', description: 'Trigonometric ratios, identities, equations, graphs' },
                                { id: 'math-11-ch4', name: 'Complex Numbers', description: 'Algebra of complex numbers, Argand plane, polar form' },
                                { id: 'math-11-ch5', name: 'Linear Inequalities', description: 'Algebraic and graphical solutions of inequalities' },
                                { id: 'math-11-ch6', name: 'Permutations & Combinations', description: 'Fundamental counting, permutations, combinations' },
                                { id: 'math-11-ch7', name: 'Straight Lines', description: 'Slope, equations of lines, angle between lines' }
                            ]
                        },
                        {
                            id: 'biology-11',
                            name: 'Biology',
                            icon: '🧬',
                            color: '#d62246',
                            colorLight: '#fce8ef',
                            description: 'Discover the science of life — from cells to ecosystems.',
                            chapters: [
                                { id: 'bio-11-ch1', name: 'The Living World', description: 'Biodiversity, taxonomy, nomenclature' },
                                { id: 'bio-11-ch2', name: 'Biological Classification', description: 'Five kingdom classification, features' },
                                { id: 'bio-11-ch3', name: 'Plant Kingdom', description: 'Algae, bryophytes, pteridophytes, gymnosperms' },
                                { id: 'bio-11-ch4', name: 'Animal Kingdom', description: 'Phylum classification, characteristics' },
                                { id: 'bio-11-ch5', name: 'Cell: Unit of Life', description: 'Cell theory, prokaryotic and eukaryotic cells' }
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
                            description: 'Learn the language of business — financial records and statements.',
                            chapters: [
                                { id: 'acc-11-ch1', name: 'Introduction to Accounting', description: 'Meaning, objectives, accounting terms' },
                                { id: 'acc-11-ch2', name: 'Theory Base of Accounting', description: 'GAAP, accounting principles, concepts' },
                                { id: 'acc-11-ch3', name: 'Recording Transactions', description: 'Journal, ledger, trial balance' }
                            ]
                        },
                        {
                            id: 'business-studies-11',
                            name: 'Business Studies',
                            icon: '💼',
                            color: '#2196f3',
                            colorLight: '#e3f2fd',
                            description: 'Understand business concepts, forms of organisation and trade.',
                            chapters: [
                                { id: 'bs-11-ch1', name: 'Nature of Business', description: 'Business, profession, employment' },
                                { id: 'bs-11-ch2', name: 'Forms of Business', description: 'Sole proprietorship, partnership, company' }
                            ]
                        }
                    ]
                }
            ]
        },

        // ──── CLASS 12 ────
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
                            description: 'Advanced physics — electricity, magnetism, optics and modern physics.',
                            chapters: [
                                { id: 'phy-12-ch1', name: 'Electric Charges and Fields', description: "Coulomb's law, electric field, Gauss's theorem" },
                                { id: 'phy-12-ch2', name: 'Electrostatic Potential', description: 'Potential, capacitors, energy stored' },
                                { id: 'phy-12-ch3', name: 'Current Electricity', description: "Ohm's law, Kirchhoff's rules, Wheatstone bridge" }
                            ]
                        },
                        {
                            id: 'chemistry-12',
                            name: 'Chemistry',
                            icon: '🧪',
                            color: '#06a77d',
                            colorLight: '#e0f5ef',
                            description: 'Explore solutions, electrochemistry, kinetics and organic chemistry.',
                            chapters: [
                                { id: 'chem-12-ch1', name: 'The Solid State', description: 'Crystal lattice, unit cell, defects' },
                                { id: 'chem-12-ch2', name: 'Solutions', description: "Raoult's law, colligative properties, abnormal molar mass" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};


/* ═══════════════════════════════════════════════════════
   2. STUDENT ASSIGNMENTS
   ═══════════════════════════════════════════════════════ */

var STUDENT_ASSIGNMENTS = {
    'student@sws.com': {
        classId: 'class-11',
        streamId: 'science-11',
        subjects: ['physics-11', 'chemistry-11', 'mathematics-11', 'biology-11']
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
};


/* ═══════════════════════════════════════════════════════
   3. CHAPTER CONTENT (Videos, PDFs, Live Streams)
   
   KEY   = chapter ID
   VALUE = { videos: [], liveStreams: [], studyMaterial: [] }
   
   ★ Replace YouTube IDs and Drive links with your real ones.
   ★ Later this comes from Google Sheets API automatically.
   ═══════════════════════════════════════════════════════ */

var CHAPTER_CONTENT = {

    // ──── PHYSICS CLASS 11 ────

    'phy-11-ch1': {
        videos: [
            { id: 'v1', title: 'Introduction — What is Physics?', videoId: 'dQw4w9WgXcQ', duration: '18:45', date: '2025-01-10' },
            { id: 'v2', title: 'Scope and Excitement of Physics', videoId: 'dQw4w9WgXcQ', duration: '22:30', date: '2025-01-12' },
            { id: 'v3', title: 'Physics & Technology — Real World Applications', videoId: 'dQw4w9WgXcQ', duration: '15:20', date: '2025-01-14' },
            { id: 'v4', title: 'Fundamental Forces in Nature', videoId: 'dQw4w9WgXcQ', duration: '28:10', date: '2025-01-16' }
        ],
        liveStreams: [
            { id: 'l1', title: 'Doubt Session — Physical World', videoId: 'dQw4w9WgXcQ', scheduledTime: '2025-02-10T19:00:00', isLive: false },
            { id: 'l2', title: 'Quick Revision — Complete Chapter', videoId: 'dQw4w9WgXcQ', scheduledTime: '2025-02-15T19:30:00', isLive: false }
        ],
        studyMaterial: [
            { id: 'm1', title: 'Physical World — Complete Handwritten Notes', fileSize: '2.5 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-10' },
            { id: 'm2', title: 'Physical World — NCERT Solutions', fileSize: '1.8 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-12' },
            { id: 'm3', title: 'Practice Questions — Chapter 1', fileSize: '900 KB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-15' }
        ]
    },

    'phy-11-ch2': {
        videos: [
            { id: 'v5', title: 'SI Units — International System', videoId: 'dQw4w9WgXcQ', duration: '20:15', date: '2025-01-18' },
            { id: 'v6', title: 'Dimensional Analysis — Part 1', videoId: 'dQw4w9WgXcQ', duration: '25:40', date: '2025-01-20' },
            { id: 'v7', title: 'Dimensional Analysis — Part 2', videoId: 'dQw4w9WgXcQ', duration: '22:10', date: '2025-01-22' },
            { id: 'v8', title: 'Significant Figures & Rounding', videoId: 'dQw4w9WgXcQ', duration: '18:55', date: '2025-01-24' },
            { id: 'v9', title: 'Errors in Measurement', videoId: 'dQw4w9WgXcQ', duration: '30:00', date: '2025-01-26' },
            { id: 'v10', title: 'Numericals — Units & Measurements', videoId: 'dQw4w9WgXcQ', duration: '35:20', date: '2025-01-28' }
        ],
        liveStreams: [
            { id: 'l3', title: 'Live Problem Solving — Dimensions', videoId: 'dQw4w9WgXcQ', scheduledTime: '2025-02-12T19:00:00', isLive: true }
        ],
        studyMaterial: [
            { id: 'm4', title: 'Units & Measurements — Handwritten Notes', fileSize: '3.1 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-18' },
            { id: 'm5', title: 'Dimensional Formula Sheet', fileSize: '500 KB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-20' },
            { id: 'm6', title: 'NCERT Solutions — Chapter 2', fileSize: '2.2 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-22' }
        ]
    },

    'phy-11-ch3': {
        videos: [
            { id: 'v11', title: 'Position, Path Length & Displacement', videoId: 'dQw4w9WgXcQ', duration: '24:30', date: '2025-01-30' },
            { id: 'v12', title: 'Average & Instantaneous Velocity', videoId: 'dQw4w9WgXcQ', duration: '28:15', date: '2025-02-01' },
            { id: 'v13', title: 'Acceleration — Uniform & Non-uniform', videoId: 'dQw4w9WgXcQ', duration: '22:00', date: '2025-02-03' },
            { id: 'v14', title: 'Kinematic Equations Derivation', videoId: 'dQw4w9WgXcQ', duration: '32:45', date: '2025-02-05' },
            { id: 'v15', title: 'Graphs — x-t, v-t, a-t', videoId: 'dQw4w9WgXcQ', duration: '26:10', date: '2025-02-07' },
            { id: 'v16', title: 'Free Fall & Vertical Motion', videoId: 'dQw4w9WgXcQ', duration: '20:30', date: '2025-02-09' },
            { id: 'v17', title: 'Relative Velocity', videoId: 'dQw4w9WgXcQ', duration: '18:50', date: '2025-02-11' },
            { id: 'v18', title: 'Numericals — Motion in Straight Line', videoId: 'dQw4w9WgXcQ', duration: '40:00', date: '2025-02-13' }
        ],
        liveStreams: [],
        studyMaterial: [
            { id: 'm7', title: 'Motion in Straight Line — Notes', fileSize: '4.0 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-30' },
            { id: 'm8', title: 'Kinematics Formula Sheet', fileSize: '600 KB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-01' },
            { id: 'm9', title: 'Previous Year Questions — Kinematics', fileSize: '1.5 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-05' },
            { id: 'm10', title: 'NCERT Solutions — Chapter 3', fileSize: '2.8 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-08' }
        ]
    },

    'phy-11-ch4': {
        videos: [
            { id: 'v19', title: 'Scalars and Vectors', videoId: 'dQw4w9WgXcQ', duration: '22:00', date: '2025-02-15' },
            { id: 'v20', title: 'Vector Addition — Triangle & Parallelogram', videoId: 'dQw4w9WgXcQ', duration: '26:30', date: '2025-02-17' },
            { id: 'v21', title: 'Resolution of Vectors', videoId: 'dQw4w9WgXcQ', duration: '20:15', date: '2025-02-19' },
            { id: 'v22', title: 'Projectile Motion — Complete', videoId: 'dQw4w9WgXcQ', duration: '35:00', date: '2025-02-21' }
        ],
        liveStreams: [
            { id: 'l4', title: 'Projectile Motion Masterclass', videoId: 'dQw4w9WgXcQ', scheduledTime: '2025-02-25T19:00:00', isLive: false }
        ],
        studyMaterial: [
            { id: 'm11', title: 'Vectors & Projectile — Notes', fileSize: '3.5 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-15' },
            { id: 'm12', title: 'Vector Formulas Cheat Sheet', fileSize: '400 KB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-17' }
        ]
    },

    'phy-11-ch5': {
        videos: [
            { id: 'v23', title: "Newton's First Law — Inertia", videoId: 'dQw4w9WgXcQ', duration: '20:00', date: '2025-02-23' },
            { id: 'v24', title: "Newton's Second Law — F = ma", videoId: 'dQw4w9WgXcQ', duration: '28:30', date: '2025-02-25' },
            { id: 'v25', title: "Newton's Third Law — Action Reaction", videoId: 'dQw4w9WgXcQ', duration: '18:45', date: '2025-02-27' },
            { id: 'v26', title: 'Friction — Static & Kinetic', videoId: 'dQw4w9WgXcQ', duration: '32:00', date: '2025-03-01' },
            { id: 'v27', title: 'Circular Motion Dynamics', videoId: 'dQw4w9WgXcQ', duration: '25:20', date: '2025-03-03' }
        ],
        liveStreams: [],
        studyMaterial: [
            { id: 'm13', title: 'Laws of Motion — Complete Notes', fileSize: '4.2 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-23' },
            { id: 'm14', title: 'FBD Practice Problems', fileSize: '1.8 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-02-25' }
        ]
    },

    // ──── CHEMISTRY CLASS 11 ────

    'chem-11-ch1': {
        videos: [
            { id: 'v30', title: 'Introduction — What is Chemistry?', videoId: 'dQw4w9WgXcQ', duration: '16:20', date: '2025-01-10' },
            { id: 'v31', title: 'Mole Concept — Complete', videoId: 'dQw4w9WgXcQ', duration: '35:00', date: '2025-01-13' },
            { id: 'v32', title: 'Stoichiometry & Balancing', videoId: 'dQw4w9WgXcQ', duration: '28:30', date: '2025-01-16' }
        ],
        liveStreams: [],
        studyMaterial: [
            { id: 'm20', title: 'Basic Concepts — Notes', fileSize: '2.0 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-10' },
            { id: 'm21', title: 'Mole Concept Formula Sheet', fileSize: '700 KB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-13' }
        ]
    },

    'chem-11-ch2': {
        videos: [
            { id: 'v33', title: 'Bohr Model of Atom', videoId: 'dQw4w9WgXcQ', duration: '30:00', date: '2025-01-20' },
            { id: 'v34', title: 'Quantum Numbers Explained', videoId: 'dQw4w9WgXcQ', duration: '25:15', date: '2025-01-23' },
            { id: 'v35', title: 'Electron Configuration', videoId: 'dQw4w9WgXcQ', duration: '22:40', date: '2025-01-26' }
        ],
        liveStreams: [
            { id: 'l5', title: 'Doubt Session — Atomic Structure', videoId: 'dQw4w9WgXcQ', scheduledTime: '2025-02-18T20:00:00', isLive: false }
        ],
        studyMaterial: [
            { id: 'm22', title: 'Structure of Atom — Notes', fileSize: '3.4 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-20' }
        ]
    },

    // ──── MATHEMATICS CLASS 11 ────

    'math-11-ch1': {
        videos: [
            { id: 'v40', title: 'Types of Sets — Finite, Infinite, Empty', videoId: 'dQw4w9WgXcQ', duration: '18:30', date: '2025-01-11' },
            { id: 'v41', title: 'Venn Diagrams & Set Operations', videoId: 'dQw4w9WgXcQ', duration: '24:00', date: '2025-01-14' },
            { id: 'v42', title: 'Numericals — Sets', videoId: 'dQw4w9WgXcQ', duration: '30:15', date: '2025-01-17' }
        ],
        liveStreams: [],
        studyMaterial: [
            { id: 'm30', title: 'Sets — Handwritten Notes', fileSize: '1.5 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-11' }
        ]
    },

    // ──── BIOLOGY CLASS 11 ────

    'bio-11-ch1': {
        videos: [
            { id: 'v50', title: 'What is Life? — Characteristics', videoId: 'dQw4w9WgXcQ', duration: '20:00', date: '2025-01-12' },
            { id: 'v51', title: 'Taxonomy & Nomenclature', videoId: 'dQw4w9WgXcQ', duration: '25:30', date: '2025-01-15' }
        ],
        liveStreams: [],
        studyMaterial: [
            { id: 'm40', title: 'Living World — Notes', fileSize: '2.1 MB', driveLink: 'https://drive.google.com/file/d/SAMPLE/view', date: '2025-01-12' }
        ]
    }
};


/* ═══════════════════════════════════════════════════════
   4. HELPER FUNCTIONS (used by all pages)
   ═══════════════════════════════════════════════════════ */

function findById(arr, id) {
    if (!arr) return null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return arr[i];
    }
    return null;
}

function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
}

function getLoggedInUser() {
    try {
        return JSON.parse(localStorage.getItem('sws_user'));
    } catch (e) {
        return null;
    }
}

function getStudentAssignment(email) {
    return STUDENT_ASSIGNMENTS[email] || null;
}

function resolveSubject(subjectId) {
    for (var c = 0; c < MASTER_DATA.classes.length; c++) {
        var cls = MASTER_DATA.classes[c];
        for (var s = 0; s < cls.streams.length; s++) {
            var stream = cls.streams[s];
            for (var sb = 0; sb < stream.subjects.length; sb++) {
                if (stream.subjects[sb].id === subjectId) {
                    return {
                        classData: cls,
                        streamData: stream,
                        subjectData: stream.subjects[sb]
                    };
                }
            }
        }
    }
    return null;
}

function resolveChapter(subjectId, chapterId) {
    var resolved = resolveSubject(subjectId);
    if (!resolved) return null;
    var chapter = findById(resolved.subjectData.chapters, chapterId);
    if (!chapter) return null;
    return {
        classData: resolved.classData,
        streamData: resolved.streamData,
        subjectData: resolved.subjectData,
        chapterData: chapter
    };
}

function getChapterContent(chapterId) {
    return CHAPTER_CONTENT[chapterId] || { videos: [], liveStreams: [], studyMaterial: [] };
}

function extractVideoId(url) {
    if (!url) return '';
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?\s]{11})/);
    return match ? match[1] : url.trim();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return dateStr; }
}

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) +
            ', ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return dateStr; }
}

function darkenColor(hex) {
    if (!hex) return '#1a1a6e';
    var num = parseInt(hex.replace('#', ''), 16);
    var r = Math.max((num >> 16) - 50, 0);
    var g = Math.max(((num >> 8) & 0x00FF) - 50, 0);
    var b = Math.max((num & 0x0000FF) - 50, 0);
    return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

function checkStudentAccess(subjectId) {
    var user = getLoggedInUser();
    if (!user) return false;
    var assignment = getStudentAssignment(user.email);
    if (!assignment) return false;
    return assignment.subjects.indexOf(subjectId) !== -1;
}