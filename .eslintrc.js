module.exports = {
  env: {
    mocha: true,
    node: true
  },
  globals: {
    assertNoError: true,
    should: true
  },
  extends: ['digitalbazaar', 'digitalbazaar/jsdoc'],
  ignorePatterns: ['node_modules/']
};
