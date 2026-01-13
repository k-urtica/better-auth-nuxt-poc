export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.payload.serverRendered) {
    // CSR
    await useAuth().fetchSession();
  } else if (Boolean(nuxtApp.payload.prerenderedAt) || Boolean(nuxtApp.payload.isCached)) {
    // prerendered or cached
    nuxtApp.hook('app:mounted', async () => {
      await useAuth().fetchSession();
    });
  }
});
