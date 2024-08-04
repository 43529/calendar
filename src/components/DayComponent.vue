<template>
  <div class="day">{{ date }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  date: {
    type: String,
    required: true
  }
})
console.log(props)
</script>
<style scoped>
.day {
  flex: 1;
}
</style>
