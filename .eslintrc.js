module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off',
    'linebreak-style': ['off', 'windows'],
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    indent: [
      'error', 2,
      { ignoredNodes: ['TemplateLiteral'] }
    ],
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 180 }],
    'template-curly-spacing': 'off',
    'consistent-return': 'off',
  },
};
