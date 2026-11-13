<script setup lang="ts">
const { errorMessage = 'Something went wrong...' } = defineProps<{ errorMessage?: string }>()
</script>

<template>
  <div
    role="alert"
    class="mx-4 my-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 sm:mx-6"
  >
    {{ errorMessage }}
  </div>
</template>
