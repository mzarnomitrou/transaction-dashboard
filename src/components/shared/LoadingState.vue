<script setup lang="ts">
const { message = 'Loading…' } = defineProps<{ message?: string }>()
</script>

<template>
  <p role="status" class="px-4 py-8 text-center text-gray-500 sm:px-6">
    <span
      class="inline-block size-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 motion-reduce:animate-none"
      aria-hidden="true"
    />
    {{ message }}
  </p>
</template>
