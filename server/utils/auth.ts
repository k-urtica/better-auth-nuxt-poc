import type { H3Event } from 'h3';
import type { BetterAuthInstance } from './authFactory';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createBetterAuth } from './authFactory';

let _auth: BetterAuthInstance | undefined;

const getAuth = () => {
  if (!_auth) {
    _auth = createBetterAuth({
      database: drizzleAdapter(db, {
        provider: 'sqlite',
        schema
      }),
    });
  }
  return _auth;
};

export function serverAuth() {
  return getAuth();
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
