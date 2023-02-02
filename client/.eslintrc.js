module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-restricted-exports': 0,
    'import/no-extraneous-dependencies': 0,
    'max-len': 0,
    'no-console': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-constructed-context-values': 0,
    'no-nested-ternary': 0,
    'no-unused-vars': 0,
    'default-param-last': 0,
    'react/style-prop-object': 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'react/no-unstable-nested-components': 0,
    'global-require': 0,
    'no-unused-expressions': 0,
    'no-unsafe-optional-chaining': 0,
  },
};
