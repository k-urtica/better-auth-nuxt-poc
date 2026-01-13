<script setup lang="ts">
definePageMeta({ auth: false });

const { signIn, signOut, loggedIn } = useAuth();

const handleSignIn = async () => {
  await signIn.social({ provider: 'google', callbackURL: '/mypage' });
};
</script>

<template>
  <UContainer class="py-20">
    <div>
      <div v-if="!loggedIn">
        <UButton
          icon="i-logos-google-icon"
          color="neutral"
          label="Continue with Google"
          @click="handleSignIn"
        />
        <p class="mt-2">Sign in with Google to access your personal page.</p>
      </div>

      <template v-else>
        <div class="mb-2">You are signed in.</div>
        <div class="flex items-center gap-4">
          <UButton
            to="/mypage"
            color="neutral"
            label="Go to My Page"
          />
          <UButton
            icon="i-lucide-log-out"
            label="Sign Out"
            color="error"
            variant="subtle"
            @click="signOut"
          />
        </div>
      </template>
    </div>
  </UContainer>
</template>
