<template>
  <div
    @click="trigger"
    :class="[
      dayjs(date).valueOf() === dayjs(store.date).valueOf() ? 'today' : 'day',
      dayjs(date).month() === store.date.month() ? 'current-month' : '',
    ]"
  >
    <div>{{ dayjs(date).format('MM-DD') }}</div>
    <div>
      {{ getLunarDate(date) }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import dayjs from 'dayjs'
import { useDateStore } from '@/stores/date'
import lunisolar from 'lunisolar'

const store = useDateStore()
const trigger = () => {
  store.setDate(props.date)
}
const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
})
/**
 * 根据给定的公历日期返回农历日期
 *
 * @param date 公历日期
 * @returns 返回农历日期。如果是节气，则返回节气名称；如果是农历初一，则返回月份；否则返回具体的农历日期（月日）
 */
const getLunarDate = date => {
  if (lunisolar(date).solarTerm) {
    return lunisolar(date).solarTerm
  } else if (lunisolar(date).format('lD') === '初一') {
    return lunisolar(date).format('lM')
  } else {
    return lunisolar(date).format('lD')
  }
}
</script>
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.day {
  cursor: pointer;
  color: #a5a5a5;
}
.day:hover {
  background-color: #ececec2d ;
  border-radius: 10px; /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  border: 1px solid #ddd;
  color: #283949;
}
.today {
  border-radius: 10px; /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  border: 2px solid #4a5996;
}
.today:hover {
  border-radius: 10px; /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
}
.current-month {
  color: #283949;
}
</style>
