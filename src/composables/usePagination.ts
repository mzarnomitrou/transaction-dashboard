import { computed, ref, watch, type Ref } from 'vue'

export function usePagination<T>(items: Ref<T[]>, pageSize = 10) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize)))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })

  watch(items, () => {
    currentPage.value = 1
  })

  function setPage(page: number) {
    currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
  }

  return { currentPage, totalPages, paginatedItems, setPage }
}
