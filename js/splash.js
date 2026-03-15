/* =====================================================
   SHIKSHA WITH SAGAR — SPLASH SCREEN LOGIC
   Redirects to index.html (Home Page) after loading
   ===================================================== */

var SPLASH_DURATION   = 3000;
var REDIRECT_PAGE     = 'index.html';    // ← Goes to home page now
var PARTICLE_COUNT    = 20;

var loadingMessages = [
    'Preparing your lessons...',
    'Loading study materials...',
    'Setting up your classroom...',
    'Almost ready...',
    'Welcome to Shiksha With Sagar!'
];


/* ─── PARTICLES ──────────────────────────────────── */
function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';

        var size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';

        var colors = [
            'rgba(255, 107, 53, 0.4)',
            'rgba(255, 215, 0, 0.3)',
            'rgba(74, 74, 191, 0.4)',
            'rgba(6, 214, 160, 0.3)',
            'rgba(255, 255, 255, 0.15)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        var duration = Math.random() * 6 + 4;
        var delay = Math.random() * 4;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}


/* ─── LOADING BAR ────────────────────────────────── */
function animateLoadingBar() {
    var bar = document.getElementById('loading-bar');
    var textEl = document.getElementById('loading-text');
    if (!bar) return;

    var startTime = Date.now();
    var totalTime = SPLASH_DURATION - 500;

    var messageIndex = 0;
    var messageInterval = totalTime / loadingMessages.length;

    var textTimer = setInterval(function () {
        messageIndex++;
        if (messageIndex < loadingMessages.length && textEl) {
            textEl.style.opacity = '0';
            setTimeout(function () {
                textEl.textContent = loadingMessages[messageIndex];
                textEl.style.opacity = '1';
            }, 200);
        }
        if (messageIndex >= loadingMessages.length - 1) {
            clearInterval(textTimer);
        }
    }, messageInterval);

    function updateBar() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min((elapsed / totalTime) * 100, 100);
        var easedProgress = 100 * (1 - Math.pow(1 - progress / 100, 3));
        bar.style.width = easedProgress + '%';

        if (progress < 100) {
            requestAnimationFrame(updateBar);
        }
    }

    setTimeout(function () {
        requestAnimationFrame(updateBar);
    }, 1600);
}


/* ─── REDIRECT TO HOME PAGE ──────────────────────── */
function startRedirectTimer() {
    setTimeout(function () {

        // Mark splash as done so index.html doesn't loop back
        sessionStorage.setItem('sws_splash_done', 'true');

        // Fade out animation
        var splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('fade-out');
        }

        // Redirect after fade finishes
        setTimeout(function () {
            window.location.replace(REDIRECT_PAGE);
        }, 700);

    }, SPLASH_DURATION);
}


/* ─── INITIALIZE ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    animateLoadingBar();
    startRedirectTimer();
});