// Set up Raven ( sentry.io ) error reporter as early as possible:

if (process.env.NODE_ENV === 'production') {
  const Raven = require('raven-js')

  const raven = Raven.config('https://0fbb46c5ecb54c63ac8a84db7c7c17e3@sentry.io/161843', {
    environment: process.env.NODE_ENV,
    debug: true,
    // more options here: https://docs.sentry.io/clients/javascript/config/
  })

  raven.install()
}

// report errors in console:
window.localStorage.debug = 'wn:error'
