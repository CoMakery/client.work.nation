# Work.nation Client

[![Build Status](https://travis-ci.org/worknation/client.work.nation.svg?branch=master)](https://travis-ci.org/worknation/client.work.nation)

<!-- ## Live demo -->

<!-- https://demo.worknation.io -->

## Local development

```
yarn && yarn dev
```

The dev server is quite particular about whitespace and other linting issues.
To fix trivial issues, just run `yarn lint`.

<!-- If you want to run a server, see also _Work.nation Server_. -->

## Heroku deploy

If deploying on Heroku, the following buildback is highly recommended:

```
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git#v4.0.0
```

You can leave off the version if you prefer to pull from master.

## Dev Notes: React Router

- React Router examples: https://reacttraining.com/react-router/web/example/basic
- Regular expression in paths: https://github.com/pillarjs/path-to-regexp#usage
- Layouts: https://simonsmith.io/reusing-layouts-in-react-router-4/