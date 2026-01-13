export default defineNuxtPlugin({
  name: 'better-auth-session-plugin',
  enforce: 'pre',
  async setup(nuxtApp) {
    nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache);

    if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
      // SSR and not prerendered nor cached
      await useAuth().fetchSession();
    }
  },
});
