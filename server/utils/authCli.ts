import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// @ts-expect-error no types
import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { createBetterAuth } from './authFactory';
import { getRuntimeConfig } from './runtimeConfig';

export const IS_BETTER_AUTH_CLI = process.env.BETTER_AUTH_CLI === 'true';

function createAuthForCLI() {
  if (!IS_BETTER_AUTH_CLI) {
    throw new Error('This function can only be called in BETTER_AUTH_CLI mode.');
  }
  const adapter = drizzleAdapter(drizzle(env.DB, { schema }), { provider: 'sqlite' });
  const runtimeConfig = getRuntimeConfig();
  return createBetterAuth({ database: adapter }, { runtimeConfig });
}

/**
 * Better-Auth instance for CLI usage.
 */
export const auth = createAuthForCLI();
