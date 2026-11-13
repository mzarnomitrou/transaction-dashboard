<script setup lang="ts">
import type { TransactionStatus } from '@/types/transaction'

defineProps<{
  status: TransactionStatus
}>()

const statusClasses: Record<TransactionStatus, string> = {
  completed: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  declined: 'bg-red-50 text-red-700',
}
</script>

<template>
  <span
    class="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
    :class="statusClasses[status] ?? 'bg-gray-100 text-gray-700'"
  >
     {{ statusClasses[status] ? status : 'Unknown' }}
  </span>
</template>
