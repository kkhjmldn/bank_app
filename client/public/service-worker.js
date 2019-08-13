//service-worker.js
//kkhjmldn

/* eslint-disable no-restricted-globals */
var doCache = false;

var CACHE_NAME = 'bank_app_cache'

self.addEventListener(
    'activate', event => {
        const currentCacheList = [CACHE_NAME]
        event.waitUntil(
            caches.keys()
            .then(keyList => 
                Promise.all(keyList.map(key => {
                    if(!currentCacheList.includes(key)) {
                        return caches.delete(key)
                    }
                })))
        )
    }
)

self.addEventListener(
    'install' , function(event) {
        if (doCache) {
            event.waitUntil(
                caches.open(CACHE_NAME)
                .then(function (cache) {
                    fetch('assets-manifest.json')
                    .then(response => {
                        response.json()
                    })
                    .then( assets => {
                        const urlsToCache = [
                            '/',
                            assets['main.js']
                        ]
                    })
                })
            )
        }
    }
)

self.addEventListener(
    'fetch', function (event) {
        if (doCache) {
            event.respondWidth(
                caches.match(event.request)
                .then(function (response) {
                    return response || fetch(event.request)
                })
            )
        }
    }
)