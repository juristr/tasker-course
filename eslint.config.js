const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginReactConfig = require('eslint-plugin-react/configs/recommended.js');

module.exports = [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    ignores: [
      'eslint.config.js',
      '**/.next/**/*',
      '**/postcss.config.js',
      'packages/database/scripts/seed.ts',
      'packages/database/src/db.ts',
      '.nx',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
