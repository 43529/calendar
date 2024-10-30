<script setup>
import { nextTick } from 'vue'
import CalendarContent from './CalendarContent.vue'
import CalendarHeader from './CalendarHeader.vue'
import Background from './Background.vue'
import { openContextMenu } from '@/components/ContextMenu/index'
nextTick(() => {
  openContextMenu()
})
</script>

<template>
  <Background />
  <div>
    <CalendarHeader />
    <CalendarContent />
  </div>
</template>

<style scoped></style>
