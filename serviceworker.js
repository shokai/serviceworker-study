console.log('start')

self.addEventListener('install', event => {
  console.log('installed')
  console.log('setup cache')
  event.waitUntil(() => self.caches.open('v1').then(cache => cache.addAll([
    '/',
    '/index.html',
    '/index.js',
    '/style.css',
    'https://gyazo.com/47e66e4320b296c61d9dc8584834b7f6/thumb/1000'
  ])))
})

self.addEventListener('fetch', event => {
  console.log(event)
  const {request} = event

  event.respondWith((async () => {
    const cachedResponse = await self.caches.match(request)
    if (cachedResponse) {
      console.log('cache hit!', request.url)
      return cachedResponse
    }

    const response = await self.fetch(request)
    const cache = await self.caches.open('v1')
    cache.put(request, response)
    return response
  })())
})
