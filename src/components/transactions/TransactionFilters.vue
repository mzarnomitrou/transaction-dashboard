<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/stores/transaction'
import { TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS, } from '@/types/transaction'

const transactionsStore = useTransactionsStore()
const { transactions, sortedTransactions, merchantFilter, statusFilter, typeFilter } =
  storeToRefs(transactionsStore)

const hasActiveFilters = computed(
  () =>
    merchantFilter.value.trim() !== '' ||
    statusFilter.value !== 'all' ||
    typeFilter.value !== 'all',
)

function clearFilters() {
  merchantFilter.value = ''
  statusFilter.value = 'all'
  typeFilter.value = 'all'
}
</script>

<template>
  <section
    class="rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-6"
    aria-label="Filter and sort transactions"
  >
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="sm:col-span-2 lg:col-span-2">
        <label for="filter-merchant" class="block text-sm font-medium text-gray-700">
          Merchant
        </label>
        <input
          id="filter-merchant"
          v-model="merchantFilter"
          type="search"
          placeholder="Search merchant"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="filter-status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="filter-status"
          v-model="statusFilter"
          class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option v-for="status in TRANSACTION_STATUSES" :key="status" :value="status">
            {{ TRANSACTION_STATUS_LABELS[status] }}
          </option>
        </select>
      </div>

      <div>
        <label for="filter-type" class="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="filter-type"
          v-model="typeFilter"
          class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option v-for="type in TRANSACTION_TYPES" :key="type" :value="type">
            {{ TRANSACTION_TYPE_LABELS[type] }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
      <p aria-live="polite">
        {{ sortedTransactions.length }} of {{ transactions.length }} transactions
      </p>
      <button
        v-if="hasActiveFilters"
        type="button"
        class="font-medium text-gray-700 underline hover:text-gray-900"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </div>
  </section>
</template>
