module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};