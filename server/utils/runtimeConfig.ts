import type { NitroRuntimeConfig } from 'nitropack/types';

let runtimeConfigInstance: NitroRuntimeConfig;

export const generateRuntimeConfig = () => ({
  // better-auth
  betterAuthBaseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL,
  betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
  // OAuth plugin
  oauthGoogleClientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
  oauthGoogleClientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
});

if (typeof useRuntimeConfig !== 'undefined') {
  runtimeConfigInstance = useRuntimeConfig();
} else {
  runtimeConfigInstance = generateRuntimeConfig() as unknown as NitroRuntimeConfig;
}

export const runtimeConfig = runtimeConfigInstance;
