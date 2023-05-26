module.exports = {
  'env': {
    'node': true,
    'es2022': true,
    'jest': true,
  },
  'parserOptions': {
    'sourceType': 'script',
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'prefer-const': [ 'error' ],
    'eol-last': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline'],
    'no-case-declarations': [0],
  },
};
