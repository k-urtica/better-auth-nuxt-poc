import { generateRuntimeConfig } from './server/utils/runtimeConfig';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: true,
    fonts: true,
    experimental: {
      componentDetection: true
    }
  },

  runtimeConfig: generateRuntimeConfig(),

  // compatibilityDate: '2025-01-15',
  compatibilityDate: '2026-01-10',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'libsql',
      // NuxtのビルドがCloudflare workersランタイム外で実行されるため、
      // D1バインディングやd1-httpドライバを利用できず、ビルド時にDBに接続できない。
      // そのため、ビルド中のマイグレーションを無効化し、ビルド後にwrangler cliでマイグレーションを実行する。
      applyMigrationsDuringBuild: false,
    },
    blob: true,
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true
      }
    }
  },
});
