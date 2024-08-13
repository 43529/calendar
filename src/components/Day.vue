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
  border: 1px solid #d1d1d1;
  color: #2c3e50;
}
div:hover {
  background-color: #e0e0e0;
}
.today {
  background-color: #a3d1ff;
}
</style>
