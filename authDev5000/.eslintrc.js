module.exports = {
  extends: "airbnb-base",
  env: {
    node: true,
    mocha: true
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@root','./']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  },
  rules: {
    "arrow-body-style": [0, "as-needed"],
    "arrow-parens": [0, "as-needed"],
    "comma-dangle": [2, "never"],
    "global-require": [0],
    "import/extensions": [0, "always"],
    "import/prefer-default-export": [0],
    "import/no-extraneous-dependencies": [0],
    "import/no-unresolved": [0],
    "linebreak-style": [0],
    "max-len": [1, 121, 2],
    "mocha/no-exclusive-tests": [0],
    "no-extra-boolean-cast": [0],
    "no-param-reassign": [0],
    "no-underscore-dangle": [0]
  }
};
