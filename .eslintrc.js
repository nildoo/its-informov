module.exports = {
  extends: 'plugin:react/recommended',
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  root: true,
};


// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };
