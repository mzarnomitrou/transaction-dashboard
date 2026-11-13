<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()
</script>

<template>
  <nav
    aria-label="Pagination"
    class="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm sm:px-6"
  >
    <button
      type="button"
      class="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="currentPage <= 1"
      @click="emit('change', currentPage - 1)"
    >
      Previous
    </button>

    <p class="text-gray-600" aria-live="polite">
      Page {{ currentPage }} of {{ totalPages }}
    </p>

    <button
      type="button"
      class="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="currentPage >= totalPages"
      @click="emit('change', currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>