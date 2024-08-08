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
</script>
<style scoped>
.day {
  height: 24px;
  border: 1px solid #ccc;
}
</style>
