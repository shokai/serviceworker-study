console.log('start')

addEventListener('install', e => {
  console.log('installed')
  console.log('setup cache')
  e.waitUntil(() => caches.open('v1').then(cache => cache.addAll([
    '/',
    '/index.html',
    '/index.js',
    '/style.css',
    'https://gyazo.com/47e66e4320b296c61d9dc8584834b7f6/thumb/1000'
  ])))
})

addEventListener('fetch', e => {
  console.log(e)

  return e.respondWith(caches.match(e.request).then(cacheResult => {
    if (cacheResult !== undefined) {
      console.log('cache hit', e)
      return cacheResult
    }
    return fetch(e.request).then(fetchResult => {
      const fetchResultClone = fetchResult.clone()
      caches.open('v1').then(cache => {
        cache.put(e.request, fetchResultClone)
      })
      return fetchResult
    })
  }))
})
