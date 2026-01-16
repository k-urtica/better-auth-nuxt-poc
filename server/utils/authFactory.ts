import type { DBAdapterInstance } from 'better-auth';
import type { NitroRuntimeConfig } from 'nitropack/types';
import { betterAuth } from 'better-auth';
import { getRuntimeConfig } from './runtimeConfig';

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;

export const createBetterAuth = (
  database: { database: DBAdapterInstance },
  options: { runtimeConfig?: NitroRuntimeConfig } = {}
) => {
  const runtimeConfig = options.runtimeConfig ?? getRuntimeConfig();

  return betterAuth({
    baseURL: runtimeConfig.public.betterAuthURL,
    secret: runtimeConfig.betterAuthSecret,
    ...database,
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: runtimeConfig.oauthGoogleClientId,
        clientSecret: runtimeConfig.oauthGoogleClientSecret,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
  });
};
