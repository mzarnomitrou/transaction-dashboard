import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/account'
import { fetchAccount } from '@/api/account'

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadAccount() {
    isLoading.value = true
    error.value = null

    try {
      account.value = await fetchAccount()
    } catch {
      error.value = 'Could not load account details.'
    } finally {
      isLoading.value = false
    }
  }

  return { account, isLoading, error, loadAccount }
})
