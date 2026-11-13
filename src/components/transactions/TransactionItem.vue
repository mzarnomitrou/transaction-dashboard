<script setup lang="ts">
import TransactionStatusBadge from './TransactionStatusBadge.vue'
import MoneyAmount from '@/components/shared/MoneyAmount.vue'
import type { Transaction } from '@/types/transaction'
import { formatDate } from '@/helpers/formatDate'

defineProps<{
  transaction: Transaction
  accountCurrency: string
}>()

const emit = defineEmits<{
  select: [transaction: Transaction]
}>()
</script>
<template>
  <li>
    <button
      type="button"
      class="flex w-full items-start justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none sm:px-6"
      @click="emit('select', transaction)"
    >
      <div class="min-w-0">
        <p class="truncate font-medium text-gray-900">
          {{ transaction.merchant }}
        </p>
        <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <time :datetime="transaction.transactionDate">
            {{ formatDate(transaction.transactionDate) }}
          </time>

          <TransactionStatusBadge :status="transaction.status" />
        </div>
      </div>

      <div class="shrink-0 text-right">
        <MoneyAmount
          :amount="transaction.amount"
          :currency="transaction.currency"
          :direction="transaction.type === 'credit' ? 'in' : 'out'"
          class="font-semibold"
          :class="{ 'text-gray-400 line-through': transaction.status === 'declined' }"
        />
      
        <!-- <p v-if="transaction.currency !== accountCurrency" class="mt-1 text-xs tabular-nums text-gray-500">
          ≈ <MoneyAmount :amount="transaction.accountAmount" :currency="accountCurrency" />
        </p> -->
      </div>
    </button>
  </li>
</template>
