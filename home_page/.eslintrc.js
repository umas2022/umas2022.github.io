module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      '@vue/typescript/recommended',
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {
      // 自定义规则可以在这里添加
    },
  };