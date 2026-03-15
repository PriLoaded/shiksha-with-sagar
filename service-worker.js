var CACHE_NAME = 'sws-v7';

var FILES = [
    './',
    './index.html',
    './splash.html',
    './login.html',
    './student-dashboard.html',
    './subject-page.html',
    './chapter-page.html',
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
    './script.js',
    './js/splash.js',
    './js/login.js',
    './js/app-data.js',
    './js/student-dashboard.js',
    './js/content-pages.js',
    './admin.js',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.map(function(name) {
                    if (name !== CACHE_NAME) return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    if (e.request.url.indexOf('script.google.com') !== -1) return;
    if (e.request.url.indexOf('fonts.googleapis.com') !== -1) return;
    if (e.request.url.indexOf('fonts.gstatic.com') !== -1) return;

    e.respondWith(
        fetch(e.request)
            .then(function(r) { return r; })
            .catch(function() { return caches.match(e.request); })
    );
});