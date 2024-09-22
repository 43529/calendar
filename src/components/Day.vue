<template>
  <div
    @click="trigger"
    :class="dayjs(date).valueOf() === dayjs(store.date).valueOf() ? 'today' : 'day'"
  >
    {{ dayjs(date).format('MM-DD') }}
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import { useDateStore } from '@/stores/date'
const dayjs = inject('dayjs')
const store = useDateStore()
const trigger = () => {
  store.setDate(props.date)
}
const props = defineProps({
  date: {
    type: Object,
    required: true
  }
})
if (props.date === store.date) {
  console.log('-------------------')
  console.log(store.date)
  console.log(props.date)
  console.log('-------------------')
}
</script>
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  cursor: pointer;
}
div:hover {
  background-color: #ececec;
  border-radius: 10px; /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  border: 1px solid #ddd;
}
.today {
  background-color: #4a5996;
  border-radius: 10px; /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  border: 1px solid #ddd;
  color: #fff;
}
.today:hover {
  background-color: #5b69a0;
}
</style>
