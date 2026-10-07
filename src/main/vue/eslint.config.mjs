/*
 * Copyright 2025 DENTSU SOKEN INC. All Rights Reserved.
 */
import js from '@eslint/js'
import prettierConfig from '@vue/eslint-config-prettier'
import vueTsEsLintConfig from '@vue/eslint-config-typescript'
import importPlugin from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  ...pluginVue.configs['flat/recommended'],
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...vueTsEsLintConfig(),
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2015,
      },
    },

    settings: {
      'import/resolver': [
        {
          typescript: true,
          node: true,
        },
      ],
    },

    rules: {
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: ['V.+', 'M.+'],
        },
      ],
    },
  },
]
