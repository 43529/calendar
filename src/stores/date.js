import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
export const useDateStore = defineStore('date', () => {
  const date = ref(dayjs().startOf('day'))

  const setDate = (newValue) => {
    date.value = newValue
  }
  const getDate = computed(() => date.value)

  return { date, setDate, getDate }
})
