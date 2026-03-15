var CACHE_NAME = 'sws-v3';   // ← Changed from v2 to v3

var FILES = [
    './',
    './splash.html',
    './index.html',
    './videos.html',
    './livestreams.html',
    './study-material.html',
    './announcements.html',
    './login.html',
    './admin.html',
    './style.css',
    './css/splash.css',
    './script.js',
    './js/splash.js',
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
    if (e.request.url.indexOf('script.google.com') !== -1) {
        return;
    }
    e.respondWith(
        fetch(e.request)
            .then(function(response) { return response; })
            .catch(function() { return caches.match(e.request); })
    );
});