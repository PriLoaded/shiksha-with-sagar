/* =====================================================
   SHIKSHA WITH SAGAR — SPLASH SCREEN LOGIC
   
   This script handles:
   • Background particle animations
   • Loading bar progress
   • Loading status text changes
   • Smooth redirect to login page after 3 seconds
   ===================================================== */


/* ─── CONFIGURATION ──────────────────────────────────
   You can change these settings:                       */

var SPLASH_DURATION   = 5000;           // Total splash time in ms (3000 = 3 seconds)
var REDIRECT_PAGE     = 'index.html';   // Page to go to after splash
var PARTICLE_COUNT    = 20;             // Number of floating particles


/* ─── LOADING STATUS MESSAGES ──────────────────────── */
var loadingMessages = [
    'Preparing your lessons...',
    'Loading study materials...',
    'Setting up your classroom...',
    'Almost ready...',
    'Welcome to Shiksha With Sagar!'
];


/* ═══════════════════════════════════════════════════════
   PARTICLE SYSTEM — Floating dots in background
   ═══════════════════════════════════════════════════════ */
function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';

        // Random size
        var size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Random color
        var colors = [
            'rgba(255, 107, 53, 0.4)',    // orange
            'rgba(255, 215, 0, 0.3)',      // gold
            'rgba(74, 74, 191, 0.4)',      // blue
            'rgba(6, 214, 160, 0.3)',      // green
            'rgba(255, 255, 255, 0.15)'    // white
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Random animation duration and delay
        var duration = Math.random() * 6 + 4;
        var delay = Math.random() * 4;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}


/* ═══════════════════════════════════════════════════════
   LOADING BAR ANIMATION
   ═══════════════════════════════════════════════════════ */
function animateLoadingBar() {
    var bar = document.getElementById('loading-bar');
    var textEl = document.getElementById('loading-text');
    if (!bar) return;

    var startTime = Date.now();
    var totalTime = SPLASH_DURATION - 500; // Leave 500ms for fade out

    // Change loading text at intervals
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

    // Animate the bar width smoothly
    function updateBar() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min((elapsed / totalTime) * 100, 100);

        // Ease-out curve for natural feel
        var easedProgress = 100 * (1 - Math.pow(1 - progress / 100, 3));
        bar.style.width = easedProgress + '%';

        if (progress < 100) {
            requestAnimationFrame(updateBar);
        }
    }

    // Start bar animation after a small delay (wait for CSS animations)
    setTimeout(function () {
        requestAnimationFrame(updateBar);
    }, 1600);
}


/* ═══════════════════════════════════════════════════════
   REDIRECT AFTER SPLASH
   ═══════════════════════════════════════════════════════ */
function startRedirectTimer() {
    setTimeout(function () {
        var splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('fade-out');
        }

        // Wait for fade animation to finish, then redirect
        setTimeout(function () {
            window.location.href = REDIRECT_PAGE;
        }, 700);

    }, SPLASH_DURATION);
}


/* ═══════════════════════════════════════════════════════
   INITIALIZE EVERYTHING
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    animateLoadingBar();
    startRedirectTimer();
});