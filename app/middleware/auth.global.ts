declare module '#app' {
  interface PageMeta {
    auth?: false;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: false;
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta?.auth === false) {
    return;
  }

  const { loggedIn, fetchSession } = useAuth();

  if (import.meta.client) {
    await fetchSession();
  }

  if (!loggedIn.value) {
    if (to.path === '/') {
      return;
    }
    return navigateTo('/');
  }
});
