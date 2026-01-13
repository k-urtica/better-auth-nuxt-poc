// @ts-check
import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: ['**/migrations'],

    formatters: {
      css: true,
      markdown: 'prettier'
    },
    stylistic: {
      semi: true,
      overrides: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'style/operator-linebreak': [
          'error',
          'after',
          { overrides: { '?': 'ignore', ':': 'ignore' } }
        ],
        'style/quote-props': ['error', 'consistent-as-needed']
      }
    },
    vue: {
      overrides: {
        'vue/define-macros-order': [
          'error',
          {
            order: [
              'defineOptions',
              'defineModel',
              'defineProps',
              'defineEmits',
              'defineSlots'
            ]
          }
        ],
        'vue/max-attributes-per-line': ['error', { multiline: { max: 1 }, singleline: { max: 3 } }]
      }
    },
    rules: {
      'no-console': 'off',
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'style/comma-dangle': 'off',
      'vitest/prefer-lowercase-title': 'off',
      'vue/comma-dangle': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'node/prefer-global/process': 'off',
      'pnpm/yaml-enforce-settings': 'off'
    }
  })
)
  .append({
    name: 'eslint-plugin-better-tailwindcss',
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/main.css'
      }
    },
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'error',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': ['error', { syntax: 'parentheses' }],
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'error'
    }
  })
