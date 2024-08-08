<template>
  <div class="week">
    <Day v-for="(day, index) of week" :key="index" :date="day.format('YYYY/MM/DD')" />
  </div>
</template>

<script setup>
import Day from './Day.vue'
import { defineProps } from 'vue'
const props = defineProps({
  week: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
