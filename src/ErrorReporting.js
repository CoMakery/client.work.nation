// Set up Raven ( sentry.io ) error reporter as early as possible:
import Raven from 'raven-js'

const raven = Raven.config('https://0fbb46c5ecb54c63ac8a84db7c7c17e3@sentry.io/161843', {
  environment: process.env.NODE_ENV,
  debug: true,
  // more options here: https://docs.sentry.io/clients/javascript/config/
})

raven.install()
