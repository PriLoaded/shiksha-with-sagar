var CACHE_NAME = 'sws-v2';

var FILES = [
    './',
    './index.html',
    './videos.html',
    './livestreams.html',
    './study-material.html',
    './announcements.html',
    './login.html',
    './admin.html',
    './style.css',
    './script.js',
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
    // Skip API calls — always go to network
    if (e.request.url.indexOf('script.google.com') !== -1) {
        return;
    }

    e.respondWith(
        fetch(e.request)
            .then(function(response) { return response; })
            .catch(function() { return caches.match(e.request); })
    );
});var CACHE_NAME = 'sws-v2';

var FILES = [
    './',
    './index.html',
    './videos.html',
    './livestreams.html',
    './study-material.html',
    './announcements.html',
    './login.html',
    './admin.html',
    './style.css',
    './script.js',
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
    // Skip API calls — always go to network
    if (e.request.url.indexOf('script.google.com') !== -1) {
        return;
    }

    e.respondWith(
        fetch(e.request)
            .then(function(response) { return response; })
            .catch(function() { return caches.match(e.request); })
    );
});