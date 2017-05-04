const OFF = 0
const WARN = 1
const ERR = 2

const unusedVars = [
  'd', // debug
]

const config = {
  extends: 'comakery',
  globals: {
    'window': false,
  },
  rules: {
    'complexity': [ERR, { 'max': 4 }],
    'jsx-quotes': [ERR, 'prefer-double'],
    'no-debugger': OFF,
    'no-unused-vars': [WARN, { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^(' + unusedVars.join('|') + ')$' }],
    'no-warning-comments': OFF,
    'promise/always-return': OFF,
    'promise/catch-or-return': OFF,
    'react/prop-types': OFF,
  },
}

module.exports = config
