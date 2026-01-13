import type { H3Event } from 'h3';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// @ts-expect-error no types
import { env } from 'cloudflare:workers';
import { runtimeConfig } from './runtimeConfig';

const IS_BETTER_AUTH_CLI = process.env.BETTER_AUTH_CLI === 'true';

const createBetterAuth = (database: { database: any }) => betterAuth({
  baseURL: runtimeConfig.betterAuthBaseURL,
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

// For Better Auth CLI client
let _authCli: ReturnType<typeof createBetterAuth> | undefined;

if (IS_BETTER_AUTH_CLI) {
  _authCli = createBetterAuth({
    database: drizzleAdapter(env.DB, {
      provider: 'sqlite'
    })
  });
}

/**
 * For Better Auth CLI operations
 */
export const auth = (() => {
  if (!IS_BETTER_AUTH_CLI) {
    return;
  }
  if (!_authCli) {
    throw new Error('Auth client is not initialized');
  }
  return _authCli;
})();

let _auth: ReturnType<typeof createBetterAuth>;

export function serverAuth() {
  if (!_auth) {
    _auth = createBetterAuth({
      database: drizzleAdapter(db, {
        provider: 'sqlite',
      })
    });
  };
  return _auth;
}

export async function requireUserSession(event: H3Event) {
  const session = await serverAuth().api.getSession({
    headers: event.headers
  });
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'unauthorized',
    });
  }

  return session;
}
