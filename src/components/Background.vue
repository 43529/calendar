<template>
  <div>
    <button @click="changeColor">123</button>
    <div id="moon" ref="month"></div>
    <div id="earth" ref="earth"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useDateStore } from '@/stores/date'
import lunisolar from 'lunisolar'
const dateStore = useDateStore()
const earth = ref()
const month = ref()
const computeMoonPosition = date => {
  const width = parseInt((400 / 30) * lunisolar(date).lunar.day)
  if (lunisolar(date).lunar.day <= 15) {
    earth.value.style.left =
      month.value.getBoundingClientRect().left - width + 'px'
  } else {
    earth.value.style.left =
      month.value.getBoundingClientRect().left + 400 - width + 'px'
  }
}
onMounted(() => {
  computeMoonPosition(dateStore.date)
})

watch(
  () => dateStore.date,
  newVal => {
    computeMoonPosition(newVal)
  },
)
</script>
<style scoped>
div {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
#moon {
  position: absolute;
  /* border: 2px solid #0f0f0f; */
  width: 200px;
  height: 200px;
  background-color: #ffff00;
  border-radius: 50%;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
}
#earth {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 50%;
  left: calc(50% + 100px);
  top: calc(50% - 100px);
}
</style>
