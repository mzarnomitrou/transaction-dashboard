<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Transaction, TRANSACTION_TYPE_LABELS } from '@/types/transaction'
import MoneyAmount from '@/components/shared/MoneyAmount.vue'
import TransactionStatusBadge from './TransactionStatusBadge.vue'
import { formatDate } from '@/helpers/formatDate'

const props = defineProps<{
  transaction: Transaction | null
  accountCurrency?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const dialog = ref<HTMLDialogElement | null>(null)

watch(
  () => props.transaction,
  (transaction) => {
    if (transaction) {
      dialog.value?.showModal()
    } else {
      dialog.value?.close()
    }
  },
)

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) {
    dialog.value?.close()
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    class="m-auto w-full max-w-lg rounded-xl p-0 shadow-xl backdrop:bg-black/40"
    aria-labelledby="transaction-details-title"
    @close="emit('close')"
    @click="onBackdropClick"
  >
    <div v-if="transaction" class="p-4 sm:p-6">
      <div class="relative text-center">
        <div class="min-w-0">
          <p class="px-10 text-xl font-semibold text-emerald-700">Transaction details</p>
        </div>
        <button
          type="button"
          class="absolute top-0 right-0 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close details"
          @click="dialog?.close()"
        >
          ✕
        </button>
      </div>

      <MoneyAmount
        :amount="transaction.amount"
        :currency="transaction.currency"
        :direction="transaction.type === 'credit' ? 'in' : 'out'"
        class="mt-2 block text-sm font-semibold"
        :class="{ 'text-gray-400 line-through': transaction.status === 'declined' }"
      />

      <dl class="mt-6 space-y-4 text-sm">
        <div>
          <dt class="text-gray-500">Merchant</dt>
          <dd class="mt-1 break-words text-gray-900">{{ transaction.merchant }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Status</dt>
          <dd class="mt-1"><TransactionStatusBadge :status="transaction.status" /></dd>
        </div>
        <div>
          <dt class="text-gray-500">Type</dt>
          <dd class="mt-1 text-gray-900">
            {{ TRANSACTION_TYPE_LABELS[transaction.type] }}
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Date</dt>
          <dd class="mt-1 text-gray-900">
            <time :datetime="transaction.transactionDate">
              {{ formatDate(transaction.transactionDate) }}
            </time>
          </dd>
        </div>
        <div v-if="accountCurrency && transaction.currency !== accountCurrency">
          <dt class="text-gray-500">Charged to account</dt>
          <dd class="mt-1 text-gray-900">
            <MoneyAmount :amount="transaction.accountAmount" :currency="accountCurrency" />
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Description</dt>
          <dd class="mt-1 break-words whitespace-pre-line text-gray-900">
            {{ transaction.description }}
          </dd>
        </div>
        <div>
          <dt class="text-gray-500">Reference</dt>
          <dd class="mt-1 text-gray-900 tabular-nums">{{ transaction.reference }}</dd>
        </div>
      </dl>
    </div>
  </dialog>
</template>
