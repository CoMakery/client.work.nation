#!/usr/bin/env node -r babel-register

import { json, d, run } from 'lightsaber'

const {argv, exit} = process

if (argv.length !== 3) {
  console.error(`Usage: deploy APP_NAME\nGot: ${json(argv)}`)
  exit(1)
}

const appName = argv[2]
// const surgeApp = `client-worknation-${appName}`

run(`rm -rf ./build`)
run(`REACT_APP_API_SERVER=https://worknation-${appName}.herokuapp.com yarn build`)
run('mv build/index.html build/200.html')
run(`surge build --domain ${appName}.worknation.io`)
