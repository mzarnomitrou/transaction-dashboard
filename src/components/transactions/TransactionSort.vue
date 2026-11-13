<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/stores/transaction'

const transactionsStore = useTransactionsStore()
const { sortField, sortDirection } = storeToRefs(transactionsStore)

function toggleDirection() {
  sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
}
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <label for="sort-field" class="text-gray-500">Sort by</label>
    <select
      id="sort-field"
      v-model="sortField"
      class="rounded-md border border-emerald-200 bg-white px-2 py-1 text-sm text-emerald-700 hover:bg-emerald-50 focus:border-emerald-500 focus:outline-none"
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
    <button
      type="button"
      class="rounded-md border border-emerald-200 px-2 py-1 font-medium text-emerald-700 hover:bg-emerald-50 focus:border-emerald-500 focus:outline-none"
      :aria-label="
        sortDirection === 'desc'
          ? 'Sorted descending, switch to ascending'
          : 'Sorted ascending, switch to descending'
      "
      :title="
        sortField === 'date'
          ? sortDirection === 'desc'
            ? 'Newest first'
            : 'Oldest first'
          : sortDirection === 'desc'
            ? 'Highest first'
            : 'Lowest first'
      "
      @click="toggleDirection"
    >
      <span aria-hidden="true">{{ sortDirection === 'desc' ? '↓' : '↑' }}</span>
    </button>
  </div>
</template>
