var CACHE_NAME = 'sws-v9';

var FILES = [
    './',
    './index.html',
    './splash.html',
    './login.html',
    './student-dashboard.html',
    './subject-page.html',
    './chapter-page.html',
    './video-player.html',
    './videos.html',
    './livestreams.html',
    './study-material.html',
    './announcements.html',
    './admin.html',
    './admin/admin-dashboard.html',
    './style.css',
    './css/splash.css',
    './css/login.css',
    './css/student-dashboard.css',
    './css/content-pages.css',
    './css/video-player.css',
    './css/admin.css',
    './script.js',
    './js/splash.js',
    './js/login.js',
    './js/app-data.js',
    './js/student-dashboard.js',
    './js/content-pages.js',
    './js/video-player.js',
    './js/admin-panel.js',
    './admin.js',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(FILES); }));
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(caches.keys().then(function(names) {
        return Promise.all(names.map(function(n) { if(n!==CACHE_NAME) return caches.delete(n); }));
    }));
    self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    if (e.request.url.indexOf('script.google.com')!==-1) return;
    if (e.request.url.indexOf('fonts.googleapis.com')!==-1) return;
    if (e.request.url.indexOf('fonts.gstatic.com')!==-1) return;
    if (e.request.url.indexOf('youtube.com')!==-1) return;
    if (e.request.url.indexOf('img.youtube.com')!==-1) return;
    e.respondWith(
        fetch(e.request).then(function(r){return r;}).catch(function(){return caches.match(e.request);})
    );
});