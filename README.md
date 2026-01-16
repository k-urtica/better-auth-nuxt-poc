# Better-Auth Nuxt POC

## Resolved Issues

To enable async context in Nitro, add the following configuration to `nuxt.config.ts`:

```
 nitro: {
    // other nitro config...

    experimental: {
      asyncContext: true,
    },
    unenv: {
      external: ['node:async_hooks'],
    },
  },
```

---

~~This repository is for investigating OAuth sign-in issues in Cloudflare Workers environment after better-auth v1.4.0.~~

- **Working version**: better-auth v1.3.34
- **Broken versions**: v1.4.0+ (tested with v1.4.0, v1.4.11)

Using the following commands confirmed no duplicate Better Auth packages:

- pnpm why @better-auth/core
- pnpm why better-auth
- pnpm why better-call

## Error in Cloudflare Workers

```
ERROR [Better Auth]: Error Error: No request state found. Please make sure you are calling this function within a `runWithRequestState` callback.
```

## Tech Stack

- Better-Auth
- Nuxt 4
- NuxtHub Core
- Drizzle ORM
- Cloudflare Workers & D1

## Required environment variables

NUXT_PUBLIC_SITE_URL=xxxx

NUXT_PUBLIC_BETTER_AUTH_URL=xxxx

NUXT_OAUTH_GOOGLE_CLIENT_ID=xxxx
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=xxxx
