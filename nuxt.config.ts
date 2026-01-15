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
    experimental: {
      asyncContext: true,
    },
    unenv: {
      external: ['node:async_hooks'],
    },
    rollupConfig: {
      external: ['cloudflare:workers']
    },
  },

  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'libsql',
      // Since Nuxt builds run outside the Cloudflare Workers runtime,
      // D1 bindings and the d1-http driver cannot be used, preventing DB connections during build.
      // Therefore, disable migrations during build and run them after build using wrangler CLI.
      applyMigrationsDuringBuild: false,
    },
  },

  // vite: {
  //   resolve: {
  //     dedupe: ['better-auth']
  //   },
  //   optimizeDeps: {
  //     include: ['better-auth']
  //   },
  //   ssr: {
  //     noExternal: ['better-auth']
  //   },
  // },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true
      }
    }
  },
});
