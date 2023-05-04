module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'security-node',
    'standard',
    'promise',
    'import',
    'node',
    'you-dont-need-lodash-underscore',
    'no-inferred-method-name',
    'json',
    'babel',
    'import',
    'filenames',
    'optimize-regex',
    'html',
    'ascii',
    'react',
    'jsx-a11y',
    'react-perf',
    'react-functional-set-state',
    'compat',
    'prettier',
  ],
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:node/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:security-node/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    // Always last
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    'no-unused-vars': 'off',
    'no-useless-return': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': ["error", {
      "version": ">=14.13.1",
      "ignores": []
  }],
    '@typescript-eslint/no-var-requires': 'off',
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
    'security-node/detect-crlf': 'off',
  },
  settings: {
    ecmascript: 6,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
     // use <root>/path/to/folder/tsconfig.json
    'typescript': {
        'directory': './tsconfig.json'
      }
    },
    react: {
      version: 'detect'
    }
  },
  globals: {
    __DEV__: false,
    __PROD__: false,
    __PLAYER_DEBUG__: false,
    __BASENAME__: false,
    google: true
  },
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      jsx: true
    },
    'useJSXTextNode': true,
    'project': './tsconfig.json',
    'tsconfigRootDir': './'
  },
  env: {
    browser: true,
    es6: true
  },
}
