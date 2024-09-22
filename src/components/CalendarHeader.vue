<template>
  <div class="header">
    <ul class="week-container">
      <li v-for="(week, index) in weeks" :key="index" class="week">{{ week }}</li>
    </ul>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const weeks = reactive(['一', '二', '三', '四', '五', '六', '日'])
</script>
<style scoped>
.week-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 48px;
  border-bottom: 1px solid #bfbfbf;
}
.week {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
