<script setup>
import CalendarContent from './CalendarContent.vue'
import CalendarHeader from './CalendarHeader.vue'
import Background from './Background.vue'
</script>

<template>
  <Background />
  <div id="calender">
    <CalendarHeader />
    <CalendarContent />
  </div>
</template>

<style scoped></style>
