<template>
  <div :class="dayjs(date).isSame(dayjs(), 'day') ? 'today' : 'day'">
    {{ dayjs(date).format('YYYY-MM-DD') }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  date: {
    type: Object,
    required: true
  }
})
</script>
<style scoped>
.day {
  border: 1px solid #ccc;
}
.today {
  border: 1px solid #ccc;
  background-color: aquamarine;
}
</style>
