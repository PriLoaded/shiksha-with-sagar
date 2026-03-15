/* =====================================================
   SHIKSHA WITH SAGAR — LOGIN SYSTEM
   
   Demo Authentication using localStorage
   No backend needed — credentials stored locally
   
   =====================================================
   
   DEFAULT DEMO ACCOUNTS:
   
   Student:
     Email:    student@sws.com
     Password: student123
   
   Admin:
     Username: admin
     Password: admin123
   
   You can change these below ↓
   ===================================================== */


/* ═══════════════════════════════════════════════════════
   🔧 CONFIGURATION — Change credentials here
   ═══════════════════════════════════════════════════════ */

// Student demo accounts (add as many as you want)
var DEMO_STUDENTS = [
    {
        email: 'student@sws.com',
        password: 'student123',
        name: 'Demo Student',
        classId: 'class-11',
        streamId: 'science-11'
    },
    {
        email: 'rahul@sws.com',
        password: 'rahul123',
        name: 'Rahul Sharma',
        classId: 'class-11',
        streamId: 'science-11'
    },
    {
        email: 'priya@sws.com',
        password: 'priya123',
        name: 'Priya Singh',
        classId: 'class-12',
        streamId: 'science-12'
    }
];

// Admin account
var ADMIN_USERNAME = 'admin';
var ADMIN_PASSWORD = 'admin123';
var ADMIN_NAME     = 'Sagar Sir';

// Where to redirect after login
var STUDENT_REDIRECT = 'student-dashboard.html';
var ADMIN_REDIRECT   = 'admin/admin-dashboard.html';


/* ═══════════════════════════════════════════════════════
   ⛔ DO NOT EDIT BELOW (unless you know JavaScript)
   ═══════════════════════════════════════════════════════ */

var currentRole = 'student';


/* ─── CHECK IF ALREADY LOGGED IN ─────────────────── */
(function checkExistingLogin() {
    var saved = localStorage.getItem('sws_user');
    if (saved) {
        try {
            var user = JSON.parse(saved);
            if (user && user.role === 'student') {
                window.location.replace(STUDENT_REDIRECT);
                return;
            }
            if (user && user.role === 'admin') {
                window.location.replace(ADMIN_REDIRECT);
                return;
            }
        } catch (e) {
            localStorage.removeItem('sws_user');
        }
    }
})();


/* ─── ROLE TAB SWITCHING ─────────────────────────── */
function switchRole(role) {
    currentRole = role;

    // Update tab buttons
    document.getElementById('tab-student').classList.remove('active');
    document.getElementById('tab-admin').classList.remove('active');
    document.getElementById('tab-' + role).classList.add('active');

    // Slide indicator
    var indicator = document.getElementById('tab-indicator');
    if (role === 'admin') {
        indicator.classList.add('right');
    } else {
        indicator.classList.remove('right');
    }

    // Show correct card
    document.getElementById('card-student').classList.remove('active');
    document.getElementById('card-admin').classList.remove('active');
    document.getElementById('card-' + role).classList.add('active');

    // Clear any errors
    clearAllErrors();
}


/* ─── STUDENT LOGIN ──────────────────────────────── */
function handleStudentLogin(e) {
    e.preventDefault();

    var email    = document.getElementById('s-email').value.trim();
    var password = document.getElementById('s-password').value;
    var remember = document.getElementById('s-remember').checked;

    // Validate
    var valid = true;

    if (!email) {
        setError('sg-email', 'Please enter your email or username');
        valid = false;
    }

    if (!password) {
        setError('sg-pass', 'Please enter your password');
        valid = false;
    } else if (password.length < 4) {
        setError('sg-pass', 'Password must be at least 4 characters');
        valid = false;
    }

    if (!valid) return;

    // Show loading state
    setBtnLoading('s', true);

    // Simulate network delay (feels more real)
    setTimeout(function () {

        // Check credentials
        var foundUser = null;
        for (var i = 0; i < DEMO_STUDENTS.length; i++) {
            var s = DEMO_STUDENTS[i];
            if ((s.email.toLowerCase() === email.toLowerCase() || email.toLowerCase() === s.email.split('@')[0].toLowerCase())
                && s.password === password) {
                foundUser = s;
                break;
            }
        }

        if (foundUser) {
            // Success
            var userData = {
                role: 'student',
                name: foundUser.name,
                email: foundUser.email,
                loginTime: new Date().toISOString()
            };

            if (remember) {
                localStorage.setItem('sws_user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('sws_user', JSON.stringify(userData));
                localStorage.setItem('sws_user', JSON.stringify(userData));
            }

            showToast('Welcome back, ' + foundUser.name + '! 🎉', 'success');

            setTimeout(function () {
                window.location.href = STUDENT_REDIRECT;
            }, 1200);

        } else {
            // Failed
            setBtnLoading('s', false);
            showToast('Invalid email or password. Try again.', 'error');
            setError('sg-email', 'Check your email or username');
            setError('sg-pass', 'Check your password');

            // Shake the card
            shakeCard('card-student');
        }

    }, 1500);
}


/* ─── ADMIN LOGIN ────────────────────────────────── */
function handleAdminLogin(e) {
    e.preventDefault();

    var username = document.getElementById('a-username').value.trim();
    var password = document.getElementById('a-password').value;
    var remember = document.getElementById('a-remember').checked;

    // Validate
    var valid = true;

    if (!username) {
        setError('ag-user', 'Please enter admin username');
        valid = false;
    }

    if (!password) {
        setError('ag-pass', 'Please enter admin password');
        valid = false;
    }

    if (!valid) return;

    // Show loading
    setBtnLoading('a', true);

    setTimeout(function () {

        if (username.toLowerCase() === ADMIN_USERNAME.toLowerCase() && password === ADMIN_PASSWORD) {
            // Success
            var adminData = {
                role: 'admin',
                name: ADMIN_NAME,
                username: username,
                loginTime: new Date().toISOString()
            };

            if (remember) {
                localStorage.setItem('sws_user', JSON.stringify(adminData));
            } else {
                sessionStorage.setItem('sws_user', JSON.stringify(adminData));
                localStorage.setItem('sws_user', JSON.stringify(adminData));
            }

            // Also set admin session for the existing admin panel compatibility
            sessionStorage.setItem('sws_admin', password);

            showToast('Welcome, ' + ADMIN_NAME + '! 🔐', 'success');

            setTimeout(function () {
                window.location.href = ADMIN_REDIRECT;
            }, 1200);

        } else {
            setBtnLoading('a', false);
            showToast('Wrong admin credentials. Access denied.', 'error');
            setError('ag-user', 'Check your username');
            setError('ag-pass', 'Check your password');
            shakeCard('card-admin');
        }

    }, 1500);
}


/* ─── INPUT ERROR HANDLING ───────────────────────── */
function setError(groupId, message) {
    var group = document.getElementById(groupId);
    if (!group) return;
    group.classList.add('error');
    var errorSpan = group.querySelector('.input-error');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function clearError(groupId) {
    var group = document.getElementById(groupId);
    if (!group) return;
    group.classList.remove('error');
    var errorSpan = group.querySelector('.input-error');
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

function clearAllErrors() {
    document.querySelectorAll('.input-group').forEach(function (g) {
        g.classList.remove('error');
        var errorSpan = g.querySelector('.input-error');
        if (errorSpan) errorSpan.textContent = '';
    });
}


/* ─── BUTTON LOADING STATE ───────────────────────── */
function setBtnLoading(prefix, loading) {
    var btn     = document.getElementById(prefix + '-login-btn');
    var btnText = document.getElementById(prefix + '-btn-text');
    var btnLoad = document.getElementById(prefix + '-btn-loader');

    if (!btn || !btnText || !btnLoad) return;

    if (loading) {
        btn.disabled = true;
        btnText.classList.add('hidden');
        btnLoad.classList.remove('hidden');
    } else {
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoad.classList.add('hidden');
    }
}


/* ─── CARD SHAKE ANIMATION ───────────────────────── */
function shakeCard(cardId) {
    var card = document.getElementById(cardId);
    if (!card) return;
    card.style.animation = 'none';
    card.offsetHeight; /* trigger reflow */
    card.style.animation = 'shake 0.5s ease';
}


/* ─── PASSWORD VISIBILITY TOGGLE ─────────────────── */
function togglePassword(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        btn.classList.add('showing');
        btn.querySelector('.eye-icon').textContent = '🙈';
    } else {
        input.type = 'password';
        btn.classList.remove('showing');
        btn.querySelector('.eye-icon').textContent = '👁️';
    }
}


/* ─── TOAST NOTIFICATION ─────────────────────────── */
var toastTimer = null;

function showToast(message, type) {
    var toast   = document.getElementById('toast');
    var icon    = document.getElementById('toast-icon');
    var msg     = document.getElementById('toast-msg');
    if (!toast || !msg) return;

    // Clear any existing timeout
    if (toastTimer) clearTimeout(toastTimer);

    // Set content
    msg.textContent = message;
    toast.className = 'toast ' + (type || 'info');

    // Set icon
    switch (type) {
        case 'success': icon.textContent = '✅'; break;
        case 'error':   icon.textContent = '❌'; break;
        case 'info':    icon.textContent = 'ℹ️'; break;
        default:        icon.textContent = '💬'; break;
    }

    // Show
    toast.classList.remove('hidden');
    requestAnimationFrame(function () {
        toast.classList.add('show');
    });

    // Auto hide after 3 seconds
    toastTimer = setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () {
            toast.classList.add('hidden');
        }, 400);
    }, 3500);
}


/* ─── KEYBOARD SHORTCUT ──────────────────────────── */
document.addEventListener('keydown', function (e) {
    // Press Tab to switch between Student/Admin
    if (e.key === 'Tab' && document.activeElement === document.body) {
        e.preventDefault();
        switchRole(currentRole === 'student' ? 'admin' : 'student');
    }
});


/* ─── ADD SHAKE KEYFRAME (dynamically) ───────────── */
(function addShakeAnimation() {
    var style = document.createElement('style');
    style.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-4px)}20%,40%,60%,80%{transform:translateX(4px)}}';
    document.head.appendChild(style);
})();