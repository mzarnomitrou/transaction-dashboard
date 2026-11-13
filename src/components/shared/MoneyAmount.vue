<script setup lang="ts">
import { computed } from 'vue'
import { formatMoney } from '@/helpers/formatMoney'

const props = defineProps<{
  amount: number
  currency: string
  direction?: 'in' | 'out'
}>()

const formatted = computed(() => {
  const value = formatMoney(props.amount, props.currency)
  if (props.direction === 'in') return `+${value}`
  if (props.direction === 'out') return `−${value}`
  return value
})
</script>

<template>
  <span class="tabular-nums" :class="{ 'text-green-700': direction === 'in' }">
    {{ formatted }}
  </span>
</template>
