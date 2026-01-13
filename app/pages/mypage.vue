<script setup lang="ts">
const { user, signOut } = useAuth();
</script>

<template>
  <UContainer class="py-20">
    <UCard class="mx-auto max-w-xl rounded-md">
      <div class="flex flex-wrap items-center gap-4">
        <img
          v-if="user?.image"
          :src="user.image"
          alt="Avatar"
          class="size-20 rounded-full"
        >
        <div>
          <h1 class="text-2xl font-semibold">{{ user?.name || 'no name' }}</h1>
          <p class="text-muted text-sm">{{ user?.email || 'no email' }}</p>
        </div>
      </div>

      <div class="mt-4 text-sm">
        createdAt: {{ user?.createdAt }}<br>
      </div>

      <div class="mt-4 flex justify-between gap-4">
        <UButton color="neutral" to="/" label="Back to Home" />
        <UButton
          icon="i-lucide-log-out"
          label="Sign Out"
          color="error"
          variant="subtle"
          @click="signOut"
        />
      </div>
    </UCard>
  </UContainer>
</template>
