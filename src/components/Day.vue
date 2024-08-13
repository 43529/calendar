<template>
  <div :class="dayjs(date).isSame(dayjs(), 'day') ? 'today' : 'day'">
    {{ dayjs(date).format('DD') }}
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
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.day {
  border: 1px solid #ccc;
}
.today {
  border: 1px solid #ccc;
  background-color: aquamarine;
}
</style>
