const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute( // Define runtime caching rules.
runtimeCaching [{
  // Match any request that ends with .png, .jpg, .jpeg or .svg.
  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

  // Apply a cache-first strategy.
  handler: 'CacheFirst',

  options: {
    // Use a custom cache name.
    cacheName: 'asset cache',

    // Only cache 2 images.
    expiration: {
      Static,
    },
  },
}]

);


