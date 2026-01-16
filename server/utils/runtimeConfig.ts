import type { NitroRuntimeConfig } from 'nitropack/types';

export const generateRuntimeConfig = () => ({
  betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
  oauthGoogleClientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
  oauthGoogleClientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,

  public: {
    betterAuthURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL,
  }
});

export const getRuntimeConfig = (): NitroRuntimeConfig => {
  if (typeof useRuntimeConfig !== 'undefined') {
    return useRuntimeConfig();
  }

  // for Better-Auth CLI
  return generateRuntimeConfig() as unknown as NitroRuntimeConfig;
};
