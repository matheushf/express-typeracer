module.exports = {
  'extends': 'airbnb-base',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
    'node': true, // this is the best starting point
    'browser': false,
    'es6': true // enables es6 features
  },
  'plugins': [
  ],
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-use-before-define': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-alert': 'off',
    "import/no-extraneous-dependencies": "off",
    'prefer-promise-reject-errors': 'off'
  },
  'globals': {
    'fetch': false,
    'require': true,
  }
}
