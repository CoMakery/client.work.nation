#!/usr/bin/env node -r babel-register

import { json, d, run } from 'lightsaber'

const {argv, exit} = process

if (argv.length !== 3) {
  console.error(`Usage: deploy APP_NAME\nGot: ${json(argv)}`)
  exit(1)
}

const appName = argv[2]

const herokuApp = `client-worknation-${appName}`
const herokuRemote = `https://git.heroku.com/${herokuApp}.git`
// const herokuRemote = `git@heroku.com:${herokuApp}.git`
// run('git fetch --unshallow', {relaxed: true})  // Some CI services fetches git shallowly, which can cause failures pushing to heroku
const deployResult = run(`git push --force ${herokuRemote} HEAD:refs/heads/master`, {relaxed: true}).code
const restart = `heroku restart --app ${herokuApp}`  // sometimes deploys and config changes do not trigger restart!
run([restart, restart, restart, restart, restart, restart, restart].join(' || '))

process.exit(deployResult)
