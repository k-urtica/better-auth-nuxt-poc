import type { BetterAuthClientOptions, InferSessionFromClient, InferUserFromClient } from 'better-auth';
import { authClient } from '@/lib/auth-client';

export type User = typeof authClient.$Infer.Session.user;

export function useAuth() {
  const session = useState<InferSessionFromClient<BetterAuthClientOptions> | null>('auth:session', () => null);
  const user = useState<InferUserFromClient<BetterAuthClientOptions> | null>('auth:user', () => null);

  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false);

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return;
    }
    sessionFetching.value = true;
    try {
      // TODO: https://github.com/better-auth/better-auth/issues/4722#issuecomment-3330643270
      // const { data } = await client.useSession(useFetch);
      const relativeFetch = (url: string, opts?: any) => {
        try {
          if (url.startsWith('http')) url = new URL(url).pathname;
        } catch {}
        return useFetch(url, opts);
      };
      const { data } = await authClient.useSession(relativeFetch);

      session.value = data.value?.session || null;
      user.value = data.value?.user || null;

      return data;
    } finally {
      sessionFetching.value = false;
    }
  };

  if (import.meta.client) {
    authClient.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return;
      await fetchSession();
    });
  }

  return {
    session: readonly(session),
    user: readonly(user),
    loggedIn: computed(() => !!session.value),
    signIn: authClient.signIn,
    signUp: authClient.signUp,
    async signOut() {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: async () => {
            session.value = null;
            user.value = null;

            await navigateTo('/', { replace: true, external: true });
          }
        }
      });
    },

    fetchSession,
  };
}
